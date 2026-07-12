<script lang="ts">
	import type { Post } from '$lib/data/posts';
	import { formatDate } from '$lib/utils/format-date';
	import AuthorCard from '$lib/components/AuthorCard.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import TOC from '$lib/components/TOC.svelte';
	import Tag from '$lib/components/Tag.svelte';
	import { onMount } from 'svelte';
	import defaultAvatar from '$lib/assets/giphy.gif';

	interface Heading {
		id: string;
		text: string;
		level: number;
	}

	interface Props {
		post: Post;
		prevPost?: Post | null;
		nextPost?: Post | null;
		children: import('svelte').Snippet;
	}

	let { post, prevPost = null, nextPost = null, children }: Props = $props();

	let readingProgress = $state(0);
	let headings = $state<Heading[]>([]);

	onMount(() => {
		// Extract headings from rendered article
		const articleEl = document.getElementById('article-content');
		if (articleEl) {
			const els = articleEl.querySelectorAll('h2, h3, h4');
			headings = Array.from(els).map((el) => {
				if (!el.id) {
					el.id = el.textContent?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') ?? '';
				}
				return {
					id: el.id,
					text: el.textContent ?? '',
					level: Number(el.tagName.replace('H', ''))
				};
			});
		}

		// Reading progress bar
		const updateProgress = () => {
			const article = document.getElementById('article-content');
			if (!article) return;
			const { top, height } = article.getBoundingClientRect();
			const winH = window.innerHeight;
			const progress = Math.max(0, Math.min(1, (-top) / (height - winH)));
			readingProgress = progress;
		};

		window.addEventListener('scroll', updateProgress, { passive: true });

		// Bind code block copy buttons
		const copyBtns = document.querySelectorAll('.copy-btn');
		copyBtns.forEach(btn => {
			btn.addEventListener('click', async () => {
				const code = decodeURIComponent(btn.getAttribute('data-code') || '');
				try {
					await navigator.clipboard.writeText(code);
					const textEl = btn.querySelector('.copy-text');
					const iconEl = btn.querySelector('.material-symbols-rounded');
					if (textEl) textEl.textContent = 'Copied!';
					if (iconEl) iconEl.textContent = 'check';
					setTimeout(() => {
						if (textEl) textEl.textContent = 'Copy';
						if (iconEl) iconEl.textContent = 'content_copy';
					}, 2000);
				} catch (err) {
					console.error('Failed to copy', err);
				}
			});
		});

		return () => window.removeEventListener('scroll', updateProgress);
	});
</script>

<svelte:head>
	<title>{post.title} – Iris Notebook</title>
	<meta name="description" content={post.description} />
	<meta property="og:title" content={post.title} />
	<meta property="og:description" content={post.description} />
	<meta property="og:type" content="article" />
	<meta name="article:published_time" content={post.date} />
	<meta name="article:author" content={post.author} />
</svelte:head>

<!-- Reading progress bar -->
<div
	class="reading-progress"
	style="transform: scaleX({readingProgress})"
	role="progressbar"
	aria-label="Reading progress"
	aria-valuenow={Math.round(readingProgress * 100)}
	aria-valuemin={0}
	aria-valuemax={100}
></div>

<main class="article-page" id="main-content">
	<div class="container">
		<!-- Breadcrumbs -->
		<div class="article-breadcrumbs">
			<Breadcrumbs
				crumbs={[
					{ label: 'Home', href: '/' },
					{ label: 'Articles', href: '/articles' },
					{ label: post.title }
				]}
			/>
		</div>

		<div class="article-layout">
			<!-- Article -->
			<article class="article-main">
				<!-- Header -->
				<header class="article-header">
					<div class="article-category-tag">
						<span class="material-symbols-rounded" style="font-size: 16px">category</span>
						{post.category}
					</div>

					<h1 class="article-title">{post.title}</h1>
					<p class="article-description">{post.description}</p>

					<div class="article-meta">
						<div class="meta-author">
							<div class="author-avatar-sm" aria-hidden="true">
								<img src={defaultAvatar} alt={post.author} style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;" />
							</div>
							<span class="title-small">{post.author}</span>
						</div>
						<span class="meta-sep">·</span>
						<time datetime={post.date} class="body-medium">{formatDate(post.date)}</time>
						<span class="meta-sep">·</span>
						<span class="body-medium">{post.readingTime} min read</span>
					</div>

					<div class="article-tags">
						{#each post.tags as tag}
							<Tag {tag} href={`/articles?tag=${tag}`} />
						{/each}
					</div>
				</header>

				<hr class="article-divider" />

				<!-- Content -->
				<div class="prose" id="article-content">
					{@render children()}
				</div>

				<hr class="article-divider" />

				<!-- Author card -->
				<AuthorCard />

				<!-- Prev/Next navigation -->
				{#if prevPost || nextPost}
					<nav class="article-nav" aria-label="Article navigation">
						{#if prevPost}
							<a href={`/articles/${prevPost.slug}`} class="nav-article nav-prev">
								<span class="material-symbols-rounded">arrow_back</span>
								<div>
									<span class="nav-label label-small">Previous</span>
									<span class="nav-title">{prevPost.title}</span>
								</div>
							</a>
						{:else}
							<div></div>
						{/if}
						{#if nextPost}
							<a href={`/articles/${nextPost.slug}`} class="nav-article nav-next">
								<div>
									<span class="nav-label label-small">Next</span>
									<span class="nav-title">{nextPost.title}</span>
								</div>
								<span class="material-symbols-rounded">arrow_forward</span>
							</a>
						{/if}
					</nav>
				{/if}
			</article>

			<!-- Sidebar TOC -->
			<aside class="article-sidebar" aria-label="Article outline">
				<TOC {headings} />
			</aside>
		</div>
	</div>
</main>

<style>
	.article-page {
		padding-top: calc(var(--nav-height) + var(--space-8));
		padding-bottom: var(--space-20);
		min-height: 100vh;
	}

	.article-breadcrumbs {
		margin-bottom: var(--space-6);
	}

	.article-layout {
		display: grid;
		grid-template-columns: 1fr 280px;
		gap: var(--space-12);
		align-items: start;
	}

	@media (max-width: 1024px) {
		.article-layout {
			grid-template-columns: 1fr;
		}
		.article-sidebar {
			display: none;
		}
	}

	/* Header */
	.article-header {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		margin-bottom: var(--space-8);
	}

	.article-category-tag {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		font-size: 13px;
		font-weight: 600;
		color: var(--md-sys-color-primary);
		letter-spacing: 0.5px;
		text-transform: uppercase;
	}

	.article-title {
		font-size: clamp(28px, 5vw, 48px);
		font-weight: 700;
		line-height: 1.15;
		letter-spacing: -1px;
		color: var(--md-sys-color-on-surface);
		max-width: 20ch;
	}

	.article-description {
		font-size: 18px;
		line-height: 1.6;
		color: var(--md-sys-color-on-surface-variant);
		max-width: 60ch;
	}

	.article-meta {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		flex-wrap: wrap;
		color: var(--md-sys-color-on-surface-variant);
	}

	.meta-author {
		display: flex;
		align-items: center;
		gap: var(--space-2);
	}

	.author-avatar-sm {
		width: 28px;
		height: 28px;
		border-radius: 50%;
		background: linear-gradient(135deg, var(--md-sys-color-primary), var(--md-sys-color-tertiary));
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-size: 13px;
		font-weight: 700;
	}

	.meta-sep { opacity: 0.4; }

	.article-tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
	}

	.article-divider {
		height: 1px;
		background: var(--md-sys-color-outline-variant);
		border: none;
		margin-block: var(--space-8);
	}

	/* Prev/Next nav */
	.article-nav {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-4);
		margin-top: var(--space-8);
	}

	.nav-article {
		display: flex;
		align-items: center;
		gap: var(--space-4);
		padding: var(--space-5);
		background: var(--md-sys-color-surface-container-low);
		border-radius: var(--md-sys-shape-corner-extra-large);
		border: 1px solid var(--md-sys-color-outline-variant);
		text-decoration: none;
		color: var(--md-sys-color-on-surface);
		transition:
			background var(--motion-duration-short4) var(--motion-easing-standard),
			border-color var(--motion-duration-short4) var(--motion-easing-standard),
			transform var(--motion-duration-short4) var(--motion-easing-standard);
	}

	.nav-article:hover {
		background: var(--md-sys-color-surface-container);
		border-color: var(--md-sys-color-primary);
		transform: translateY(-2px);
	}

	.nav-article .material-symbols-rounded {
		flex-shrink: 0;
		color: var(--md-sys-color-primary);
	}

	.nav-next {
		justify-content: flex-end;
		text-align: right;
	}

	.nav-label {
		display: block;
		color: var(--md-sys-color-on-surface-variant);
		text-transform: uppercase;
		letter-spacing: 0.5px;
		margin-bottom: 2px;
	}

	.nav-title {
		font-size: 14px;
		font-weight: 500;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	/* Sidebar */
	.article-sidebar {
		position: sticky;
		top: calc(var(--nav-height) + var(--space-6));
	}
</style>
