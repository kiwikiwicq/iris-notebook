<script lang="ts">
	import { getCategoryColor } from '$lib/data/categories';

	interface Props {
		tag: string;
		small?: boolean;
		href?: string;
	}

	let { tag, small = false, href }: Props = $props();

	// Use category color if it matches, otherwise use secondary
	const color = getCategoryColor(tag);
</script>

{#if href}
	<a class="tag" class:small {href} style="--tag-color: {color}">
		{tag}
	</a>
{:else}
	<span class="tag" class:small style="--tag-color: {color}">
		{tag}
	</span>
{/if}

<style>
	.tag {
		display: inline-flex;
		align-items: center;
		padding: 3px 10px;
		border-radius: var(--md-sys-shape-corner-full);
		background: color-mix(in srgb, var(--tag-color, #6750A4) 12%, transparent);
		color: var(--tag-color, var(--md-sys-color-primary));
		font-size: 12px;
		font-weight: 500;
		letter-spacing: 0.3px;
		text-decoration: none;
		white-space: nowrap;
		border: 1px solid color-mix(in srgb, var(--tag-color, #6750A4) 25%, transparent);
		transition:
			background var(--motion-duration-short4) var(--motion-easing-standard),
			transform var(--motion-duration-short3) var(--motion-easing-standard);
	}

	.tag:hover {
		background: color-mix(in srgb, var(--tag-color, #6750A4) 20%, transparent);
		transform: translateY(-1px);
	}

	.tag.small {
		font-size: 11px;
		padding: 2px 8px;
	}
</style>
