<script lang="ts">
	import { categories } from '$lib/data/categories';
	import { getPublishedPosts } from '$lib/data/posts';
	import ArticleCard from '$lib/components/ArticleCard.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import SFIcon from '$lib/components/SFIcon.svelte';
	import { languageStore } from '$lib/stores/language.svelte';

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
	<title>{languageStore.t.categoriesPage.title} — Iris Notebook</title>
	<meta name="description" content={languageStore.t.categoriesPage.description} />
</svelte:head>

<main class="categories-page" id="main-content">
	<div class="container">
		<Breadcrumbs crumbs={[{ label: languageStore.t.nav.overview, href: '/' }, { label: languageStore.t.nav.categories }]} />

		<header class="page-header">
			<h1 class="display-small">{languageStore.t.categoriesPage.title}</h1>
			<p class="body-large page-subtitle">{languageStore.t.categoriesPage.description}</p>
		</header>

		<!-- Category cards -->
		<div class="category-grid">
			{#each categories as category, i}
				{@const translatedCat = languageStore.translateCategory(category.slug, category.name, category.description)}
				<button
					class="cat-card liquid-glass"
					class:active={activeCategory === category.slug}
					id={category.slug}
					onclick={() => {
						activeCategory = activeCategory === category.slug ? null : category.slug;
					}}
					style="--delay: {i * 60}ms;"
					aria-expanded={activeCategory === category.slug}
					aria-controls="category-posts-{category.slug}"
				>
					<div class="cat-card-icon">
						<SFIcon name={category.sfIcon ?? 'code'} size={20} />
					</div>
					<h2 class="cat-card-name title-large">{translatedCat.name}</h2>
					<p class="cat-card-desc body-medium">{translatedCat.description}</p>
					<div class="cat-card-footer">
						<span class="post-count label-large">{getPostCount(category.slug)} {languageStore.t.categoriesPage.articlesCount}</span>
						<SFIcon name={activeCategory === category.slug ? 'arrowUp' : 'arrowRight'} size={14} />
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
					<div class="cat-badge liquid-glass">
						<SFIcon name={activeCat?.sfIcon ?? 'code'} size={18} />
						<h2 class="title-large">{activeCat?.name}</h2>
					</div>
					<a href="/articles?category={activeCategory}" class="view-all-link">
						<span>View all</span>
						<SFIcon name="arrowRight" size={14} />
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
		grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
		gap: var(--space-5);
		margin-bottom: var(--space-10);
	}

	.cat-card {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		padding: var(--space-6);
		border-radius: 24px;
		text-align: left;
		cursor: pointer;
		font-family: var(--font-body);
		color: var(--md-sys-color-on-surface);
		transition:
			background 0.25s ease,
			border-color 0.25s ease,
			transform 0.25s var(--motion-easing-standard),
			box-shadow 0.25s ease;
	}

	.cat-card:hover {
		background: rgba(140, 140, 145, 0.16);
		border-color: rgba(255, 255, 255, 0.3);
		transform: translateY(-2px);
		box-shadow: 0 12px 36px rgba(0, 0, 0, 0.15);
	}

	.cat-card.active {
		background: rgba(140, 140, 145, 0.22);
		border-color: rgba(140, 140, 145, 0.4);
		box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.25), 0 12px 36px rgba(0, 0, 0, 0.2);
	}

	.cat-card-icon {
		width: 48px;
		height: 48px;
		border-radius: 14px;
		background: rgba(140, 140, 145, 0.14);
		border: 1px solid var(--glass-border);
		color: var(--md-sys-color-on-surface);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: transform 0.2s ease;
	}

	.cat-card:hover .cat-card-icon {
		transform: scale(1.08);
	}

	.cat-card-name {
		font-size: 19px;
		font-weight: 600;
	}

	.cat-card-desc {
		color: var(--md-sys-color-on-surface-variant);
		flex: 1;
		line-height: 1.5;
	}

	.cat-card-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: var(--space-3);
		border-top: 1px solid var(--glass-border);
		color: var(--md-sys-color-on-surface-variant);
	}

	/* Expanded posts section */
	.category-posts-section {
		margin-top: var(--space-8);
		padding-top: var(--space-8);
		border-top: 1px solid var(--glass-border);
	}

	.category-posts-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: var(--space-6);
	}

	.cat-badge {
		display: inline-flex;
		align-items: center;
		gap: var(--space-3);
		padding: 8px 18px;
		border-radius: var(--md-sys-shape-corner-full);
		color: var(--md-sys-color-on-surface);
	}

	.view-all-link {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		font-size: 14px;
		font-weight: 500;
		color: var(--md-sys-color-on-surface);
		text-decoration: none;
		transition: opacity 0.2s ease;
	}

	.view-all-link:hover {
		opacity: 0.8;
	}

	.posts-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: var(--space-6);
	}
</style>
