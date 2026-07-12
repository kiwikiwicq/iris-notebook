<script lang="ts">
	import { getPublishedPosts, getPostBySlug } from '$lib/data/posts';
	import ArticleLayout from '$lib/layouts/ArticleLayout.svelte';
	import { error } from '@sveltejs/kit';

	let { data } = $props();

	const { slug, component: Content, meta } = data;
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
	/* Basic styling for markdown content, mdsvex renders normal HTML elements */
	:global(.article-body h2) {
		font-size: 1.5rem;
		font-weight: 600;
		margin-block: 2rem 0.75rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid var(--md-sys-color-outline-variant);
	}

	:global(.article-body h3) {
		font-size: 1.2rem;
		font-weight: 600;
		margin-block: 1.5rem 0.5rem;
	}

	:global(.article-body p) {
		font-size: 17px;
		line-height: 1.75;
		color: var(--md-sys-color-on-surface);
		margin-bottom: 1.25rem;
	}

	:global(.article-body ul),
	:global(.article-body ol) {
		padding-inline-start: 1.75rem;
		margin-bottom: 1.25rem;
	}

	:global(.article-body li) {
		font-size: 16px;
		line-height: 1.7;
		margin-block: 0.25rem;
		color: var(--md-sys-color-on-surface);
	}

	:global(.article-body table) {
		width: 100%;
		border-collapse: collapse;
		margin-block: 1.5rem;
	}

	:global(.article-body img) {
		max-width: 100%;
		height: auto;
		border-radius: var(--md-sys-shape-corner-medium, 12px);
		margin-block: var(--space-4, 1rem);
		box-shadow: var(--card-shadow-resting, 0 4px 6px -1px rgb(0 0 0 / 0.1));
	}

	:global(.article-body th),
	:global(.article-body td) {
		padding: 0.75rem 1rem;
		border: 1px solid var(--md-sys-color-outline-variant);
		text-align: left;
		font-size: 14px;
	}

	:global(.article-body th) {
		background: var(--md-sys-color-surface-container);
		font-weight: 600;
	}
	
	:global(.article-body pre) {
		margin-block: 1.5rem;
	}
</style>
