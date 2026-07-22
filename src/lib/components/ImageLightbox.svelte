<script lang="ts">
	import { onMount } from 'svelte';
	import SFIcon from './SFIcon.svelte';

	interface Props {
		/** CSS selector for the container whose images should be clickable */
		selector?: string;
	}

	let { selector = '.prose' }: Props = $props();

	let lightboxSrc = $state('');
	let lightboxAlt = $state('');
	let isOpen = $state(false);
	let zoomed = $state(false);

	function openLightbox(src: string, alt: string) {
		lightboxSrc = src;
		lightboxAlt = alt;
		isOpen = true;
		zoomed = false;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = 'hidden';
		}
	}

	function closeLightbox() {
		isOpen = false;
		zoomed = false;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = '';
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (!isOpen) return;
		if (e.key === 'Escape') closeLightbox();
	}

	function handleOverlayClick(e: MouseEvent) {
		if (e.target === e.currentTarget) closeLightbox();
	}

	onMount(() => {
		const container = document.querySelector(selector);
		if (!container) return;

		const images = container.querySelectorAll('img:not(.no-lightbox)');

		const handleClick = (e: Event) => {
			const img = e.currentTarget as HTMLImageElement;
			openLightbox(img.src, img.alt);
		};

		images.forEach((img) => {
			(img as HTMLElement).style.cursor = 'zoom-in';
			img.addEventListener('click', handleClick);
		});

		return () => {
			images.forEach((img) => {
				img.removeEventListener('click', handleClick);
			});
		};
	});
</script>

<svelte:window onkeydown={handleKeydown} />

{#if isOpen}
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<div
		class="lightbox-overlay"
		role="dialog"
		aria-modal="true"
		aria-label="Image preview"
		onclick={handleOverlayClick}
		onkeydown={handleKeydown}
		tabindex="-1"
	>
		<!-- Close button -->
		<button class="lightbox-close liquid-glass" onclick={closeLightbox} aria-label="Close preview">
			<SFIcon name="close" size={16} />
		</button>

		<!-- Zoom toggle -->
		<button
			class="lightbox-zoom liquid-glass"
			onclick={() => (zoomed = !zoomed)}
			aria-label={zoomed ? 'Zoom out' : 'Zoom in'}
		>
			<SFIcon name="search" size={16} />
		</button>

		<!-- Image -->
		<div class="lightbox-content" class:zoomed>
			<img
				src={lightboxSrc}
				alt={lightboxAlt}
				class="lightbox-img"
				onclick={() => (zoomed = !zoomed)}
				onkeydown={undefined}
			/>
		</div>

		{#if lightboxAlt}
			<p class="lightbox-caption">{lightboxAlt}</p>
		{/if}
	</div>
{/if}

<style>
	.lightbox-overlay {
		position: fixed;
		inset: 0;
		z-index: 9000;
		background: rgba(0, 0, 0, 0.88);
		backdrop-filter: blur(8px);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		gap: var(--space-4);
		animation: fade-in var(--motion-duration-medium2) var(--motion-easing-emphasized-decelerate) both;
		padding: var(--space-6);
	}

	.lightbox-close,
	.lightbox-zoom {
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		border-radius: var(--md-sys-shape-corner-full);
		border: 1px solid rgba(255, 255, 255, 0.15);
		background: rgba(255, 255, 255, 0.1);
		color: white;
		cursor: pointer;
		backdrop-filter: blur(12px);
		transition: background var(--motion-duration-short4) var(--motion-easing-standard);
	}

	.lightbox-close {
		top: var(--space-4);
		right: var(--space-4);
	}

	.lightbox-zoom {
		top: var(--space-4);
		right: calc(var(--space-4) + 52px);
	}

	.lightbox-close:hover,
	.lightbox-zoom:hover {
		background: rgba(255, 255, 255, 0.2);
	}

	.lightbox-content {
		max-width: 90vw;
		max-height: 85vh;
		overflow: auto;
		border-radius: var(--md-sys-shape-corner-large);
		animation: scale-in var(--motion-duration-medium2) var(--motion-easing-emphasized-decelerate) both;
	}

	.lightbox-img {
		display: block;
		max-width: 90vw;
		max-height: 82vh;
		width: auto;
		height: auto;
		border-radius: var(--md-sys-shape-corner-large);
		object-fit: contain;
		cursor: zoom-in;
		transition: transform var(--motion-duration-medium2) var(--motion-easing-emphasized-decelerate);
		box-shadow: 0 24px 64px rgba(0, 0, 0, 0.5);
	}

	.lightbox-content.zoomed .lightbox-img {
		max-width: none;
		max-height: none;
		transform: scale(1.8);
		cursor: zoom-out;
	}

	.lightbox-caption {
		color: rgba(255, 255, 255, 0.7);
		font-size: 13px;
		text-align: center;
		max-width: 60ch;
		margin: 0;
	}
</style>
