<script lang="ts">
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

		const elements = headings.map((h) => document.getElementById(h.id)).filter(Boolean);
		elements.forEach((el) => el && observer.observe(el));

		return () => observer.disconnect();
	});

	function scrollTo(id: string) {
		const el = document.getElementById(id);
		if (!el) return;
		const offset = 80;
		const top = el.getBoundingClientRect().top + window.scrollY - offset;
		window.scrollTo({ top, behavior: 'smooth' });
	}
</script>

{#if headings.length > 0}
	<nav class="toc" aria-label="Table of contents">
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
{/if}

<style>
	.toc {
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
</style>
