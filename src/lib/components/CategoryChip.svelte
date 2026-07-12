<script lang="ts">
	import type { Category } from '$lib/data/categories';

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
	style="--chip-color: {category.color}; --chip-container: {category.colorContainer}"
	aria-pressed={active}
>
	<span class="material-symbols-rounded chip-icon">{category.icon}</span>
	<span class="chip-label">{category.name}</span>
</button>

<style>
	.category-chip {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: 8px 16px;
		border-radius: var(--md-sys-shape-corner-small);
		border: 1px solid var(--md-sys-color-outline-variant);
		background: var(--md-sys-color-surface-container-low);
		color: var(--md-sys-color-on-surface-variant);
		font-family: var(--font-body);
		font-size: 14px;
		font-weight: 500;
		letter-spacing: 0.1px;
		cursor: pointer;
		transition:
			background var(--motion-duration-short4) var(--motion-easing-standard),
			color var(--motion-duration-short4) var(--motion-easing-standard),
			border-color var(--motion-duration-short4) var(--motion-easing-standard),
			transform var(--motion-duration-short3) var(--motion-easing-standard),
			box-shadow var(--motion-duration-short4) var(--motion-easing-standard);
	}

	.category-chip:hover {
		background: var(--chip-container, var(--md-sys-color-surface-container-high));
		border-color: var(--chip-color, var(--md-sys-color-primary));
		color: var(--chip-color, var(--md-sys-color-primary));
		transform: translateY(-2px);
		box-shadow: 0 4px 12px color-mix(in srgb, var(--chip-color, #6750A4) 20%, transparent);
	}

	.category-chip.active {
		background: var(--chip-container, var(--md-sys-color-primary-container));
		border-color: var(--chip-color, var(--md-sys-color-primary));
		color: var(--chip-color, var(--md-sys-color-primary));
		font-weight: 600;
	}

	.chip-icon {
		font-size: 18px;
	}

	.chip-label {
		line-height: 1;
	}
</style>
