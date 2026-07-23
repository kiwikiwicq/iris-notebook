<script lang="ts">
	import type { Post } from '$lib/data/posts';
	import { formatDate } from '$lib/utils/format-date';
	import { getCategoryColor } from '$lib/data/categories';
	import Tag from './Tag.svelte';
	import { bookmarksStore } from '$lib/stores/bookmarks.svelte';
	import { languageStore } from '$lib/stores/language.svelte';
	import { onMount } from 'svelte';
	import SFIcon from './SFIcon.svelte';

	interface Props {
		post: Post;
		featured?: boolean;
		index?: number;
	}

	let { post, featured = false, index = 0 }: Props = $props();

	// Apple SF subtle monochrome glass fallbacks
	const gradients = [
		'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
		'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.03) 100%)',
		'linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.06) 100%)',
		'linear-gradient(135deg, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.02) 100%)'
	];

	const gradient = $derived(gradients[index % gradients.length]);
	const categoryColor = $derived(getCategoryColor(post.category));

	onMount(() => bookmarksStore.init());

	const bookmarked = $derived(bookmarksStore.isBookmarked(post.slug));

	const translatedPost = $derived(languageStore.translatePost(post.slug, post.title, post.description));
	const translatedCat = $derived(languageStore.translateCategory(post.category, post.category, ''));

	function toggleBookmark(e: MouseEvent) {
		e.preventDefault();
		e.stopPropagation();
		bookmarksStore.toggle(post.slug);
	}
</script>

<article class="article-card card" class:featured>
	<a href={`/articles/${post.slug}`} class="card-link" aria-label={translatedPost.title}>
		<!-- Thumbnail -->
		<div class="card-image" style="background: {gradient}">
			{#if post.image && !post.image.endsWith('.svg')}
				<img src={post.image} alt={post.imageAlt} class="article-thumbnail" loading="lazy" decoding="async" />
			{/if}
			<div class="card-image-overlay">
				<span class="category-badge" style="--cat-color: {categoryColor}">
					{translatedCat.name}
				</span>
				<button
					class="bookmark-btn"
					class:bookmarked
					onclick={toggleBookmark}
					aria-label={bookmarked ? languageStore.t.articleDetail.saved : languageStore.t.articleDetail.save}
					title={bookmarked ? languageStore.t.articleDetail.saved : languageStore.t.articleDetail.save}
				>
					<SFIcon name={bookmarked ? 'bookmarked' : 'bookmark'} size={14} color="var(--md-sys-color-on-surface)" />
				</button>
			</div>
		</div>

		<!-- Content -->
		<div class="card-content">
			<div class="card-meta">
				<time class="label-small" datetime={post.date}>{formatDate(post.date)}</time>
				<span class="dot" aria-hidden="true">·</span>
				<span class="label-small">{post.readingTime} {languageStore.t.articleDetail.minRead}</span>
			</div>

			<h3 class="card-title">{translatedPost.title}</h3>
			<p class="card-desc">{translatedPost.description}</p>

			<div class="card-tags">
				{#each post.tags.slice(0, 3) as tag}
					<Tag {tag} small />
				{/each}
			</div>
		</div>
	</a>
</article>

<style>
	.article-card {
		background: var(--liquid-glass-bg);
		backdrop-filter: var(--liquid-blur);
		-webkit-backdrop-filter: var(--liquid-blur);
		border-radius: var(--shape-card);
		box-shadow: var(--liquid-glass-shadow);
		border: 1px solid var(--liquid-glass-border);
		overflow: hidden;
		display: flex;
		flex-direction: column;
		height: 100%;
		transition:
			transform var(--motion-duration-medium1) var(--motion-easing-standard),
			box-shadow var(--motion-duration-medium1) var(--motion-easing-standard),
			border-color var(--motion-duration-medium1) var(--motion-easing-standard);
	}

	.article-card:hover {
		transform: translateY(-3px) scale(1.008);
		box-shadow: var(--card-shadow-hover);
		border-color: rgba(255, 255, 255, 0.28);
	}

	.card-link {
		display: flex;
		flex-direction: column;
		text-decoration: none;
		color: inherit;
		height: 100%;
		flex: 1;
	}

	/* Image area */
	.card-image {
		position: relative;
		height: 190px;
		overflow: hidden;
	}

	.featured .card-image {
		height: 230px;
	}

	.article-thumbnail {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform var(--motion-duration-medium1) var(--motion-easing-standard);
	}

	.article-card:hover .article-thumbnail {
		transform: scale(1.04);
	}

	.card-image-overlay {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		padding: var(--space-3) var(--space-4);
		background: linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 60%);
	}

	.category-badge {
		display: inline-flex;
		align-items: center;
		padding: 4px 12px;
		border-radius: var(--md-sys-shape-corner-full);
		background: rgba(0, 0, 0, 0.55);
		border: 1px solid rgba(255, 255, 255, 0.2);
		color: #ffffff;
		font-size: 11px;
		font-weight: 600;
		letter-spacing: -0.01em;
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
	}

	.bookmark-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: var(--md-sys-shape-corner-full);
		border: 1px solid rgba(255, 255, 255, 0.25);
		background: rgba(0, 0, 0, 0.55);
		color: #ffffff;
		cursor: pointer;
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		transition:
			background var(--motion-duration-short4) var(--motion-easing-standard),
			transform var(--motion-duration-short4) var(--motion-easing-standard);
		opacity: 0.85;
	}

	.article-card:hover .bookmark-btn,
	.bookmark-btn.bookmarked {
		opacity: 1;
	}

	.bookmark-btn:hover {
		transform: scale(1.08);
		background: rgba(0, 0, 0, 0.75);
		border-color: rgba(255, 255, 255, 0.4);
	}

	.bookmark-btn .material-symbols-rounded { font-size: 18px; }

	/* Content area */
	.card-content {
		padding: var(--space-5);
		display: flex;
		flex-direction: column;
		gap: 10px;
		flex: 1;
	}

	.card-meta {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 12px;
		color: var(--md-sys-color-on-surface-variant);
	}

	.dot { opacity: 0.5; }

	.card-title {
		font-size: 18px;
		font-weight: 600;
		line-height: 1.3;
		letter-spacing: -0.015em;
		color: var(--md-sys-color-on-surface);
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		transition: color var(--motion-duration-short4) var(--motion-easing-standard);
	}

	.article-card:hover .card-title {
		color: var(--apple-blue);
	}

	.card-desc {
		font-size: 14px;
		line-height: 1.5;
		letter-spacing: -0.01em;
		color: var(--md-sys-color-on-surface-variant);
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		max-width: none;
	}

	.card-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin-top: auto;
		padding-top: 4px;
	}

	.featured .card-title {
		font-size: 20px;
	}
</style>
