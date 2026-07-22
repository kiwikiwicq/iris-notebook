<script lang="ts">
	import { getPublishedPosts, getPostBySlug } from '$lib/data/posts';
	import ArticleLayout from '$lib/layouts/ArticleLayout.svelte';
	import { error } from '@sveltejs/kit';

	let { data } = $props();

	const { slug, component: Content } = data;
	const post = getPostBySlug(slug);

	if (!post) {
		error(404, 'Post metadata not found');
	}

	// Prev/Next navigation
	const allPosts = getPublishedPosts();
	const idx = allPosts.findIndex((p) => p.slug === slug);
	const prevPost = idx < allPosts.length - 1 ? allPosts[idx + 1] : null;
	const nextPost = idx > 0 ? allPosts[idx - 1] : null;
</script>

{#if post}
	<ArticleLayout {post} {prevPost} {nextPost}>
		<div class="article-body">
			<!-- Render the MDX compiled Svelte component -->
			<Content />
		</div>
	</ArticleLayout>
{/if}

<style>
	:global(.article-body) {
		max-width: 100%;
		overflow-x: hidden;
		word-wrap: break-word;
		overflow-wrap: anywhere;
	}

	:global(.article-body h2) {
		font-size: 1.4rem;
		font-weight: 600;
		margin-block: 2rem 0.75rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid var(--glass-border);
		color: var(--md-sys-color-on-surface);
		word-break: break-word;
	}

	:global(.article-body h3) {
		font-size: 1.15rem;
		font-weight: 600;
		margin-block: 1.5rem 0.5rem;
		color: var(--md-sys-color-on-surface);
		word-break: break-word;
	}

	:global(.article-body p) {
		font-size: 16px;
		line-height: 1.75;
		color: var(--md-sys-color-on-surface);
		margin-bottom: 1.25rem;
		max-width: 100%;
		word-break: break-word;
		overflow-wrap: anywhere;
	}

	:global(.article-body ul),
	:global(.article-body ol) {
		padding-inline-start: 1.5rem;
		margin-bottom: 1.25rem;
		max-width: 100%;
	}

	:global(.article-body li) {
		font-size: 15px;
		line-height: 1.7;
		margin-block: 0.25rem;
		color: var(--md-sys-color-on-surface);
		word-break: break-word;
	}

	:global(.article-body table) {
		width: 100%;
		max-width: 100%;
		border-collapse: collapse;
		margin-block: 1.5rem;
		display: block;
		overflow-x: auto;
		-webkit-overflow-scrolling: touch;
	}

	:global(.article-body img) {
		max-width: 100%;
		height: auto;
		border-radius: 14px;
		margin-block: 1rem;
		border: 1px solid var(--glass-border);
	}

	:global(.article-body th),
	:global(.article-body td) {
		padding: 0.75rem 1rem;
		border: 1px solid var(--glass-border);
		text-align: left;
		font-size: 14px;
	}

	:global(.article-body th) {
		background: rgba(140, 140, 145, 0.12);
		font-weight: 600;
	}
	
	:global(.article-body pre) {
		margin-block: 1.5rem;
		max-width: 100%;
		overflow-x: auto;
		-webkit-overflow-scrolling: touch;
		border-radius: 14px;
	}

	:global(.article-body code:not(pre code)) {
		font-family: var(--font-mono);
		font-size: 13px;
		padding: 2px 6px;
		border-radius: 5px;
		background: rgba(140, 140, 145, 0.14);
		border: 1px solid var(--glass-border);
		word-break: break-word;
	}
</style>
