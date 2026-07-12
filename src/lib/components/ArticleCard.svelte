<script lang="ts">
	import type { Post } from '$lib/data/posts';
	import { formatDate } from '$lib/utils/format-date';
	import { getCategoryColor } from '$lib/data/categories';
	import Tag from './Tag.svelte';

	interface Props {
		post: Post;
		featured?: boolean;
		index?: number;
	}

	let { post, featured = false, index = 0 }: Props = $props();

	// Generate a visually distinct gradient for cards without real images
	const gradients = [
		'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
		'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
		'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
		'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
		'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
		'linear-gradient(135deg, #30cfd0 0%, #5b84b1 100%)',
		'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
		'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
	];

	const gradient = gradients[index % gradients.length];
	const categoryColor = getCategoryColor(post.category);
</script>

<article class="article-card" class:featured>
	<a href={`/articles/${post.slug}`} class="card-link" aria-label={post.title}>
		<!-- Thumbnail -->
		<div class="card-image" style="background: {gradient}">
			{#if post.image && !post.image.endsWith('.svg')}
				<img src={post.image} alt={post.imageAlt} class="article-thumbnail" />
			{/if}
			<div class="card-image-overlay">
				<span class="category-badge" style="--cat-color: {categoryColor}">
					{post.category}
				</span>
			</div>
		</div>

		<!-- Content -->
		<div class="card-content">
			<div class="card-meta">
				<time class="label-small" datetime={post.date}>{formatDate(post.date)}</time>
				<span class="dot" aria-hidden="true">·</span>
				<span class="label-small">{post.readingTime} min read</span>
			</div>

			<h3 class="card-title">{post.title}</h3>
			<p class="card-desc">{post.description}</p>

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
		background: var(--md-sys-color-surface-container-low);
		border-radius: var(--shape-card);
		box-shadow: var(--card-shadow-resting);
		overflow: hidden;
		display: flex;
		flex-direction: column;
		height: 100%;
		transition:
			transform var(--motion-duration-medium1) var(--motion-easing-standard),
			box-shadow var(--motion-duration-medium1) var(--motion-easing-standard);
	}

	.article-card:hover {
		transform: translateY(-6px);
		box-shadow: var(--card-shadow-hover);
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
		height: 200px;
		overflow: hidden;
	}

	.featured .card-image {
		height: 240px;
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
		transform: scale(1.05);
	}

	.card-image-overlay {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: flex-start;
		padding: var(--space-4);
		background: linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, transparent 40%);
	}

	.category-badge {
		display: inline-flex;
		align-items: center;
		padding: 4px 12px;
		border-radius: var(--md-sys-shape-corner-full);
		background: rgba(255, 255, 255, 0.92);
		color: var(--cat-color, #6750A4);
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 0.5px;
		backdrop-filter: blur(8px);
	}

	/* Content area */
	.card-content {
		padding: var(--space-5) var(--space-5) var(--space-6);
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		flex: 1;
	}

	.card-meta {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		color: var(--md-sys-color-on-surface-variant);
	}

	.dot { opacity: 0.6; }

	.card-title {
		font-size: 18px;
		font-weight: 600;
		line-height: 1.35;
		letter-spacing: -0.2px;
		color: var(--md-sys-color-on-surface);
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		transition: color var(--motion-duration-short4) var(--motion-easing-standard);
	}

	.article-card:hover .card-title {
		color: var(--md-sys-color-primary);
	}

	.card-desc {
		font-size: 14px;
		line-height: 1.6;
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
		gap: var(--space-2);
		margin-top: auto;
	}

	.featured .card-title {
		font-size: 20px;
	}
</style>
