<script lang="ts">
	import { onMount } from 'svelte';

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
		document.body.style.overflow = 'hidden';
	}

	function closeLightbox() {
		isOpen = false;
		zoomed = false;
		document.body.style.overflow = '';
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') closeLightbox();
	}

	function handleOverlayClick(e: MouseEvent) {
		if ((e.target as Element)?.classList.contains('lightbox-overlay')) closeLightbox();
	}

	onMount(() => {
		const container = document.querySelector(selector);
		if (!container) return;

		// Add click handlers to all images inside the selector
		const imgs = container.querySelectorAll<HTMLImageElement>('img');
		imgs.forEach((img) => {
			img.style.cursor = 'zoom-in';
			img.addEventListener('click', () => openLightbox(img.src, img.alt));
		});

		// Observe for dynamically added images (MutationObserver)
		const observer = new MutationObserver(() => {
			const newImgs = container.querySelectorAll<HTMLImageElement>('img:not([data-lb])');
			newImgs.forEach((img) => {
				img.setAttribute('data-lb', '1');
				img.style.cursor = 'zoom-in';
				img.addEventListener('click', () => openLightbox(img.src, img.alt));
			});
		});
		observer.observe(container, { childList: true, subtree: true });

		return () => observer.disconnect();
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
		<button class="lightbox-close" onclick={closeLightbox} aria-label="Close preview">
			<span class="material-symbols-rounded">close</span>
		</button>

		<!-- Zoom toggle -->
		<button
			class="lightbox-zoom"
			onclick={() => (zoomed = !zoomed)}
			aria-label={zoomed ? 'Zoom out' : 'Zoom in'}
		>
			<span class="material-symbols-rounded">{zoomed ? 'zoom_out' : 'zoom_in'}</span>
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
