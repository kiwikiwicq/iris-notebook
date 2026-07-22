<script lang="ts">
	import NavBrand from './nav/NavBrand.svelte';
	import NavMenu from './nav/NavMenu.svelte';
	import NavActions from './nav/NavActions.svelte';
	import SearchBar from './SearchBar.svelte';

	interface Props {
		onMenuClick: () => void;
	}

	let { onMenuClick }: Props = $props();

	let scrolled = $state(false);

	$effect(() => {
		if (typeof window !== 'undefined') {
			const handleScroll = () => {
				scrolled = window.scrollY > 12;
			};
			window.addEventListener('scroll', handleScroll, { passive: true });
			return () => window.removeEventListener('scroll', handleScroll);
		}
	});
</script>

<header class="app-bar" class:scrolled aria-label="Site navigation">
	<div class="app-bar__container">
		<NavBrand />
		<NavMenu />
		<NavActions {onMenuClick} />
	</div>
</header>

<SearchBar />

<style>
	.app-bar {
		position: fixed;
		top: 14px;
		left: 0;
		right: 0;
		z-index: 100;
		pointer-events: none;
		transition: top 0.3s var(--motion-easing-standard);
	}

	.app-bar.scrolled {
		top: 8px;
	}

	.app-bar__container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		max-width: var(--max-width);
		margin-inline: auto;
		padding-inline: var(--space-6);
		gap: 12px;
	}

	@media (max-width: 768px) {
		.app-bar {
			top: 10px;
		}
		.app-bar.scrolled {
			top: 6px;
		}
		.app-bar__container {
			padding-inline: 14px;
			gap: 8px;
		}
	}
</style>
