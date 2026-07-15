<script lang="ts">
	import { onMount } from 'svelte';

	let show = $state(false);

	$effect(() => {
		if (typeof window === 'undefined') return;
		const handleScroll = () => {
			// Show button after scrolling down 400px
			show = window.scrollY > 400;
		};
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});

	function scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}
</script>

<button
	class="back-to-top"
	class:show
	onclick={scrollToTop}
	aria-label="Scroll to top"
	title="Back to top"
	aria-hidden={!show}
	tabindex={show ? 0 : -1}
>
	<span class="material-symbols-rounded">arrow_upward</span>
</button>

<style>
	.back-to-top {
		position: fixed;
		bottom: calc(var(--space-6) + env(safe-area-inset-bottom, 0px));
		right: var(--space-6);
		z-index: 85; /* Below overlays/bottom sheets (90+), above normal content */
		display: flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		border-radius: var(--md-sys-shape-corner-full);
		border: 1px solid var(--md-sys-color-outline-variant);
		background: var(--md-sys-color-primary-container);
		color: var(--md-sys-color-on-primary-container);
		cursor: pointer;
		box-shadow: var(--md-sys-elevation-3);
		opacity: 0;
		visibility: hidden;
		transform: translateY(20px) scale(0.9);
		transition:
			opacity var(--motion-duration-medium1) var(--motion-easing-emphasized-decelerate),
			visibility var(--motion-duration-medium1) var(--motion-easing-emphasized-decelerate),
			transform var(--motion-duration-medium1) var(--motion-easing-emphasized-decelerate),
			background var(--motion-duration-short4) var(--motion-easing-standard),
			box-shadow var(--motion-duration-short4) var(--motion-easing-standard);
	}

	.back-to-top.show {
		opacity: 1;
		visibility: visible;
		transform: translateY(0) scale(1);
	}

	.back-to-top:hover {
		background: color-mix(in srgb, var(--md-sys-color-primary-container) 85%, var(--md-sys-color-on-primary-container));
		box-shadow: var(--md-sys-elevation-4);
		transform: translateY(-2px) scale(1.02);
	}

	.back-to-top:active {
		transform: translateY(0) scale(0.98);
	}

	.back-to-top .material-symbols-rounded {
		font-size: 24px;
	}

	/* On mobile, move it up slightly so it doesn't collide with the mobile TOC FAB */
	@media (max-width: 1024px) {
		.back-to-top {
			bottom: calc(var(--space-20) + env(safe-area-inset-bottom, 0px));
		}
	}
</style>
