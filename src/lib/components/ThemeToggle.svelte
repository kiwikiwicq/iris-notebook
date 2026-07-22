<script lang="ts">
	import { themeStore } from '$lib/stores/theme.svelte';
	import SFIcon from './SFIcon.svelte';

	let isDark = $derived(themeStore.isDark);
</script>

<button
	class="theme-toggle"
	class:dark={isDark}
	onclick={() => themeStore.toggle()}
	aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
	title={isDark ? 'Light mode' : 'Dark mode'}
>
	<div class="toggle-track">
		<div class="toggle-thumb">
			{#if isDark}
				<SFIcon name="darkMode" size={12} color="#000000" />
			{:else}
				<SFIcon name="lightMode" size={12} color="#1D1D1F" />
			{/if}
		</div>
	</div>
</button>

<style>
	.theme-toggle {
		display: flex;
		align-items: center;
		padding: 2px;
		border-radius: var(--md-sys-shape-corner-full);
		border: 1px solid var(--glass-border);
		background: rgba(140, 140, 145, 0.15);
		cursor: pointer;
		transition: background var(--motion-duration-short4) var(--motion-easing-standard);
	}

	.theme-toggle:hover {
		background: rgba(140, 140, 145, 0.25);
		border-color: rgba(255, 255, 255, 0.25);
	}

	.toggle-track {
		position: relative;
		width: 44px;
		height: 24px;
		border-radius: 9999px;
	}

	.toggle-thumb {
		position: absolute;
		top: 2px;
		left: 2px;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: #ffffff;
		color: #1d1d1f;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
		transition:
			transform var(--motion-duration-medium1) var(--motion-easing-standard),
			background var(--motion-duration-medium1) var(--motion-easing-standard),
			color var(--motion-duration-medium1) var(--motion-easing-standard);
	}

	.dark .toggle-thumb {
		transform: translateX(20px);
		background: #ffffff;
		color: #000000;
	}
</style>
