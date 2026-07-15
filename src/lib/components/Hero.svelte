<script lang="ts">
	import { onMount } from 'svelte';
	import { getPublishedPosts } from '$lib/data/posts';
	import { categories } from '$lib/data/categories';
	import { projects } from '$lib/data/projects';

	let visible = $state(false);
	onMount(() => {
		// Trigger entrance animation after mount
		setTimeout(() => (visible = true), 100);
	});

	const articleCount = getPublishedPosts().length;
	const categoryCount = categories.length;
	const projectCount = projects.length;
</script>

<section class="hero" aria-label="Site introduction">
	<!-- Floating orbs for visual depth -->
	<div class="orb orb-1" aria-hidden="true"></div>
	<div class="orb orb-2" aria-hidden="true"></div>
	<div class="orb orb-3" aria-hidden="true"></div>

	<div class="hero-content container" class:visible>
		<div class="hero-badge animate-slide-down">
			<span>Personal Knowledge Base</span>
		</div>

		<h1 class="hero-title">
			<span class="hero-line">Iris</span>
			<span class="hero-line gradient-text">Notebook</span>
		</h1>

		<p class="hero-subtitle">
			Programming, Android, Linux, AI, and thoughtful notes from a developer who loves the craft.
		</p>

		<div class="hero-actions">
			<a href="/articles" class="btn-filled">
				<span class="material-symbols-rounded">article</span>
				Read Articles
			</a>
			<a href="/about" class="btn-outlined">
				About Me
				<span class="material-symbols-rounded">arrow_forward</span>
			</a>
		</div>

		<!-- Stats row -->
		<div class="hero-stats">
			<div class="stat-item">
				<span class="stat-number">{articleCount}</span>
				<span class="stat-label">Articles</span>
			</div>
			<div class="stat-divider"></div>
			<div class="stat-item">
				<span class="stat-number">{categoryCount}</span>
				<span class="stat-label">Categories</span>
			</div>
			<div class="stat-divider"></div>
			<div class="stat-item">
				<span class="stat-number">{projectCount}</span>
				<span class="stat-label">Projects</span>
			</div>
		</div>
	</div>
</section>

<style>
	.hero {
		position: relative;
		min-height: 80vh;
		display: flex;
		align-items: center;
		overflow: hidden;
		padding-top: var(--nav-height);
	}

	/* ── Floating orbs ── */
	.orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		pointer-events: none;
		animation: float 6s ease-in-out infinite;
	}

	.orb-1 {
		width: 500px;
		height: 500px;
		background: radial-gradient(circle, rgba(103, 80, 164, 0.15) 0%, transparent 70%);
		top: -100px;
		right: -100px;
		animation-delay: 0s;
	}

	.orb-2 {
		width: 400px;
		height: 400px;
		background: radial-gradient(circle, rgba(125, 82, 96, 0.12) 0%, transparent 70%);
		bottom: 50px;
		left: -80px;
		animation-delay: 2s;
	}

	.orb-3 {
		width: 300px;
		height: 300px;
		background: radial-gradient(circle, rgba(98, 91, 113, 0.10) 0%, transparent 70%);
		top: 40%;
		left: 50%;
		animation-delay: 4s;
	}

	/* ── Hero content ── */
	.hero-content {
		position: relative;
		z-index: 1;
		padding-block: var(--space-20) var(--space-16);
		opacity: 0;
		transform: translateY(20px);
		transition:
			opacity var(--motion-duration-medium4) var(--motion-easing-emphasized-decelerate),
			transform var(--motion-duration-medium4) var(--motion-easing-emphasized-decelerate);
	}

	.hero-content.visible {
		opacity: 1;
		transform: translateY(0);
	}

	/* Badge */
	.hero-badge {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: 8px 16px;
		border-radius: var(--md-sys-shape-corner-full);
		background: var(--md-sys-color-primary-container);
		color: var(--md-sys-color-on-primary-container);
		font-size: 13px;
		font-weight: 600;
		letter-spacing: 0.3px;
		margin-bottom: var(--space-6);
	}

	.hero-badge .material-symbols-rounded { font-size: 18px; }

	/* Title */
	.hero-title {
		font-size: clamp(56px, 10vw, 96px);
		font-weight: 300;
		line-height: 1.05;
		letter-spacing: -3px;
		margin-bottom: var(--space-6);
		display: flex;
		flex-direction: column;
	}

	.hero-line {
		display: block;
	}

	.gradient-text {
		background: linear-gradient(
			135deg,
			var(--md-sys-color-primary) 0%,
			var(--md-sys-color-tertiary) 50%,
			var(--md-sys-color-secondary) 100%
		);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		background-size: 200% 200%;
		animation: gradient-shift 5s ease infinite;
	}

	/* Subtitle */
	.hero-subtitle {
		font-size: clamp(16px, 2vw, 20px);
		line-height: 1.6;
		color: var(--md-sys-color-on-surface-variant);
		max-width: 52ch;
		margin-bottom: var(--space-8);
	}

	/* CTA Buttons */
	.hero-actions {
		display: flex;
		align-items: center;
		gap: var(--space-4);
		flex-wrap: wrap;
		margin-bottom: var(--space-12);
	}

	.btn-filled {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: 14px 28px;
		border-radius: var(--shape-button);
		background: var(--md-sys-color-primary);
		color: var(--md-sys-color-on-primary);
		font-size: 15px;
		font-weight: 600;
		letter-spacing: 0.3px;
		text-decoration: none;
		transition:
			transform var(--motion-duration-short4) var(--motion-easing-standard),
			box-shadow var(--motion-duration-short4) var(--motion-easing-standard),
			background var(--motion-duration-short4) var(--motion-easing-standard);
		box-shadow: 0 2px 8px rgba(103, 80, 164, 0.3);
	}

	.btn-filled:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(103, 80, 164, 0.4);
		color: var(--md-sys-color-on-primary);
		background: color-mix(in srgb, var(--md-sys-color-primary) 92%, black);
	}

	.btn-outlined {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: 14px 28px;
		border-radius: var(--shape-button);
		border: 1.5px solid var(--md-sys-color-outline);
		background: transparent;
		color: var(--md-sys-color-on-surface);
		font-size: 15px;
		font-weight: 500;
		letter-spacing: 0.3px;
		text-decoration: none;
		transition:
			transform var(--motion-duration-short4) var(--motion-easing-standard),
			background var(--motion-duration-short4) var(--motion-easing-standard),
			border-color var(--motion-duration-short4) var(--motion-easing-standard);
	}

	.btn-outlined:hover {
		background: color-mix(in srgb, var(--md-sys-color-on-surface) 8%, transparent);
		border-color: var(--md-sys-color-on-surface);
		transform: translateY(-2px);
		color: var(--md-sys-color-on-surface);
	}

	/* Stats */
	.hero-stats {
		display: flex;
		align-items: center;
		gap: var(--space-6);
		flex-wrap: wrap;
	}

	.stat-item {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.stat-number {
		font-size: 28px;
		font-weight: 700;
		color: var(--md-sys-color-on-surface);
		letter-spacing: -1px;
		line-height: 1;
	}

	.stat-label {
		font-size: 13px;
		color: var(--md-sys-color-on-surface-variant);
	}

	.stat-divider {
		width: 1px;
		height: 36px;
		background: var(--md-sys-color-outline-variant);
	}

	@media (max-width: 480px) {
		.hero-title {
			letter-spacing: -2px;
		}

		.hero-actions {
			flex-direction: column;
			align-items: flex-start;
		}

		.btn-filled, .btn-outlined {
			width: 100%;
			justify-content: center;
		}

		.hero-stats {
			gap: var(--space-4);
		}
	}
</style>
