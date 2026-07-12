import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md', '.svx', '.mdx'],
	highlight: {
		highlighter: async (code, lang) => {
			const { createHighlighter } = await import('shiki');
			const highlighter = await createHighlighter({
				themes: ['github-dark', 'github-light'],
				langs: [
					lang || 'text',
					'javascript',
					'typescript',
					'svelte',
					'css',
					'html',
					'bash',
					'shell',
					'kotlin',
					'python',
					'rust',
					'go',
					'json',
					'yaml',
					'markdown'
				]
			});
			const html = highlighter.codeToHtml(code, {
				lang: lang || 'text',
				themes: {
					light: 'github-light',
					dark: 'github-dark'
				}
			});
			// Escape svelte curlies
			const escapedHtml = html.replace(/[{}]/g, c => ({ '{': '&#123;', '}': '&#125;' }[c]));
			
			// Build a copy button using vanilla JS since this is statically injected HTML
			const escapedCode = encodeURIComponent(code);
			const copyButton = `<button class="copy-btn" data-code="${escapedCode}" aria-label="Copy code"><span class="material-symbols-rounded" style="font-size: 16px">content_copy</span><span class="copy-text">Copy</span></button>`;

			return `<div class="code-block-wrapper">
				<div class="code-header">
					<span class="lang-badge">${lang || 'text'}</span>
					${copyButton}
				</div>
				<div class="code-content">${escapedHtml}</div>
			</div>`;
		}
	}
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md', '.svx', '.mdx'],
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
	kit: {
		adapter: adapter(),
		csp: {
			mode: 'auto',
			directives: {
				'default-src': ['self'],
				'script-src': ['self', 'unsafe-inline'],
				'style-src': ['self', 'unsafe-inline', 'https://fonts.googleapis.com'],
				'img-src': ['self', 'data:', 'https://*.youtube.com'],
				'font-src': ['self', 'data:', 'https://fonts.gstatic.com'],
				'frame-src': ['self', 'https://www.youtube.com']
			}
		}
	},
	compilerOptions: {
		runes: true
	}
};

export default config;
