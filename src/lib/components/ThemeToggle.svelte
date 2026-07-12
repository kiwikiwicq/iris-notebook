<script lang="ts">
	import { themeStore } from '$lib/stores/theme.svelte';

	let isDark = $derived(themeStore.isDark);
</script>

<button
	class="theme-toggle"
	onclick={() => themeStore.toggle()}
	aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
	title={isDark ? 'Light mode' : 'Dark mode'}
>
	<span class="material-symbols-rounded icon" class:rotate={isDark}>
		{isDark ? 'dark_mode' : 'light_mode'}
	</span>
</button>

<style>
	.theme-toggle {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border-radius: var(--md-sys-shape-corner-full);
		border: none;
		background: transparent;
		color: var(--md-sys-color-on-surface-variant);
		cursor: pointer;
		transition:
			background var(--motion-duration-short4) var(--motion-easing-standard),
			color var(--motion-duration-short4) var(--motion-easing-standard);
	}

	.theme-toggle:hover {
		background: color-mix(in srgb, var(--md-sys-color-on-surface) 8%, transparent);
		color: var(--md-sys-color-on-surface);
	}

	.theme-toggle:active {
		background: color-mix(in srgb, var(--md-sys-color-on-surface) 12%, transparent);
	}

	.icon {
		font-size: 22px;
		transition: transform var(--motion-duration-medium2) var(--motion-easing-emphasized);
	}

	.icon.rotate {
		transform: rotate(20deg);
	}
</style>
