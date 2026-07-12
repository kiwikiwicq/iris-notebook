<script lang="ts">
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
			class="page-btn icon-btn"
			disabled={currentPage === 1}
			onclick={() => onPageChange(currentPage - 1)}
			aria-label="Previous page"
		>
			<span class="material-symbols-rounded">arrow_back</span>
		</button>

		{#each pages as page, i}
			{#if i > 0 && pages[i - 1] !== page - 1}
				<span class="ellipsis" aria-hidden="true">…</span>
			{/if}
			<button
				class="page-btn"
				class:active={page === currentPage}
				onclick={() => onPageChange(page)}
				aria-label={`Page ${page}`}
				aria-current={page === currentPage ? 'page' : undefined}
			>
				{page}
			</button>
		{/each}

		<button
			class="page-btn icon-btn"
			disabled={currentPage === totalPages}
			onclick={() => onPageChange(currentPage + 1)}
			aria-label="Next page"
		>
			<span class="material-symbols-rounded">arrow_forward</span>
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
		min-width: 40px;
		height: 40px;
		padding-inline: var(--space-3);
		border-radius: var(--md-sys-shape-corner-full);
		border: 1px solid transparent;
		background: transparent;
		color: var(--md-sys-color-on-surface-variant);
		font-family: var(--font-body);
		font-size: 14px;
		font-weight: 500;
		cursor: pointer;
		transition:
			background var(--motion-duration-short4) var(--motion-easing-standard),
			color var(--motion-duration-short4) var(--motion-easing-standard),
			border-color var(--motion-duration-short4) var(--motion-easing-standard);
	}

	.page-btn:hover:not(:disabled) {
		background: color-mix(in srgb, var(--md-sys-color-on-surface) 8%, transparent);
		color: var(--md-sys-color-on-surface);
	}

	.page-btn.active {
		background: var(--md-sys-color-primary);
		color: var(--md-sys-color-on-primary);
		border-color: var(--md-sys-color-primary);
	}

	.page-btn:disabled {
		opacity: 0.38;
		cursor: not-allowed;
	}

	.page-btn.icon-btn {
		width: 40px;
	}

	.ellipsis {
		color: var(--md-sys-color-on-surface-variant);
		padding-inline: var(--space-2);
	}
</style>
