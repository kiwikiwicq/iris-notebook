<script lang="ts">
	import { searchStore } from '$lib/stores/search.svelte';
	import { languageStore } from '$lib/stores/language.svelte';
	import { getPublishedPosts } from '$lib/data/posts';
	import { formatDate } from '$lib/utils/format-date';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import SFIcon from './SFIcon.svelte';

	// Load posts into search store
	onMount(() => {
		searchStore.setPosts(getPublishedPosts());
	});

	let selectedIndex = $state(-1);

	// Reset selection when query changes
	$effect(() => {
		searchStore.query;
		selectedIndex = -1;
	});

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			e.preventDefault();
			searchStore.close();
			return;
		}

		const resultsLength = searchStore.results.length;
		if (resultsLength === 0) return;

		if (e.key === 'ArrowDown') {
			e.preventDefault();
			selectedIndex = (selectedIndex + 1) % resultsLength;
			scrollToSelected();
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			selectedIndex = selectedIndex - 1 < 0 ? resultsLength - 1 : selectedIndex - 1;
			scrollToSelected();
		} else if (e.key === 'Enter') {
			e.preventDefault();
			const idx = selectedIndex >= 0 ? selectedIndex : 0;
			if (searchStore.results[idx]) {
				goto(`/articles/${searchStore.results[idx].slug}`);
				searchStore.close();
			}
		}
	}

	function scrollToSelected() {
		setTimeout(() => {
			const activeEl = document.querySelector('.result-item.active');
			if (activeEl) {
				activeEl.scrollIntoView({ block: 'nearest' });
			}
		}, 0);
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
				<SFIcon name="search" size={18} color="var(--md-sys-color-on-surface-variant)" />
				<input
					id="search-input"
					type="search"
					class="search-input"
					placeholder={languageStore.t.search.modalPlaceholder}
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
						<SFIcon name="close" size={14} />
					</button>
				{:else}
					<kbd class="kbd">ESC</kbd>
				{/if}
			</div>

			<!-- Results -->
			<div id="search-results" role="listbox">
				{#if searchStore.query.length >= 2 && searchStore.results.length === 0}
					<div class="search-empty">
						<SFIcon name="search" size={36} />
						<p>{languageStore.t.search.noResults} for "<strong>{searchStore.query}</strong>"</p>
					</div>
				{:else if searchStore.results.length > 0}
					<p class="results-label">{searchStore.results.length} results</p>
					<ul class="results-list">
						{#each searchStore.results as post, i}
							<li>
								<a
									href={`/articles/${post.slug}`}
									class="result-item"
									class:active={selectedIndex === i}
									onclick={() => searchStore.close()}
									role="option"
									aria-selected={selectedIndex === i}
									style="--delay: {i * 40}ms"
								>
									<div class="result-main">
										<span class="result-category">{post.category}</span>
										<span class="result-title">{post.title}</span>
										<span class="result-desc">{post.description}</span>
									</div>
									<div class="result-meta">
										<span>{formatDate(post.date)}</span>
										<SFIcon name="arrowRight" size={14} />
									</div>
								</a>
							</li>
						{/each}
					</ul>
				{:else}
					<div class="search-hint">
						<p>Spotlight Search — Type to search Android, Linux, AI or System Architecture</p>
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
		background: rgba(0, 0, 0, 0.45);
		backdrop-filter: var(--liquid-blur);
		-webkit-backdrop-filter: var(--liquid-blur);
		display: flex;
		align-items: flex-start;
		justify-content: center;
		padding-top: 90px;
		padding-inline: var(--space-4);
	}

	.search-container {
		width: 100%;
		max-width: 620px;
		background: var(--liquid-glass-bg);
		backdrop-filter: var(--liquid-blur);
		-webkit-backdrop-filter: var(--liquid-blur);
		border-radius: 22px;
		border: 1px solid var(--liquid-glass-border);
		box-shadow: var(--liquid-glass-shadow);
		overflow: hidden;
	}

	.search-input-wrap {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 16px 20px;
		border-bottom: 1px solid var(--glass-border);
	}

	.search-icon {
		color: var(--apple-blue);
		flex-shrink: 0;
	}

	.search-input {
		flex: 1;
		border: none;
		background: transparent;
		font-family: var(--font-body);
		font-size: 18px;
		font-weight: 500;
		color: var(--md-sys-color-on-surface);
		outline: none;
	}

	.search-input::placeholder {
		color: var(--md-sys-color-on-surface-variant);
		font-weight: 400;
	}

	.search-input::-webkit-search-decoration,
	.search-input::-webkit-search-cancel-button {
		display: none;
	}

	.clear-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		border-radius: var(--md-sys-shape-corner-full);
		border: none;
		background: rgba(140, 140, 145, 0.15);
		color: var(--md-sys-color-on-surface-variant);
		cursor: pointer;
		flex-shrink: 0;
	}

	.clear-btn .material-symbols-rounded { font-size: 16px; }

	.kbd {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
		font-size: 10px;
		font-weight: 600;
		padding: 2px 6px;
		min-width: 20px;
		height: 20px;
		background: rgba(140, 140, 145, 0.16);
		border: 1px solid var(--glass-border);
		border-radius: 5px;
		box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.18);
		color: var(--md-sys-color-on-surface-variant);
		white-space: nowrap;
		line-height: 1;
	}

	.results-label {
		padding: 12px 20px 6px;
		color: var(--md-sys-color-on-surface-variant);
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.results-list {
		list-style: none;
		max-height: 400px;
		overflow-y: auto;
		padding: 6px;
	}

	.result-item {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 12px 14px;
		border-radius: 12px;
		text-decoration: none;
		color: var(--md-sys-color-on-surface);
		transition: background var(--motion-duration-short3) var(--motion-easing-standard);
	}

	.result-item:hover,
	.result-item.active {
		background: rgba(140, 140, 145, 0.18);
		color: var(--md-sys-color-on-surface);
	}

	.result-item:hover .result-category,
	.result-item.active .result-category,
	.result-item:hover .result-desc,
	.result-item.active .result-desc,
	.result-item:hover .result-meta,
	.result-item.active .result-meta {
		color: var(--md-sys-color-on-surface-variant);
	}

	.result-main {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.result-category {
		font-size: 11px;
		font-weight: 700;
		color: var(--md-sys-color-on-surface-variant);
		text-transform: uppercase;
		letter-spacing: 0.02em;
	}

	.result-title {
		font-size: 15px;
		font-weight: 600;
		letter-spacing: -0.01em;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.result-desc {
		font-size: 13px;
		color: var(--md-sys-color-on-surface-variant);
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.result-meta {
		display: flex;
		align-items: center;
		gap: 6px;
		color: var(--md-sys-color-on-surface-variant);
		flex-shrink: 0;
		font-size: 12px;
	}

	.result-meta .material-symbols-rounded { font-size: 16px; }

	.search-empty, .search-hint {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12px;
		padding: 40px 24px;
		color: var(--md-sys-color-on-surface-variant);
		font-size: 14px;
		text-align: center;
	}

	.search-empty .material-symbols-rounded { font-size: 40px; opacity: 0.5; }
</style>
