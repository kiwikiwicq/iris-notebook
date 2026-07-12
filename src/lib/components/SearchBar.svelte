<script lang="ts">
	import { searchStore } from '$lib/stores/search.svelte';
	import { getPublishedPosts } from '$lib/data/posts';
	import { formatDate } from '$lib/utils/format-date';
	import { onMount } from 'svelte';

	// Load posts into search store
	onMount(() => {
		searchStore.setPosts(getPublishedPosts());
	});

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') searchStore.close();
	}

	function handleOverlayClick(e: MouseEvent) {
		if (e.target === e.currentTarget) searchStore.close();
	}

	// Keyboard shortcut Ctrl+K / Cmd+K
	$effect(() => {
		if (typeof window === 'undefined') return;
		const handleGlobal = (e: KeyboardEvent) => {
			if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
				e.preventDefault();
				searchStore.open();
			}
		};
		window.addEventListener('keydown', handleGlobal);
		return () => window.removeEventListener('keydown', handleGlobal);
	});
</script>

{#if searchStore.isOpen}
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<div
		class="search-overlay"
		role="dialog"
		aria-modal="true"
		aria-label="Search articles"
		tabindex="-1"
		onclick={handleOverlayClick}
		onkeydown={handleKeydown}
	>
		<div class="search-container animate-scale-in">
			<!-- Search input -->
			<div class="search-input-wrap">
				<span class="material-symbols-rounded search-icon">search</span>
				<input
					id="search-input"
					type="search"
					class="search-input"
					placeholder="Search articles, tags, categories…"
					bind:value={searchStore.query}
					autocomplete="off"
					autocorrect="off"
					spellcheck="false"
					aria-label="Search query"
					aria-controls="search-results"
				/>
				{#if searchStore.query}
					<button
						class="clear-btn"
						onclick={() => (searchStore.query = '')}
						aria-label="Clear search"
					>
						<span class="material-symbols-rounded">close</span>
					</button>
				{:else}
					<kbd class="kbd">ESC</kbd>
				{/if}
			</div>

			<!-- Results -->
			<div id="search-results" role="listbox">
				{#if searchStore.query.length >= 2 && searchStore.results.length === 0}
					<div class="search-empty">
						<span class="material-symbols-rounded">search_off</span>
						<p>No results for "<strong>{searchStore.query}</strong>"</p>
					</div>
				{:else if searchStore.results.length > 0}
					<p class="results-label label-small">{searchStore.results.length} results</p>
					<ul class="results-list">
						{#each searchStore.results as post, i}
							<li>
								<a
									href={`/articles/${post.slug}`}
									class="result-item"
									onclick={() => searchStore.close()}
									role="option"
									aria-selected="false"
									style="--delay: {i * 40}ms"
								>
									<div class="result-main">
										<span class="result-category label-small">{post.category}</span>
										<span class="result-title body-large">{post.title}</span>
										<span class="result-desc body-medium">{post.description}</span>
									</div>
									<div class="result-meta">
										<span class="label-small">{formatDate(post.date)}</span>
										<span class="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
									</div>
								</a>
							</li>
						{/each}
					</ul>
				{:else}
					<div class="search-hint">
						<p class="body-medium">Try searching for "Android", "Rust", "Linux", or "AI"</p>
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	.search-overlay {
		position: fixed;
		inset: 0;
		z-index: 200;
		background: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(4px);
		display: flex;
		align-items: flex-start;
		justify-content: center;
		padding-top: 80px;
		padding-inline: var(--space-4);
	}

	.search-container {
		width: 100%;
		max-width: 600px;
		background: var(--md-sys-color-surface-container-highest);
		border-radius: var(--shape-dialog);
		box-shadow: var(--md-sys-elevation-5);
		overflow: hidden;
	}

	.search-input-wrap {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-4) var(--space-5);
		border-bottom: 1px solid var(--md-sys-color-outline-variant);
	}

	.search-icon {
		color: var(--md-sys-color-on-surface-variant);
		flex-shrink: 0;
	}

	.search-input {
		flex: 1;
		border: none;
		background: transparent;
		font-family: var(--font-body);
		font-size: 18px;
		color: var(--md-sys-color-on-surface);
		outline: none;
	}

	.search-input::placeholder {
		color: var(--md-sys-color-on-surface-variant);
	}

	/* Remove browser default search clear button */
	.search-input::-webkit-search-decoration,
	.search-input::-webkit-search-cancel-button {
		display: none;
	}

	.clear-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: var(--md-sys-shape-corner-full);
		border: none;
		background: var(--md-sys-color-surface-container);
		color: var(--md-sys-color-on-surface-variant);
		cursor: pointer;
		flex-shrink: 0;
	}

	.clear-btn .material-symbols-rounded { font-size: 18px; }

	.kbd {
		font-family: var(--font-mono);
		font-size: 11px;
		padding: 2px 6px;
		background: var(--md-sys-color-surface-container);
		border: 1px solid var(--md-sys-color-outline-variant);
		border-radius: 4px;
		color: var(--md-sys-color-on-surface-variant);
		white-space: nowrap;
	}

	.results-label {
		padding: var(--space-3) var(--space-5) var(--space-2);
		color: var(--md-sys-color-on-surface-variant);
		text-transform: uppercase;
		letter-spacing: 1px;
	}

	.results-list {
		list-style: none;
		max-height: 420px;
		overflow-y: auto;
	}

	.result-item {
		display: flex;
		align-items: center;
		gap: var(--space-4);
		padding: var(--space-4) var(--space-5);
		text-decoration: none;
		color: var(--md-sys-color-on-surface);
		transition: background var(--motion-duration-short3) var(--motion-easing-standard);
		animation: slide-up var(--motion-duration-medium1) var(--motion-easing-emphasized-decelerate) var(--delay, 0ms) both;
	}

	.result-item:hover {
		background: color-mix(in srgb, var(--md-sys-color-primary) 8%, transparent);
	}

	.result-main {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.result-category {
		color: var(--md-sys-color-primary);
		text-transform: uppercase;
		letter-spacing: 0.8px;
	}

	.result-title {
		font-weight: 500;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.result-desc {
		color: var(--md-sys-color-on-surface-variant);
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.result-meta {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		color: var(--md-sys-color-on-surface-variant);
		flex-shrink: 0;
		font-size: 12px;
	}

	.result-meta .material-symbols-rounded { font-size: 18px; }

	.search-empty, .search-hint {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-10) var(--space-6);
		color: var(--md-sys-color-on-surface-variant);
		text-align: center;
	}

	.search-empty .material-symbols-rounded { font-size: 48px; opacity: 0.5; }
</style>
