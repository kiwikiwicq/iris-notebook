<script lang="ts">
	import SFIcon from './SFIcon.svelte';

	let show = $state(false);

	$effect(() => {
		if (typeof window === 'undefined') return;
		const handleScroll = () => {
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
	<SFIcon name="arrowUp" size={18} />
</button>

<style>
	.back-to-top {
		position: fixed;
		bottom: calc(var(--space-6) + env(safe-area-inset-bottom, 0px));
		right: var(--space-6);
		z-index: 85;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		border-radius: var(--md-sys-shape-corner-full);
		border: 1px solid var(--liquid-glass-border);
		background: var(--liquid-glass-bg);
		backdrop-filter: var(--liquid-blur);
		-webkit-backdrop-filter: var(--liquid-blur);
		color: var(--md-sys-color-on-surface);
		cursor: pointer;
		box-shadow: var(--liquid-glass-shadow);
		opacity: 0;
		visibility: hidden;
		transform: translateY(20px) scale(0.9);
		transition:
			opacity var(--motion-duration-medium1) var(--motion-easing-emphasized-decelerate),
			visibility var(--motion-duration-medium1) var(--motion-easing-emphasized-decelerate),
			transform var(--motion-duration-medium1) var(--motion-easing-emphasized-decelerate),
			background var(--motion-duration-short4) var(--motion-easing-standard),
			border-color var(--motion-duration-short4) var(--motion-easing-standard);
	}

	.back-to-top.show {
		opacity: 1;
		visibility: visible;
		transform: translateY(0) scale(1);
	}

	.back-to-top:hover {
		background: rgba(140, 140, 145, 0.2);
		border-color: rgba(255, 255, 255, 0.3);
		transform: translateY(-2px) scale(1.02);
	}

	.back-to-top:active {
		transform: translateY(0) scale(0.98);
	}

	@media (max-width: 768px) {
		.back-to-top {
			display: none !important;
		}
	}
</style>
