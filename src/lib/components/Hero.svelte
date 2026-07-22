<script lang="ts">
	import { onMount } from 'svelte';
	import { getPublishedPosts } from '$lib/data/posts';
	import { categories } from '$lib/data/categories';
	import { projects } from '$lib/data/projects';
	import SFIcon from '$lib/components/SFIcon.svelte';

	let visible = $state(false);
	onMount(() => {
		setTimeout(() => (visible = true), 60);
	});

	const articleCount = getPublishedPosts().length;
	const categoryCount = categories.length;
	const projectCount = projects.length;
</script>

<section class="hero" aria-label="Site introduction">
	<div class="hero-content container" class:visible>
		<div class="hero-badge">
			<span class="apple-dot"></span>
			<span>Iris Engineering Notebook</span>
		</div>

		<h1 class="hero-title">
			<span class="hero-line">Notes on Swift, Kotlin,</span>
			<span class="hero-line hero-highlight">Linux & Systems.</span>
		</h1>

		<p class="hero-subtitle">
			Technical deep dives, system design, native mobile development, and software architecture written from real engineering practice.
		</p>

		<div class="hero-actions">
			<a href="/articles" class="btn-apple-primary">
				<span>Read Articles</span>
				<SFIcon name="arrowRight" size={16} />
			</a>
			<a href="/about" class="btn-apple-secondary">
				<SFIcon name="person" size={16} />
				<span>About Iris</span>
			</a>
		</div>

		<!-- Apple Stats Bar -->
		<div class="hero-stats card-glass">
			<div class="stat-item">
				<span class="stat-number">{articleCount}</span>
				<span class="stat-label">Technical Articles</span>
			</div>
			<div class="stat-divider"></div>
			<div class="stat-item">
				<span class="stat-number">{categoryCount}</span>
				<span class="stat-label">Core Topics</span>
			</div>
			<div class="stat-divider"></div>
			<div class="stat-item">
				<span class="stat-number">{projectCount}</span>
				<span class="stat-label">Open Source Repos</span>
			</div>
		</div>
	</div>
</section>

<style>
	.hero {
		position: relative;
		min-height: 75vh;
		display: flex;
		align-items: center;
		padding-top: calc(var(--nav-height) + 32px);
		padding-bottom: var(--space-12);
	}

	.hero-content {
		position: relative;
		z-index: 1;
		opacity: 0;
		transform: translateY(12px);
		transition:
			opacity var(--motion-duration-medium4) var(--motion-easing-standard-decelerate),
			transform var(--motion-duration-medium4) var(--motion-easing-standard-decelerate);
	}

	.hero-content.visible {
		opacity: 1;
		transform: translateY(0);
	}

	/* Badge */
	.hero-badge {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 5px 14px;
		border-radius: var(--md-sys-shape-corner-full);
		background: rgba(140, 140, 145, 0.12);
		border: 1px solid var(--glass-border);
		color: var(--md-sys-color-on-surface);
		font-size: 12px;
		font-weight: 600;
		letter-spacing: -0.01em;
		margin-bottom: var(--space-6);
	}

	.apple-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--md-sys-color-on-surface-variant);
	}

	/* Title */
	.hero-title {
		font-family: var(--font-display);
		font-size: clamp(44px, 7vw, 76px);
		font-weight: 700;
		line-height: 1.06;
		letter-spacing: -0.035em;
		color: var(--md-sys-color-on-surface);
		margin-bottom: var(--space-5);
		display: flex;
		flex-direction: column;
	}

	.hero-line {
		display: block;
	}

	.hero-highlight {
		color: var(--md-sys-color-on-surface);
	}

	/* Subtitle */
	.hero-subtitle {
		font-size: clamp(17px, 2vw, 20px);
		line-height: 1.5;
		letter-spacing: -0.018em;
		color: var(--md-sys-color-on-surface-variant);
		max-width: 54ch;
		margin-bottom: var(--space-8);
	}

	/* CTA Buttons */
	.hero-actions {
		display: flex;
		align-items: center;
		gap: 12px;
		flex-wrap: wrap;
		margin-bottom: var(--space-12);
	}

	.btn-apple-primary {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 11px 22px;
		border-radius: var(--md-sys-shape-corner-full);
		background: var(--md-sys-color-on-surface);
		color: var(--md-sys-color-surface);
		font-size: 14px;
		font-weight: 600;
		letter-spacing: -0.01em;
		text-decoration: none;
		transition:
			transform var(--motion-duration-short4) var(--motion-easing-standard),
			opacity var(--motion-duration-short4) var(--motion-easing-standard);
	}

	.btn-apple-primary:hover {
		transform: translateY(-1px);
		opacity: 0.92;
	}

	.btn-apple-secondary {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 11px 22px;
		border-radius: var(--md-sys-shape-corner-full);
		border: 1px solid var(--glass-border);
		background: rgba(140, 140, 145, 0.08);
		color: var(--md-sys-color-on-surface);
		font-size: 14px;
		font-weight: 500;
		letter-spacing: -0.01em;
		text-decoration: none;
		transition:
			transform var(--motion-duration-short4) var(--motion-easing-standard),
			background var(--motion-duration-short4) var(--motion-easing-standard),
			border-color var(--motion-duration-short4) var(--motion-easing-standard);
	}

	.btn-apple-secondary:hover {
		background: rgba(140, 140, 145, 0.16);
		border-color: rgba(255, 255, 255, 0.25);
		transform: translateY(-1px);
		color: var(--md-sys-color-on-surface);
	}

	/* Stats Glass Card */
	.card-glass {
		display: inline-flex;
		align-items: center;
		gap: var(--space-8);
		padding: 16px 28px;
		border-radius: 20px;
		background: var(--liquid-glass-bg);
		backdrop-filter: var(--liquid-blur);
		-webkit-backdrop-filter: var(--liquid-blur);
		border: 1px solid var(--liquid-glass-border);
		box-shadow: var(--liquid-glass-shadow);
		flex-wrap: wrap;
	}

	.stat-item {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.stat-number {
		font-size: 24px;
		font-weight: 700;
		letter-spacing: -0.025em;
		color: var(--md-sys-color-on-surface);
		line-height: 1;
	}

	.stat-label {
		font-size: 12px;
		font-weight: 500;
		color: var(--md-sys-color-on-surface-variant);
		letter-spacing: -0.005em;
	}

	.stat-divider {
		width: 1px;
		height: 28px;
		background: var(--glass-border);
	}

	@media (max-width: 600px) {
		.hero-actions {
			flex-direction: column;
			align-items: stretch;
		}

		.btn-apple-primary, .btn-apple-secondary {
			justify-content: center;
		}

		.card-glass {
			width: 100%;
			justify-content: space-around;
			gap: var(--space-4);
			padding: 16px 16px;
		}

		.stat-divider {
			display: none;
		}
	}
</style>
