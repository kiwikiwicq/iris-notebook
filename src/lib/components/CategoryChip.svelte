<script lang="ts">
	import type { Category } from '$lib/data/categories';
	import SFIcon from './SFIcon.svelte';

	interface Props {
		category: Category;
		active?: boolean;
		onclick?: (slug: string) => void;
	}

	let { category, active = false, onclick }: Props = $props();
</script>

<button
	class="category-chip"
	class:active
	onclick={() => onclick?.(category.slug)}
	aria-pressed={active}
>
	<SFIcon name="code" size={15} color="currentColor" />
	<span class="chip-label">{category.name}</span>
</button>

<style>
	.category-chip {
		display: inline-flex;
		align-items: center;
		gap: 8px;
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
			background 0.2s ease,
			color 0.2s ease,
			border-color 0.2s ease,
			transform 0.2s ease;
	}

	.category-chip:hover {
		background: rgba(140, 140, 145, 0.16);
		color: var(--md-sys-color-on-surface);
		transform: translateY(-1px);
	}

	.category-chip.active {
		background: rgba(140, 140, 145, 0.22);
		border-color: rgba(140, 140, 145, 0.35);
		color: var(--md-sys-color-on-surface);
		font-weight: 600;
		box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.2), 0 4px 12px rgba(0, 0, 0, 0.08);
	}

	.chip-label {
		line-height: 1;
	}
</style>
