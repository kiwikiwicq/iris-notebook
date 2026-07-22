<script lang="ts">
	import SFIcon from './SFIcon.svelte';

	interface Heading {
		id: string;
		text: string;
		level: number;
	}

	interface Props {
		headings: Heading[];
	}

	let { headings }: Props = $props();
	let activeId = $state('');
	let sheetOpen = $state(false);

	$effect(() => {
		if (typeof window === 'undefined' || headings.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						activeId = entry.target.id;
					}
				}
			},
			{
				rootMargin: '-64px 0px -70% 0px',
				threshold: 0
			}
		);

		headings.forEach((h) => {
			const el = document.getElementById(h.id);
			if (el) observer.observe(el);
		});

		return () => observer.disconnect();
	});

	function scrollTo(id: string) {
		const el = document.getElementById(id);
		if (el) {
			const offset = 80;
			const bodyRect = document.body.getBoundingClientRect().top;
			const elementRect = el.getBoundingClientRect().top;
			const elementPosition = elementRect - bodyRect;
			const offsetPosition = elementPosition - offset;

			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth'
			});
			activeId = id;
			sheetOpen = false;
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') sheetOpen = false;
	}

	const activeText = $derived(
		headings.find((h) => h.id === activeId)?.text ?? headings[0]?.text ?? 'Contents'
	);
</script>

{#if headings.length > 0}
	<!-- Desktop: sidebar TOC (rendered by parent via aside) -->
	<nav class="toc toc-desktop" aria-label="Table of contents">
		<p class="toc-title label-medium">On this page</p>
		<ol class="toc-list">
			{#each headings as heading}
				<li class="toc-item" style="--indent: {(heading.level - 2) * 12}px">
					<button
						class="toc-link"
						class:active={activeId === heading.id}
						onclick={() => scrollTo(heading.id)}
						aria-current={activeId === heading.id ? 'location' : undefined}
					>
						{heading.text}
					</button>
				</li>
			{/each}
		</ol>
	</nav>

	<!-- Mobile: floating FAB -->
	<button class="toc-fab liquid-glass" onclick={() => (sheetOpen = !sheetOpen)} aria-label="Table of contents" aria-expanded={sheetOpen}>
		<SFIcon name="typography" size={16} />
		<span class="fab-label">{activeText}</span>
		<SFIcon name="arrowUp" size={14} class="fab-chevron {sheetOpen ? 'open' : ''}" />
	</button>

	<!-- Mobile: bottom sheet -->
	{#if sheetOpen}
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<div
			class="toc-scrim"
			role="presentation"
			aria-hidden="true"
			onclick={() => (sheetOpen = false)}
			onkeydown={handleKeydown}
		></div>
		<div class="toc-sheet animate-slide-up" role="dialog" aria-label="Table of contents">
			<div class="sheet-handle"></div>
			<p class="toc-title label-medium">On this page</p>
			<ol class="toc-list sheet-list">
				{#each headings as heading, i}
					<li class="toc-item" style="--indent: {(heading.level - 2) * 16}px; --delay: {i * 30}ms">
						<button
							class="toc-link"
							class:active={activeId === heading.id}
							onclick={() => scrollTo(heading.id)}
							aria-current={activeId === heading.id ? 'location' : undefined}
						>
							{heading.text}
						</button>
					</li>
				{/each}
			</ol>
		</div>
	{/if}
{/if}

<style>
	/* ── Desktop sidebar ── */
	.toc-desktop {
		position: sticky;
		top: calc(var(--nav-height) + var(--space-6));
		max-height: calc(100vh - var(--nav-height) - var(--space-12));
		overflow-y: auto;
		padding: var(--space-5);
		background: var(--md-sys-color-surface-container-low);
		border-radius: var(--md-sys-shape-corner-extra-large);
		border: 1px solid var(--md-sys-color-outline-variant);
	}

	.toc-title {
		color: var(--md-sys-color-on-surface-variant);
		text-transform: uppercase;
		letter-spacing: 1px;
		margin-bottom: var(--space-3);
		max-width: none;
	}

	.toc-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.toc-item {
		padding-left: var(--indent, 0);
	}

	.toc-link {
		width: 100%;
		text-align: left;
		background: none;
		border: none;
		cursor: pointer;
		font-family: var(--font-body);
		font-size: 13px;
		line-height: 1.5;
		color: var(--md-sys-color-on-surface-variant);
		padding: 4px 8px;
		border-radius: var(--md-sys-shape-corner-small);
		transition:
			background var(--motion-duration-short4) var(--motion-easing-standard),
			color var(--motion-duration-short4) var(--motion-easing-standard);
	}

	.toc-link:hover {
		background: color-mix(in srgb, var(--md-sys-color-on-surface) 8%, transparent);
		color: var(--md-sys-color-on-surface);
	}

	.toc-link.active {
		color: var(--md-sys-color-primary);
		font-weight: 600;
		background: var(--md-sys-color-primary-container);
	}

	/* ── Mobile FAB ── */
	.toc-fab {
		display: none; /* shown via media query */
		align-items: center;
		gap: var(--space-2);
		position: fixed;
		bottom: calc(var(--space-6) + env(safe-area-inset-bottom, 0px));
		left: 50%;
		transform: translateX(-50%);
		z-index: 80;
		padding: 10px 18px 10px 14px;
		border-radius: var(--md-sys-shape-corner-full);
		border: 1px solid var(--md-sys-color-outline-variant);
		background: var(--md-sys-color-surface-container-highest);
		color: var(--md-sys-color-on-surface);
		font-family: var(--font-body);
		font-size: 13px;
		font-weight: 500;
		cursor: pointer;
		box-shadow: var(--md-sys-elevation-3);
		max-width: 80vw;
		backdrop-filter: blur(12px);
		white-space: nowrap;
		overflow: hidden;
	}

	.toc-fab .material-symbols-rounded { font-size: 20px; flex-shrink: 0; }

	.fab-label {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		max-width: 180px;
	}

	.fab-chevron {
		color: var(--md-sys-color-on-surface-variant);
		transition: transform var(--motion-duration-short4) var(--motion-easing-standard);
	}

	.fab-chevron.open { transform: rotate(180deg); }

	/* ── Bottom sheet ── */
	.toc-scrim {
		position: fixed;
		inset: 0;
		z-index: 89;
		background: rgba(0,0,0,0.32);
	}

	.toc-sheet {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 90;
		background: var(--md-sys-color-surface-container-low);
		border-radius: 28px 28px 0 0;
		padding: var(--space-2) var(--space-5) calc(var(--space-8) + env(safe-area-inset-bottom, 0px));
		max-height: 70vh;
		overflow-y: auto;
		box-shadow: var(--md-sys-elevation-5);
	}

	.sheet-handle {
		width: 36px;
		height: 4px;
		border-radius: 2px;
		background: var(--md-sys-color-outline-variant);
		margin: var(--space-3) auto var(--space-4);
	}

	.sheet-list .toc-link {
		font-size: 15px;
		padding: var(--space-3) var(--space-3);
	}

	.sheet-list .toc-item {
		animation: slide-up var(--motion-duration-medium1) var(--motion-easing-emphasized-decelerate) var(--delay, 0ms) both;
	}

	/* Show FAB only on mobile */
	@media (max-width: 1024px) {
		.toc-desktop { display: none; }
		.toc-fab { display: flex; }
	}
</style>
