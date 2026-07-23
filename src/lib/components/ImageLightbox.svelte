<script lang="ts">
	import { onMount } from 'svelte';
	import SFIcon from './SFIcon.svelte';

	interface Props {
		selector?: string;
	}

	let { selector = '.prose' }: Props = $props();

	// Lightbox state
	let isOpen = $state(false);
	let mode = $state<'image' | 'svg'>('image');
	let imageSrc = $state('');
	let imageAlt = $state('');
	let svgContent = $state('');
	let title = $state('');

	// Pan & Zoom state
	let scale = $state(1);
	let translateX = $state(0);
	let translateY = $state(0);
	let isDragging = $state(false);
	let startX = $state(0);
	let startY = $state(0);
	let initialTx = $state(0);
	let initialTy = $state(0);

	let contentRef = $state<HTMLDivElement | null>(null);

	function openImageLightbox(src: string, alt: string) {
		mode = 'image';
		imageSrc = src;
		imageAlt = alt;
		title = alt || 'Image Preview';
		resetTransform();
		isOpen = true;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = 'hidden';
		}
	}

	function openSvgLightbox(svgHtml: string, diagramTitle = 'Architecture Diagram') {
		mode = 'svg';
		svgContent = svgHtml;
		title = diagramTitle;
		resetTransform();
		isOpen = true;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = 'hidden';
		}
	}

	function closeLightbox() {
		isOpen = false;
		resetTransform();
		if (typeof document !== 'undefined') {
			document.body.style.overflow = '';
		}
	}

	function resetTransform() {
		scale = 1;
		translateX = 0;
		translateY = 0;
		isDragging = false;
	}

	function zoomIn() {
		scale = Math.min(5, Number((scale + 0.35).toFixed(2)));
	}

	function zoomOut() {
		scale = Math.max(0.4, Number((scale - 0.35).toFixed(2)));
		if (scale <= 1) {
			translateX = 0;
			translateY = 0;
		}
	}

	function handleWheel(e: WheelEvent) {
		e.preventDefault();
		const zoomFactor = e.deltaY < 0 ? 1.15 : 0.87;
		const nextScale = Math.min(5, Math.max(0.4, Number((scale * zoomFactor).toFixed(2))));
		scale = nextScale;
		if (scale <= 1) {
			translateX = 0;
			translateY = 0;
		}
	}

	function handleMouseDown(e: MouseEvent) {
		if (e.button !== 0) return; // Only left click
		isDragging = true;
		startX = e.clientX;
		startY = e.clientY;
		initialTx = translateX;
		initialTy = translateY;
	}

	function handleMouseMove(e: MouseEvent) {
		if (!isDragging) return;
		const dx = e.clientX - startX;
		const dy = e.clientY - startY;
		translateX = initialTx + dx;
		translateY = initialTy + dy;
	}

	function handleMouseUp() {
		isDragging = false;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (!isOpen) return;
		if (e.key === 'Escape') closeLightbox();
		if (e.key === '+' || e.key === '=') zoomIn();
		if (e.key === '-') zoomOut();
		if (e.key === '0') resetTransform();
		if (e.key === 'ArrowLeft') translateX += 40;
		if (e.key === 'ArrowRight') translateX -= 40;
		if (e.key === 'ArrowUp') translateY += 40;
		if (e.key === 'ArrowDown') translateY -= 40;
	}

	function handleOverlayClick(e: MouseEvent) {
		if (e.target === e.currentTarget) closeLightbox();
	}

	onMount(() => {
		const attachListeners = () => {
			const container = document.querySelector(selector);
			if (!container) return;

			// 1. Clickable Images
			const images = container.querySelectorAll('img:not(.no-lightbox)');
			images.forEach((img) => {
				const el = img as HTMLElement;
				el.style.cursor = 'zoom-in';
				el.onclick = (e: Event) => {
					e.stopPropagation();
					const target = e.currentTarget as HTMLImageElement;
					openImageLightbox(target.src, target.alt);
				};
			});


		};

		attachListeners();

		// Re-observe dynamic diagram inserts
		const observer = new MutationObserver(() => {
			attachListeners();
		});

		const target = document.querySelector(selector);
		if (target) {
			observer.observe(target, { childList: true, subtree: true });
		}

		return () => {
			observer.disconnect();
		};
	});
</script>

<svelte:window onkeydown={handleKeydown} />

{#if isOpen}
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<div
		class="lightbox-overlay notranslate"
		translate="no"
		role="dialog"
		aria-modal="true"
		aria-label="Media Preview"
		onclick={handleOverlayClick}
		onkeydown={handleKeydown}
		tabindex="-1"
	>
		<!-- Control Bar Floating Glass Island -->
		<div class="lightbox-toolbar liquid-glass">
			<div class="toolbar-info">
				<span class="material-symbols-rounded" style="font-size: 18px; color: var(--apple-blue);"
					>{mode === 'svg' ? 'schema' : 'image'}</span
				>
				<span class="toolbar-title">{title}</span>
			</div>

			<div class="toolbar-actions">
				<span class="zoom-level">{Math.round(scale * 100)}%</span>

				<button class="tool-btn" onclick={zoomOut} title="Zoom Out (-)">
					<span class="material-symbols-rounded">zoom_out</span>
				</button>

				<button class="tool-btn" onclick={zoomIn} title="Zoom In (+)">
					<span class="material-symbols-rounded">zoom_in</span>
				</button>

				<button class="tool-btn" onclick={resetTransform} title="Reset Zoom (0)">
					<span class="material-symbols-rounded">restart_alt</span>
				</button>

				<div class="tool-divider"></div>

				<button class="tool-btn close-tool-btn" onclick={closeLightbox} title="Close (Esc)">
					<span class="material-symbols-rounded">close</span>
				</button>
			</div>
		</div>

		<!-- Interactive Viewport -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="lightbox-viewport"
			onwheel={handleWheel}
			onmousedown={handleMouseDown}
			onmousemove={handleMouseMove}
			onmouseup={handleMouseUp}
			onmouseleave={handleMouseUp}
			class:dragging={isDragging}
			bind:this={contentRef}
		>
			<div
				class="lightbox-transform-container"
				style="transform: translate3d({translateX}px, {translateY}px, 0px) scale({scale});"
			>
				{#if mode === 'image'}
					<img src={imageSrc} alt={imageAlt} class="lightbox-img" draggable="false" />
				{:else if mode === 'svg'}
					<div class="lightbox-svg-wrapper">
						{@html svgContent}
					</div>
				{/if}
			</div>
		</div>

		<!-- Hint Footer -->
		<div class="lightbox-hint">
			<span>Scroll mouse wheel or pinch to zoom · Drag to pan · Press Esc to exit</span>
		</div>
	</div>
{/if}

<style>
	.lightbox-overlay {
		position: fixed;
		inset: 0;
		z-index: 9999;
		background: rgba(0, 0, 0, 0.88);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		padding: var(--space-4);
		animation: fade-in 0.25s cubic-bezier(0.2, 0.8, 0.2, 1) both;
		user-select: none;
	}

	.lightbox-toolbar {
		position: fixed;
		top: var(--space-4);
		left: 50%;
		transform: translateX(-50%);
		z-index: 10000;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-6);
		padding: var(--space-2) var(--space-4);
		border-radius: var(--md-sys-shape-corner-full);
		background: rgba(20, 20, 25, 0.75);
		border: 1px solid rgba(255, 255, 255, 0.18);
		box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
		max-width: calc(100vw - 32px);
	}

	.toolbar-info {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		overflow: hidden;
		white-space: nowrap;
	}

	.toolbar-title {
		font-size: 13px;
		font-weight: 500;
		color: rgba(255, 255, 255, 0.9);
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 260px;
	}

	.toolbar-actions {
		display: flex;
		align-items: center;
		gap: var(--space-2);
	}

	.zoom-level {
		font-size: 12px;
		font-weight: 600;
		font-family: var(--font-mono);
		color: var(--apple-blue);
		min-width: 42px;
		text-align: center;
	}

	.tool-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: var(--md-sys-shape-corner-full);
		border: none;
		background: rgba(255, 255, 255, 0.1);
		color: rgba(255, 255, 255, 0.9);
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.tool-btn:hover {
		background: rgba(255, 255, 255, 0.25);
		color: white;
	}

	.close-tool-btn {
		background: rgba(255, 59, 48, 0.2);
		color: #ff453a;
	}

	.close-tool-btn:hover {
		background: rgba(255, 59, 48, 0.4);
		color: white;
	}

	.tool-divider {
		width: 1px;
		height: 18px;
		background: rgba(255, 255, 255, 0.18);
		margin: 0 2px;
	}

	.lightbox-viewport {
		flex: 1;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		cursor: grab;
	}

	.lightbox-viewport.dragging {
		cursor: grabbing;
	}

	.lightbox-transform-container {
		display: flex;
		align-items: center;
		justify-content: center;
		transition: transform 0.05s linear;
		transform-origin: center center;
		will-change: transform;
	}

	.lightbox-img {
		max-width: 85vw;
		max-height: 80vh;
		object-fit: contain;
		border-radius: var(--md-sys-shape-corner-medium, 12px);
		box-shadow: 0 24px 64px rgba(0, 0, 0, 0.6);
		pointer-events: none;
	}

	.lightbox-svg-wrapper {
		background: var(--md-sys-color-surface-container, #1e1e24);
		color: var(--md-sys-color-on-surface, #ffffff);
		padding: var(--space-8);
		border-radius: var(--md-sys-shape-corner-large, 16px);
		border: 1px solid rgba(255, 255, 255, 0.15);
		box-shadow: 0 32px 80px rgba(0, 0, 0, 0.7);
		max-width: 88vw;
		max-height: 78vh;
		overflow: auto;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.lightbox-svg-wrapper :global(svg) {
		max-width: 100%;
		max-height: 100%;
		height: auto;
		width: auto;
		display: block;
		margin: 0 auto;
	}

	.lightbox-hint {
		position: fixed;
		bottom: var(--space-4);
		left: 50%;
		transform: translateX(-50%);
		font-size: 12px;
		color: rgba(255, 255, 255, 0.6);
		text-align: center;
		pointer-events: none;
		background: rgba(0, 0, 0, 0.4);
		padding: 4px 14px;
		border-radius: var(--md-sys-shape-corner-full);
	}
</style>
