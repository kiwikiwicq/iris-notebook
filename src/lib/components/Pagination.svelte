<script lang="ts">
	import SFIcon from './SFIcon.svelte';

	interface Props {
		currentPage: number;
		totalPages: number;
		onPageChange: (page: number) => void;
	}

	let { currentPage, totalPages, onPageChange }: Props = $props();

	const pages = $derived(
		Array.from({ length: totalPages }, (_, i) => i + 1).filter(
			(p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1
		)
	);
</script>

{#if totalPages > 1}
	<nav class="pagination" aria-label="Pagination">
		<button
			class="page-btn icon-btn liquid-glass"
			disabled={currentPage === 1}
			onclick={() => onPageChange(currentPage - 1)}
			aria-label="Previous page"
		>
			<SFIcon name="arrowRight" size={14} class="icon-flip" />
		</button>

		{#each pages as page, i}
			{#if i > 0 && pages[i - 1] !== page - 1}
				<span class="ellipsis" aria-hidden="true">…</span>
			{/if}
			<button
				class="page-btn liquid-glass"
				class:active={page === currentPage}
				onclick={() => onPageChange(page)}
				aria-label={`Page ${page}`}
				aria-current={page === currentPage ? 'page' : undefined}
			>
				{page}
			</button>
		{/each}

		<button
			class="page-btn icon-btn liquid-glass"
			disabled={currentPage === totalPages}
			onclick={() => onPageChange(currentPage + 1)}
			aria-label="Next page"
		>
			<SFIcon name="arrowRight" size={14} />
		</button>
	</nav>
{/if}

<style>
	.pagination {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-2);
		padding-block: var(--space-8);
	}

	.page-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 38px;
		height: 38px;
		padding-inline: var(--space-3);
		border-radius: var(--md-sys-shape-corner-full);
		color: var(--md-sys-color-on-surface-variant);
		font-family: var(--font-body);
		font-size: 13px;
		font-weight: 500;
		cursor: pointer;
		transition: background 0.2s ease, color 0.2s ease;
	}

	.page-btn:hover:not(:disabled) {
		background: rgba(140, 140, 145, 0.18);
		color: var(--md-sys-color-on-surface);
	}

	.page-btn.active {
		background: rgba(140, 140, 145, 0.25);
		border-color: rgba(140, 140, 145, 0.4);
		color: var(--md-sys-color-on-surface);
		font-weight: 600;
	}

	.page-btn:disabled {
		opacity: 0.38;
		cursor: not-allowed;
	}

	.page-btn.icon-btn {
		width: 38px;
	}

	.ellipsis {
		color: var(--md-sys-color-on-surface-variant);
		padding-inline: var(--space-2);
	}
</style>
