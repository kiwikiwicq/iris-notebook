<script lang="ts">
	import SFIcon from './SFIcon.svelte';

	interface Crumb {
		label: string;
		href?: string;
	}

	interface Props {
		crumbs: Crumb[];
	}

	let { crumbs }: Props = $props();
</script>

<nav class="breadcrumbs" aria-label="Breadcrumb">
	<ol>
		{#each crumbs as crumb, i}
			<li>
				{#if crumb.href && i < crumbs.length - 1}
					<a href={crumb.href}>{crumb.label}</a>
				{:else}
					<span aria-current="page">{crumb.label}</span>
				{/if}
			</li>
			{#if i < crumbs.length - 1}
				<li class="sep" aria-hidden="true">
					<SFIcon name="arrowRight" size={12} color="var(--md-sys-color-on-surface-variant)" />
				</li>
			{/if}
		{/each}
	</ol>
</nav>

<style>
	.breadcrumbs ol {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 2px;
		list-style: none;
	}

	.breadcrumbs li {
		display: flex;
		align-items: center;
	}

	.breadcrumbs a {
		font-size: 13px;
		font-weight: 500;
		color: var(--md-sys-color-on-surface-variant);
		text-decoration: none;
		padding: 4px 6px;
		border-radius: 6px;
		transition: background 0.2s ease, color 0.2s ease;
	}

	.breadcrumbs a:hover {
		background: rgba(140, 140, 145, 0.14);
		color: var(--md-sys-color-on-surface);
	}

	.breadcrumbs span[aria-current='page'] {
		font-size: 13px;
		font-weight: 600;
		color: var(--md-sys-color-on-surface);
		padding: 4px 6px;
	}

	.sep {
		opacity: 0.6;
		padding-inline: 2px;
	}

	@media (max-width: 640px) {
		.breadcrumbs span[aria-current='page'] {
			max-width: 160px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			display: inline-block;
			vertical-align: middle;
		}
	}
</style>
