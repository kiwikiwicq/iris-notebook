<script lang="ts">
	import { categories } from '$lib/data/categories';
	import { getPublishedPosts } from '$lib/data/posts';
	import ArticleCard from '$lib/components/ArticleCard.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';

	const allPosts = getPublishedPosts();

	function getPostCount(categorySlug: string): number {
		return allPosts.filter((p) => p.category.toLowerCase() === categorySlug).length;
	}

	let activeCategory = $state<string | null>(null);

	const categoryPosts = $derived(
		activeCategory ? allPosts.filter((p) => p.category.toLowerCase() === activeCategory) : []
	);
</script>

<svelte:head>
	<title>Categories – Iris Notebook</title>
	<meta name="description" content="Browse Iris Notebook articles by category: Android, Linux, Programming, AI, and Notes." />
</svelte:head>

<main class="categories-page" id="main-content">
	<div class="container">
		<Breadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'Categories' }]} />

		<header class="page-header">
			<h1 class="display-small">Categories</h1>
			<p class="body-large page-subtitle">Browse articles by topic.</p>
		</header>

		<!-- Category cards -->
		<div class="category-grid">
			{#each categories as category, i}
				<button
					class="cat-card"
					class:active={activeCategory === category.slug}
					id={category.slug}
					onclick={() => {
						activeCategory = activeCategory === category.slug ? null : category.slug;
					}}
					style="--delay: {i * 60}ms; --cat-color: {category.color}; --cat-bg: {category.colorContainer}"
					aria-expanded={activeCategory === category.slug}
					aria-controls="category-posts-{category.slug}"
				>
					<div class="cat-card-icon">
						<span class="material-symbols-rounded icon-filled icon-lg">{category.icon}</span>
					</div>
					<h2 class="cat-card-name title-large">{category.name}</h2>
					<p class="cat-card-desc body-medium">{category.description}</p>
					<div class="cat-card-footer">
						<span class="post-count label-large">{getPostCount(category.slug)} articles</span>
						<span class="material-symbols-rounded arrow">
							{activeCategory === category.slug ? 'expand_less' : 'expand_more'}
						</span>
					</div>
				</button>
			{/each}
		</div>

		<!-- Expanded posts for selected category -->
		{#if activeCategory && categoryPosts.length > 0}
			{@const activeCat = categories.find((c) => c.slug === activeCategory)}
			<section
				class="category-posts-section animate-slide-up"
				id="category-posts-{activeCategory}"
				aria-label="{activeCat?.name} articles"
			>
				<div class="category-posts-header">
					<div class="cat-badge" style="--cat-color: {activeCat?.color}; --cat-bg: {activeCat?.colorContainer}">
						<span class="material-symbols-rounded icon-filled">{activeCat?.icon}</span>
						<h2 class="title-large">{activeCat?.name}</h2>
					</div>
					<a href="/articles?category={activeCategory}" class="view-all-link">
						View all
						<span class="material-symbols-rounded">arrow_forward</span>
					</a>
				</div>
				<div class="posts-grid">
					{#each categoryPosts.slice(0, 3) as post, i}
						<ArticleCard {post} index={i} />
					{/each}
				</div>
			</section>
		{/if}
	</div>
</main>

<style>
	.categories-page {
		padding-top: calc(var(--nav-height) + var(--space-8));
		padding-bottom: var(--space-20);
		min-height: 100vh;
	}

	.page-header {
		margin-block: var(--space-6) var(--space-10);
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.page-subtitle {
		color: var(--md-sys-color-on-surface-variant);
	}

	/* Category cards */
	.category-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
		gap: var(--space-5);
		margin-bottom: var(--space-10);
	}

	.cat-card {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		padding: var(--space-6);
		background: var(--md-sys-color-surface-container-low);
		border-radius: var(--shape-card);
		border: 2px solid var(--md-sys-color-outline-variant);
		text-align: left;
		cursor: pointer;
		font-family: var(--font-body);
		transition:
			background var(--motion-duration-medium1) var(--motion-easing-standard),
			border-color var(--motion-duration-medium1) var(--motion-easing-standard),
			transform var(--motion-duration-medium1) var(--motion-easing-standard),
			box-shadow var(--motion-duration-medium1) var(--motion-easing-standard);
		animation: slide-up var(--motion-duration-medium3) var(--motion-easing-emphasized-decelerate) var(--delay, 0ms) both;
	}

	.cat-card:hover {
		border-color: var(--cat-color);
		background: var(--cat-bg, var(--md-sys-color-surface-container));
		transform: translateY(-4px);
		box-shadow: 0 8px 24px color-mix(in srgb, var(--cat-color, #6750A4) 15%, transparent);
	}

	.cat-card.active {
		border-color: var(--cat-color);
		background: var(--cat-bg);
		box-shadow: 0 4px 16px color-mix(in srgb, var(--cat-color, #6750A4) 20%, transparent);
	}

	.cat-card-icon {
		width: 56px;
		height: 56px;
		border-radius: var(--md-sys-shape-corner-extra-large);
		background: var(--cat-bg, var(--md-sys-color-primary-container));
		color: var(--cat-color, var(--md-sys-color-primary));
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.cat-card-name {
		color: var(--md-sys-color-on-surface);
	}

	.cat-card-desc {
		color: var(--md-sys-color-on-surface-variant);
		flex: 1;
	}

	.cat-card-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: auto;
		padding-top: var(--space-3);
		border-top: 1px solid var(--md-sys-color-outline-variant);
	}

	.post-count {
		color: var(--cat-color, var(--md-sys-color-primary));
	}

	.arrow {
		color: var(--md-sys-color-on-surface-variant);
	}

	/* Posts section */
	.category-posts-section {
		padding-block: var(--space-8);
	}

	.category-posts-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: var(--space-6);
		flex-wrap: wrap;
		gap: var(--space-4);
	}

	.cat-badge {
		display: inline-flex;
		align-items: center;
		gap: var(--space-3);
		color: var(--cat-color);
	}

	.cat-badge .material-symbols-rounded { font-size: 24px; }

	.view-all-link {
		display: inline-flex;
		align-items: center;
		gap: var(--space-1);
		font-size: 14px;
		font-weight: 500;
		color: var(--md-sys-color-primary);
		text-decoration: none;
		transition: gap var(--motion-duration-short4) var(--motion-easing-standard);
	}

	.view-all-link:hover {
		gap: var(--space-2);
	}

	.posts-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: var(--space-5);
	}
</style>
