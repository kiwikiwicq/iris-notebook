<script lang="ts">
	import { onMount } from 'svelte';
	import { bookmarksStore } from '$lib/stores/bookmarks.svelte';
	import { getPublishedPosts } from '$lib/data/posts';
	import ArticleCard from '$lib/components/ArticleCard.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';

	const allPosts = getPublishedPosts();

	onMount(() => bookmarksStore.init());

	const savedPosts = $derived(
		allPosts.filter((p) => bookmarksStore.isBookmarked(p.slug))
	);
</script>

<svelte:head>
	<title>Saved Articles – Iris Notebook</title>
	<meta name="description" content="Your saved and bookmarked articles on Iris Notebook." />
	<meta name="robots" content="noindex" />
</svelte:head>

<main class="saved-page" id="main-content">
	<div class="container">
		<Breadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'Saved' }]} />

		<header class="page-header">
			<div class="page-label">
				<span class="material-symbols-rounded icon-filled" style="color: var(--md-sys-color-primary)">bookmarks</span>
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
				<button class="clear-btn" onclick={() => bookmarksStore.clear()}>
					<span class="material-symbols-rounded">delete_sweep</span>
					Clear all bookmarks
				</button>
			</div>

			<div class="posts-grid">
				{#each savedPosts as post, i}
					<ArticleCard {post} index={i} />
				{/each}
			</div>
		{:else}
			<div class="empty-state">
				<div class="empty-icon">
					<span class="material-symbols-rounded">bookmark_border</span>
				</div>
				<h2 class="headline-small">No saved articles yet</h2>
				<p class="body-large">
					Click the bookmark icon on any article card to save it here for later.
				</p>
				<a href="/articles" class="btn-primary">
					<span class="material-symbols-rounded">article</span>
					Browse Articles
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
		margin-block: var(--space-6) var(--space-10);
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.page-label {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		font-size: 13px;
		font-weight: 600;
		color: var(--md-sys-color-primary);
		text-transform: uppercase;
		letter-spacing: 1px;
	}

	.page-subtitle {
		color: var(--md-sys-color-on-surface-variant);
		max-width: 56ch;
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
		border: 1px solid var(--md-sys-color-error);
		background: transparent;
		color: var(--md-sys-color-error);
		font-family: var(--font-body);
		font-size: 13px;
		font-weight: 500;
		cursor: pointer;
		transition:
			background var(--motion-duration-short4) var(--motion-easing-standard),
			color var(--motion-duration-short4) var(--motion-easing-standard);
	}

	.clear-btn:hover {
		background: var(--md-sys-color-error-container);
		color: var(--md-sys-color-on-error-container);
		border-color: transparent;
	}

	.clear-btn .material-symbols-rounded { font-size: 18px; }

	.posts-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: var(--space-6);
	}

	@media (max-width: 480px) {
		.posts-grid { grid-template-columns: 1fr; }
	}

	/* Empty state */
	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: var(--space-5);
		padding: var(--space-20) var(--space-6);
		max-width: 480px;
		margin: 0 auto;
	}

	.empty-icon {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		background: var(--md-sys-color-primary-container);
		color: var(--md-sys-color-on-primary-container);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.empty-icon .material-symbols-rounded { font-size: 40px; }

	.empty-state h2 { color: var(--md-sys-color-on-surface); }

	.empty-state p {
		color: var(--md-sys-color-on-surface-variant);
		max-width: 38ch;
	}

	.btn-primary {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: 14px 28px;
		border-radius: var(--shape-button);
		background: var(--md-sys-color-primary);
		color: var(--md-sys-color-on-primary);
		font-size: 15px;
		font-weight: 600;
		text-decoration: none;
		transition:
			transform var(--motion-duration-short4) var(--motion-easing-standard),
			box-shadow var(--motion-duration-short4) var(--motion-easing-standard);
	}

	.btn-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(103, 80, 164, 0.4);
		color: var(--md-sys-color-on-primary);
	}
</style>
