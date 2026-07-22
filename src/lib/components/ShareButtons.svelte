<script lang="ts">
	import { SITE_URL } from '$lib/config';
	import SFIcon from './SFIcon.svelte';

	interface Props {
		title: string;
		slug: string;
		description?: string;
	}

	let { title, slug, description = '' }: Props = $props();

	const articleUrl = $derived(`${SITE_URL}/articles/${slug}`);

	const encodedUrl = $derived(encodeURIComponent(articleUrl));
	const encodedTitle = $derived(encodeURIComponent(title));

	let linkCopied = $state(false);

	async function copyLink() {
		let success = false;
		if (navigator.clipboard && window.isSecureContext) {
			try {
				await navigator.clipboard.writeText(articleUrl);
				success = true;
			} catch { success = false; }
		}
		if (!success) {
			const ta = document.createElement('textarea');
			ta.value = articleUrl;
			ta.style.cssText = 'position:fixed;top:-9999px;opacity:0';
			document.body.appendChild(ta);
			ta.select();
			success = document.execCommand('copy');
			document.body.removeChild(ta);
		}
		if (success) {
			linkCopied = true;
			setTimeout(() => (linkCopied = false), 2500);
		}
	}

	const shareLinks = $derived([
		{
			label: 'Twitter / X',
			url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
			icon: `<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.732-8.858-8.144-10.642h6.18l4.26 5.632 5.472-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`
		},
		{
			label: 'LinkedIn',
			url: `https://linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
			icon: `<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`
		},
		{
			label: 'Hacker News',
			url: `https://news.ycombinator.com/submitlink?u=${encodedUrl}&t=${encodedTitle}`,
			icon: `<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M0 24V0h24v24H0zM6.951 5.896l4.112 7.708v5.459h1.874v-5.459l4.085-7.708h-1.936l-3.18 5.862-3.15-5.862H6.951z"/></svg>`
		}
	]);
</script>

<div class="share-section liquid-glass">
	<p class="share-label label-medium">Share this article</p>

	<div class="share-buttons">
		{#each shareLinks as link}
			<a
				href={link.url}
				target="_blank"
				rel="noopener noreferrer"
				class="share-btn"
				aria-label="Share on {link.label}"
				title={link.label}
			>
				{@html link.icon}
				<span>{link.label}</span>
			</a>
		{/each}

		<button
			class="share-btn copy-link-btn"
			class:copied={linkCopied}
			onclick={copyLink}
			aria-label="Copy article link"
		>
			<SFIcon name={linkCopied ? 'check' : 'copy'} size={14} color={linkCopied ? 'var(--apple-green)' : 'currentColor'} />
			<span>{linkCopied ? 'Copied!' : 'Copy link'}</span>
		</button>
	</div>
</div>

<style>
	.share-section {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		padding: var(--space-6);
		border-radius: 24px;
		margin-bottom: var(--space-8);
	}

	.share-label {
		color: var(--md-sys-color-on-surface-variant);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		font-size: 11px;
		font-weight: 600;
	}

	.share-buttons {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
	}

	.share-btn {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 8px 16px;
		border-radius: var(--md-sys-shape-corner-full);
		border: 1px solid var(--glass-border);
		background: rgba(140, 140, 145, 0.1);
		color: var(--md-sys-color-on-surface-variant);
		font-family: var(--font-body);
		font-size: 13px;
		font-weight: 500;
		text-decoration: none;
		cursor: pointer;
		transition:
			background var(--motion-duration-short4) var(--motion-easing-standard),
			color var(--motion-duration-short4) var(--motion-easing-standard),
			border-color var(--motion-duration-short4) var(--motion-easing-standard),
			transform var(--motion-duration-short4) var(--motion-easing-standard);
	}

	.share-btn:hover {
		background: rgba(140, 140, 145, 0.2);
		color: var(--md-sys-color-on-surface);
		border-color: rgba(255, 255, 255, 0.25);
		transform: translateY(-1px);
	}

	.copy-link-btn.copied {
		background: rgba(48, 209, 88, 0.15);
		color: var(--md-sys-color-on-surface);
		border-color: var(--apple-green);
	}
</style>
