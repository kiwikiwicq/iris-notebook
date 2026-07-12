<script lang="ts">
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
					<span class="material-symbols-rounded">chevron_right</span>
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
		gap: 0;
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
		border-radius: var(--md-sys-shape-corner-extra-small);
		transition: background var(--motion-duration-short4) var(--motion-easing-standard),
		            color var(--motion-duration-short4) var(--motion-easing-standard);
	}

	.breadcrumbs a:hover {
		background: color-mix(in srgb, var(--md-sys-color-on-surface) 8%, transparent);
		color: var(--md-sys-color-on-surface);
	}

	.breadcrumbs span[aria-current='page'] {
		font-size: 13px;
		font-weight: 600;
		color: var(--md-sys-color-on-surface);
		padding: 4px 6px;
	}

	.sep .material-symbols-rounded {
		font-size: 16px;
		color: var(--md-sys-color-outline);
	}
</style>
