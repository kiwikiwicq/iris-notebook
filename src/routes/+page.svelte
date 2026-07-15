<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import ArticleCard from '$lib/components/ArticleCard.svelte';
	import CategoryChip from '$lib/components/CategoryChip.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { getPublishedPosts } from '$lib/data/posts';
	import { categories } from '$lib/data/categories';
	import { getFeaturedProjects } from '$lib/data/projects';
	import { goto } from '$app/navigation';

	const posts = getPublishedPosts();
	const latestPosts = posts.slice(0, 6);
	const featuredProjects = getFeaturedProjects();

	function handleCategoryClick(slug: string) {
		goto(`/articles?category=${slug}`);
	}

	let emailValue = $state('');
	let subscribeState = $state<'idle' | 'success' | 'error'>('idle');

	function handleSubscribe(e: Event) {
		e.preventDefault();
		const trimmed = emailValue.trim();
		if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
			subscribeState = 'error';
			setTimeout(() => (subscribeState = 'idle'), 3000);
			return;
		}
		// TODO: connect to your newsletter provider (e.g. Mailchimp, ConvertKit)
		subscribeState = 'success';
	}
</script>


<svelte:head>
	<title>Iris Notebook – Programming, Android, Linux, AI</title>
	<meta name="description" content="A premium personal knowledge base and blog covering programming, Android development, Linux, AI, and thoughtful developer notes." />
	<meta property="og:title" content="Iris Notebook – Programming, Android, Linux, AI" />
	<meta property="og:description" content="A premium personal knowledge base and blog covering programming, Android development, Linux, AI, and thoughtful developer notes." />
	<meta property="og:type" content="website" />
</svelte:head>

<!-- Hero -->
<Hero />

<!-- Latest Articles -->
<section class="section" id="articles" aria-labelledby="articles-heading">
	<div class="container">
		<div class="section-header">
			<div class="section-label">
				<span class="material-symbols-rounded">article</span>
				<span class="label-medium">Latest Posts</span>
			</div>
			<h2 class="headline-medium" id="articles-heading">Recent Articles</h2>
			<p class="body-large section-desc">
				Deep dives, tutorials, and thoughtful notes from my journey as a developer.
			</p>
		</div>

		<div class="articles-grid">
			{#each latestPosts as post, i}
				<ArticleCard {post} index={i} />
			{/each}
		</div>

		<div class="section-cta">
			<a href="/articles" class="btn-outlined-primary">
				View all articles
				<span class="material-symbols-rounded">arrow_forward</span>
			</a>
		</div>
	</div>
</section>

<!-- Categories -->
<section class="section categories-section" id="categories" aria-labelledby="categories-heading">
	<div class="container">
		<div class="section-header">
			<div class="section-label">
				<span class="material-symbols-rounded">category</span>
				<span class="label-medium">Topics</span>
			</div>
			<h2 class="headline-medium" id="categories-heading">Browse Categories</h2>
			<p class="body-large section-desc">
				Find posts by the topics you care about most.
			</p>
		</div>

		<div class="categories-grid">
			{#each categories as category, i}
				<button
					class="category-card"
					onclick={() => handleCategoryClick(category.slug)}
					style="--delay: {i * 60}ms; --cat-color: {category.color};"
					aria-label="Browse {category.name} articles"
				>
					<div class="cat-icon-wrap">
						<span class="material-symbols-rounded icon-filled">{category.icon}</span>
					</div>
					<div class="cat-info">
						<h3 class="title-medium">{category.name}</h3>
						<p class="body-small cat-desc">{category.description}</p>
					</div>
					<span class="material-symbols-rounded cat-arrow">arrow_forward</span>
				</button>
			{/each}
		</div>
	</div>
</section>

<!-- Featured Projects -->
<section class="section" id="projects" aria-labelledby="projects-heading">
	<div class="container">
		<div class="section-header">
			<div class="section-label">
				<span class="material-symbols-rounded">code_blocks</span>
				<span class="label-medium">Open Source</span>
			</div>
			<h2 class="headline-medium" id="projects-heading">Featured Projects</h2>
			<p class="body-large section-desc">
				Some things I've built and released publicly.
			</p>
		</div>

		<div class="projects-grid">
			{#each featuredProjects as project, i}
				<ProjectCard {project} index={i} />
			{/each}
		</div>

		<div class="section-cta">
			<a href="/projects" class="btn-outlined-primary">
				View all projects
				<span class="material-symbols-rounded">arrow_forward</span>
			</a>
		</div>
	</div>
</section>

<!-- Newsletter CTA -->
<section class="section cta-section" aria-label="Newsletter signup">
	<div class="container">
		<div class="cta-card">
			<div class="cta-icon" aria-hidden="true">
				<span class="material-symbols-rounded icon-filled icon-xl">notifications</span>
			</div>
			<h2 class="headline-small">Stay in the loop</h2>
			<p class="body-large">
				New articles on Android, Linux, AI, and programming craft. No spam, unsubscribe anytime.
			</p>

			{#if subscribeState === 'success'}
				<div class="subscribe-success" role="status">
					<span class="material-symbols-rounded icon-filled">check_circle</span>
					<span>You're subscribed! Thanks for joining.</span>
				</div>
			{:else}
				<form class="cta-form" onsubmit={handleSubscribe} novalidate>
					<input
						type="email"
						placeholder="your@email.com"
						class="cta-input"
						class:input-error={subscribeState === 'error'}
						aria-label="Email address for newsletter"
						bind:value={emailValue}
						required
					/>
					<button class="cta-btn" type="submit">
						Subscribe
						<span class="material-symbols-rounded">arrow_forward</span>
					</button>
				</form>
				{#if subscribeState === 'error'}
					<p class="subscribe-error" role="alert">Please enter a valid email address.</p>
				{/if}
			{/if}
		</div>
	</div>
</section>

<style>
	/* Section header pattern */
	.section-header {
		margin-bottom: var(--space-10);
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.section-label {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		color: var(--md-sys-color-primary);
		font-weight: 600;
		font-size: 13px;
		text-transform: uppercase;
		letter-spacing: 1px;
	}

	.section-label .material-symbols-rounded { font-size: 18px; }

	.section-desc {
		color: var(--md-sys-color-on-surface-variant);
		max-width: 56ch;
	}

	.section-cta {
		margin-top: var(--space-10);
		display: flex;
		justify-content: center;
	}

	.btn-outlined-primary {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: 12px 28px;
		border-radius: var(--shape-button);
		border: 1.5px solid var(--md-sys-color-primary);
		color: var(--md-sys-color-primary);
		font-size: 14px;
		font-weight: 600;
		letter-spacing: 0.3px;
		text-decoration: none;
		transition:
			background var(--motion-duration-short4) var(--motion-easing-standard),
			transform var(--motion-duration-short4) var(--motion-easing-standard);
	}

	.btn-outlined-primary:hover {
		background: var(--md-sys-color-primary-container);
		transform: translateY(-2px);
		color: var(--md-sys-color-on-primary-container);
	}

	/* Articles grid */
	.articles-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: var(--space-6);
	}

	@media (max-width: 480px) {
		.articles-grid {
			grid-template-columns: 1fr;
		}
	}

	/* Categories */
	.categories-section {
		background: var(--md-sys-color-surface-container-low);
		border-radius: var(--shape-card);
	}

	.categories-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: var(--space-4);
	}

	.category-card {
		display: flex;
		align-items: center;
		gap: var(--space-4);
		padding: var(--space-5) var(--space-5);
		background: var(--md-sys-color-surface);
		border-radius: var(--md-sys-shape-corner-extra-large);
		border: 1px solid var(--md-sys-color-outline-variant);
		text-align: left;
		cursor: pointer;
		font-family: var(--font-body);
		transition:
			background var(--motion-duration-short4) var(--motion-easing-standard),
			border-color var(--motion-duration-short4) var(--motion-easing-standard),
			transform var(--motion-duration-medium1) var(--motion-easing-standard),
			box-shadow var(--motion-duration-medium1) var(--motion-easing-standard);
		animation: slide-up var(--motion-duration-medium3) var(--motion-easing-emphasized-decelerate) var(--delay, 0ms) both;
	}

	.category-card:hover {
		background: color-mix(in srgb, var(--cat-color, #6750A4) 8%, transparent);
		border-color: var(--cat-color, var(--md-sys-color-primary));
		transform: translateY(-4px);
		box-shadow: 0 8px 24px color-mix(in srgb, var(--cat-color, #6750A4) 15%, transparent);
	}

	.cat-icon-wrap {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		border-radius: var(--md-sys-shape-corner-large);
		background: color-mix(in srgb, var(--cat-color, #6750A4) 15%, transparent);
		color: var(--cat-color, var(--md-sys-color-primary));
		flex-shrink: 0;
		transition: background var(--motion-duration-short4) var(--motion-easing-standard);
	}

	.cat-info {
		flex: 1;
		min-width: 0;
	}

	.cat-desc {
		color: var(--md-sys-color-on-surface-variant);
		margin-top: 2px;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.cat-arrow {
		color: var(--md-sys-color-on-surface-variant);
		opacity: 0;
		transition: opacity var(--motion-duration-short4) var(--motion-easing-standard),
		            color var(--motion-duration-short4) var(--motion-easing-standard);
		flex-shrink: 0;
	}

	.category-card:hover .cat-arrow {
		opacity: 1;
		color: var(--cat-color, var(--md-sys-color-primary));
	}

	/* Projects */
	.projects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: var(--space-6);
	}

	/* Newsletter CTA */
	.cta-section {
		padding-top: 0;
	}

	.cta-card {
		text-align: center;
		background: linear-gradient(
			135deg,
			var(--md-sys-color-primary-container) 0%,
			var(--md-sys-color-secondary-container) 100%
		);
		border-radius: 32px;
		padding: var(--space-16) var(--space-8);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-4);
	}

	.cta-icon {
		width: 64px;
		height: 64px;
		border-radius: 50%;
		background: var(--md-sys-color-primary);
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: var(--space-2);
	}

	.cta-card h2 {
		color: var(--md-sys-color-on-primary-container);
	}

	.cta-card p {
		color: var(--md-sys-color-on-secondary-container);
		max-width: 48ch;
	}

	.cta-form {
		display: flex;
		gap: var(--space-3);
		flex-wrap: wrap;
		justify-content: center;
		margin-top: var(--space-4);
		width: 100%;
		max-width: 480px;
	}

	.cta-input {
		flex: 1;
		min-width: 200px;
		padding: 12px 20px;
		border-radius: var(--shape-button);
		border: 2px solid color-mix(in srgb, var(--md-sys-color-on-primary-container) 20%, transparent);
		background: color-mix(in srgb, var(--md-sys-color-on-primary-container) 8%, transparent);
		font-family: var(--font-body);
		font-size: 15px;
		color: var(--md-sys-color-on-primary-container);
		outline: none;
		transition:
			border-color var(--motion-duration-short4) var(--motion-easing-standard),
			background var(--motion-duration-short4) var(--motion-easing-standard);
	}

	.cta-input:focus {
		border-color: var(--md-sys-color-primary);
		background: var(--md-sys-color-surface);
		color: var(--md-sys-color-on-surface);
	}

	.cta-input::placeholder {
		color: color-mix(in srgb, var(--md-sys-color-on-primary-container) 60%, transparent);
	}

	.cta-btn {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: 12px 28px;
		border-radius: var(--shape-button);
		border: none;
		background: var(--md-sys-color-primary);
		color: var(--md-sys-color-on-primary);
		font-family: var(--font-body);
		font-size: 15px;
		font-weight: 600;
		cursor: pointer;
		transition:
			transform var(--motion-duration-short4) var(--motion-easing-standard),
			box-shadow var(--motion-duration-short4) var(--motion-easing-standard);
	}

	.cta-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(103, 80, 164, 0.4);
	}

	.input-error {
		border-color: var(--md-sys-color-error) !important;
	}

	.subscribe-error {
		font-size: 13px;
		color: var(--md-sys-color-error);
		margin-top: calc(var(--space-2) * -1);
		max-width: none;
	}

	.subscribe-success {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-4) var(--space-5);
		background: color-mix(in srgb, #3DDC84 15%, transparent);
		border: 1.5px solid #3DDC84;
		border-radius: var(--shape-button);
		color: var(--md-sys-color-on-surface);
		font-size: 15px;
		font-weight: 500;
	}

	.subscribe-success .material-symbols-rounded {
		color: #3DDC84;
		font-size: 22px;
	}
</style>
