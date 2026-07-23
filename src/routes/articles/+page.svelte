<script lang="ts">
	import ArticleCard from '$lib/components/ArticleCard.svelte';
	import CategoryChip from '$lib/components/CategoryChip.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import SFIcon from '$lib/components/SFIcon.svelte';
	import { getPublishedPosts } from '$lib/data/posts';
	import { categories } from '$lib/data/categories';
	import { languageStore } from '$lib/stores/language.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	const allPosts = getPublishedPosts();

	let selectedCategory = $state('');
	let currentPage = $state(1);
	const POSTS_PER_PAGE = 6;

	// Sync from URL search params
	$effect(() => {
		const cat = $page.url.searchParams.get('category') ?? '';
		const p = parseInt($page.url.searchParams.get('page') ?? '1') || 1;
		selectedCategory = cat;
		currentPage = p;
	});

	const filteredPosts = $derived(
		selectedCategory
			? allPosts.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase())
			: allPosts
	);

	const totalPages = $derived(Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
	const paginatedPosts = $derived(
		filteredPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE)
	);

	function selectCategory(slug: string) {
		const next = selectedCategory === slug ? '' : slug;
		goto(next ? `/articles?category=${next}` : '/articles', { replaceState: true });
	}

	function handlePageChange(p: number) {
		const params = new URLSearchParams($page.url.searchParams);
		params.set('page', String(p));
		goto(`/articles?${params}`, { replaceState: true });
	}
</script>

<svelte:head>
	<title>{languageStore.t.articlesPage.title} — Iris Notebook</title>
	<meta name="description" content={languageStore.t.articlesPage.description} />
</svelte:head>

<main class="articles-page" id="main-content">
	<div class="container">
		<Breadcrumbs crumbs={[{ label: languageStore.t.nav.overview, href: '/' }, { label: languageStore.t.nav.articles }]} />

		<header class="page-header">
			<h1 class="display-small">{languageStore.t.articlesPage.title}</h1>
			<p class="body-large page-subtitle">
				{allPosts.length} {languageStore.t.articlesPage.description}
			</p>
		</header>

		<!-- Category filter -->
		<div class="filter-bar" role="group" aria-label="Filter by category">
			<button
				class="filter-all"
				class:active={!selectedCategory}
				onclick={() => selectCategory('')}
				aria-pressed={!selectedCategory}
			>
				{languageStore.t.articlesPage.allCategories}
			</button>
			{#each categories as category}
				<CategoryChip
					{category}
					active={selectedCategory === category.slug}
					onclick={selectCategory}
				/>
			{/each}
		</div>

		<!-- Posts grid -->
		{#if paginatedPosts.length > 0}
			<div class="posts-grid">
				{#each paginatedPosts as post, i}
					<ArticleCard {post} index={(currentPage - 1) * POSTS_PER_PAGE + i} />
				{/each}
			</div>
		{:else}
			<div class="empty-state liquid-glass">
				<SFIcon name="search" size={48} />
				<h2 class="headline-small">No posts found</h2>
				<p class="body-large">Try selecting a different category or clear the filter.</p>
				<button class="btn-outlined-primary" onclick={() => selectCategory('')}>
					Clear filter
				</button>
			</div>
		{/if}

		<Pagination {currentPage} {totalPages} onPageChange={handlePageChange} />
	</div>
</main>

<style>
	.articles-page {
		padding-top: calc(var(--nav-height) + var(--space-8));
		padding-bottom: var(--space-20);
		min-height: 100vh;
	}

	.page-header {
		margin-block: var(--space-6) var(--space-8);
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.page-subtitle {
		color: var(--md-sys-color-on-surface-variant);
		max-width: 56ch;
	}

	.filter-bar {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		margin-bottom: var(--space-8);
		align-items: center;
	}

	.filter-all {
		display: inline-flex;
		align-items: center;
		padding: 8px 18px;
		border-radius: var(--md-sys-shape-corner-full);
		border: 1px solid var(--liquid-glass-border);
		background: var(--liquid-glass-bg);
		backdrop-filter: var(--liquid-blur);
		-webkit-backdrop-filter: var(--liquid-blur);
		box-shadow: var(--liquid-glass-shadow);
		color: var(--md-sys-color-on-surface-variant);
		font-family: var(--font-body);
		font-size: 13px;
		font-weight: 500;
		letter-spacing: -0.01em;
		cursor: pointer;
		transition:
			background var(--motion-duration-short4) var(--motion-easing-standard),
			color var(--motion-duration-short4) var(--motion-easing-standard),
			border-color var(--motion-duration-short4) var(--motion-easing-standard);
	}

	.filter-all:hover {
		background: rgba(140, 140, 145, 0.16);
		color: var(--md-sys-color-on-surface);
	}

	.filter-all.active {
		background: rgba(140, 140, 145, 0.22);
		border-color: rgba(140, 140, 145, 0.35);
		color: var(--md-sys-color-on-surface);
		font-weight: 600;
	}

	.posts-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: var(--space-6);
	}

	@media (max-width: 480px) {
		.posts-grid { grid-template-columns: 1fr; }
	}

	.empty-state {
		text-align: center;
		padding: var(--space-16) var(--space-6);
		border-radius: 24px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-4);
		color: var(--md-sys-color-on-surface-variant);
	}

	.empty-state .material-symbols-rounded {
		font-size: 64px;
		opacity: 0.4;
	}

	.btn-outlined-primary {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: 12px 24px;
		border-radius: var(--shape-button);
		border: 1.5px solid var(--md-sys-color-primary);
		color: var(--md-sys-color-primary);
		font-size: 14px;
		font-weight: 600;
		cursor: pointer;
		background: transparent;
		font-family: var(--font-body);
		text-decoration: none;
		transition: background var(--motion-duration-short4) var(--motion-easing-standard);
	}

	.btn-outlined-primary:hover {
		background: var(--md-sys-color-primary-container);
		color: var(--md-sys-color-on-primary-container);
	}
</style>
