<script lang="ts">
	import { onMount } from 'svelte';
	import { bookmarksStore } from '$lib/stores/bookmarks.svelte';
	import { getPublishedPosts } from '$lib/data/posts';
	import ArticleCard from '$lib/components/ArticleCard.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import SFIcon from '$lib/components/SFIcon.svelte';

	const allPosts = getPublishedPosts();

	onMount(() => bookmarksStore.init());

	const savedPosts = $derived(
		allPosts.filter((p) => bookmarksStore.isBookmarked(p.slug))
	);
</script>

<svelte:head>
	<title>Saved Articles — Iris Notebook</title>
	<meta name="description" content="Your saved and bookmarked articles on Iris Notebook." />
	<meta name="robots" content="noindex" />
</svelte:head>

<main class="saved-page" id="main-content">
	<div class="container">
		<Breadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'Saved' }]} />

		<header class="page-header">
			<div class="page-label">
				<SFIcon name="bookmarked" size={15} />
				<span class="label-medium">Reading List</span>
			</div>
			<h1 class="display-small">Saved Articles</h1>
			<p class="body-large page-subtitle">
				{#if savedPosts.length > 0}
					{savedPosts.length} article{savedPosts.length === 1 ? '' : 's'} saved to your reading list.
				{:else}
					Your reading list is empty.
				{/if}
			</p>
		</header>

		{#if savedPosts.length > 0}
			<div class="toolbar">
				<button class="clear-btn liquid-glass" onclick={() => bookmarksStore.clear()}>
					<SFIcon name="close" size={14} />
					<span>Clear all bookmarks</span>
				</button>
			</div>

			<div class="posts-grid">
				{#each savedPosts as post, i}
					<ArticleCard {post} index={i} />
				{/each}
			</div>
		{:else}
			<div class="empty-state liquid-glass">
				<div class="empty-icon">
					<SFIcon name="bookmark" size={32} />
				</div>
				<h2 class="headline-small">No saved articles yet</h2>
				<p class="body-large">
					Click the bookmark icon on any article card to save it here for later.
				</p>
				<a href="/articles" class="btn-primary">
					<SFIcon name="articles" size={15} color="var(--md-sys-color-surface)" />
					<span>Browse Articles</span>
				</a>
			</div>
		{/if}
	</div>
</main>

<style>
	.saved-page {
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

	.page-label {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		color: var(--md-sys-color-on-surface-variant);
	}

	.page-subtitle {
		color: var(--md-sys-color-on-surface-variant);
	}

	.toolbar {
		display: flex;
		justify-content: flex-end;
		margin-bottom: var(--space-6);
	}

	.clear-btn {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: 8px 16px;
		border-radius: var(--md-sys-shape-corner-full);
		color: var(--md-sys-color-on-surface);
		font-size: 13px;
		font-weight: 500;
		cursor: pointer;
		transition: background 0.2s ease;
	}

	.clear-btn:hover {
		background: rgba(140, 140, 145, 0.2);
	}

	.posts-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: var(--space-6);
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

	.empty-icon {
		width: 64px;
		height: 64px;
		border-radius: 50%;
		background: rgba(140, 140, 145, 0.16);
		border: 1px solid var(--glass-border);
		color: var(--md-sys-color-on-surface);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.btn-primary {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 11px 22px;
		border-radius: var(--md-sys-shape-corner-full);
		background: var(--md-sys-color-on-surface);
		color: var(--md-sys-color-surface);
		font-size: 14px;
		font-weight: 600;
		text-decoration: none;
		transition: opacity 0.2s ease;
	}

	.btn-primary:hover {
		opacity: 0.92;
	}
</style>
