import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

/** @type {import('mdsvex').MdsvexOptions} */

// Create the Shiki highlighter ONCE at module level (not per code block)
const { createHighlighter } = await import('shiki');
const shikiHighlighter = await createHighlighter({
	themes: ['github-dark', 'github-light'],
	langs: [
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
		'markdown',
		'text'
	]
});

const mdsvexOptions = {
	extensions: ['.md', '.svx', '.mdx'],
	highlight: {
		highlighter: async (code, lang) => {

			const safeLang = shikiHighlighter.getLoadedLanguages().includes(lang) ? lang : 'text';

			const html = shikiHighlighter.codeToHtml(code, {
				lang: safeLang,
				themes: {
					light: 'github-light',
					dark: 'github-dark'
				}
			});

			// Escape svelte curlies
			const escapedHtml = html.replace(/[{}]/g, (c) => ({ '{': '&#123;', '}': '&#125;' }[c]));

			// Build a copy button using vanilla JS since this is statically injected HTML
			const escapedCode = encodeURIComponent(code);
			const copyButton = `<button class="copy-btn" data-code="${escapedCode}" aria-label="Copy code"><span class="material-symbols-rounded" style="font-size: 16px">content_copy</span><span class="copy-text">Copy</span></button>`;

			return `<div class="code-block-wrapper">
				<div class="code-header">
					<span class="lang-badge">${safeLang}</span>
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
				'script-src': [
					'self',
					'unsafe-inline',
					'https://*.google.com',
					'https://*.googleapis.com',
					'https://*.gstatic.com'
				],
				'script-src-elem': [
					'self',
					'unsafe-inline',
					'https://*.google.com',
					'https://*.googleapis.com',
					'https://*.gstatic.com'
				],
				'style-src': [
					'self',
					'unsafe-inline',
					'https://fonts.googleapis.com',
					'https://*.googleapis.com',
					'https://*.gstatic.com',
					'https://www.gstatic.com'
				],
				'style-src-elem': [
					'self',
					'unsafe-inline',
					'https://fonts.googleapis.com',
					'https://*.googleapis.com',
					'https://*.gstatic.com',
					'https://www.gstatic.com'
				],
				'img-src': [
					'self',
					'data:',
					'https://*.youtube.com',
					'https://*.google.com',
					'https://*.gstatic.com',
					'https://*.googleapis.com'
				],
				'font-src': ['self', 'data:', 'https://fonts.gstatic.com', 'https://*.gstatic.com'],
				'frame-src': ['self', 'https://*.youtube.com', 'https://*.google.com'],
				'connect-src': [
					'self',
					'https://*.googleapis.com',
					'https://*.google.com',
					'https://api.mymemory.translated.net'
				]
			}
		}
	},
	compilerOptions: {
		runes: true
	}
};

export default config;
