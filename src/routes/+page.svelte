<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import ArticleCard from '$lib/components/ArticleCard.svelte';
	import CategoryChip from '$lib/components/CategoryChip.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import SFIcon from '$lib/components/SFIcon.svelte';
	import { getPublishedPosts } from '$lib/data/posts';
	import { categories } from '$lib/data/categories';
	import { getFeaturedProjects } from '$lib/data/projects';
	import { languageStore } from '$lib/stores/language.svelte';
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
		subscribeState = 'success';
	}
</script>


<svelte:head>
	<title>Iris Notebook — Engineering & Software Design</title>
	<meta name="description" content="Technical engineering notes on Swift, Kotlin, Android runtime, Linux systems, AI models, and software design by Iris." />
	<meta property="og:title" content="Iris Notebook — Engineering & Software Design" />
	<meta property="og:description" content="Technical engineering notes on Swift, Kotlin, Android runtime, Linux systems, AI models, and software design by Iris." />
	<meta property="og:type" content="website" />
</svelte:head>

<!-- Hero -->
<Hero />

<!-- Latest Articles -->
<section class="section" id="articles" aria-labelledby="articles-heading">
	<div class="container">
		<div class="section-header">
			<div class="section-label">
				<SFIcon name="articles" size={15} />
				<span class="label-medium">{languageStore.t.home.latestBadge}</span>
			</div>
			<h2 class="headline-medium" id="articles-heading">{languageStore.t.home.latestTitle}</h2>
			<p class="body-large section-desc">
				{languageStore.t.home.featuredDesc}
			</p>
		</div>

		<div class="articles-grid">
			{#each latestPosts as post, i}
				<ArticleCard {post} index={i} />
			{/each}
		</div>

		<div class="section-cta">
			<a href="/articles" class="btn-outlined-primary">
				<span>{languageStore.t.home.viewAllArticles}</span>
				<SFIcon name="arrowRight" size={15} />
			</a>
		</div>
	</div>
</section>

<!-- Categories -->
<section class="section categories-section" id="categories" aria-labelledby="categories-heading">
	<div class="container">
		<div class="section-header">
			<div class="section-label">
				<SFIcon name="categories" size={15} />
				<span class="label-medium">{languageStore.t.home.categoriesBadge}</span>
			</div>
			<h2 class="headline-medium" id="categories-heading">{languageStore.t.home.categoriesTitle}</h2>
			<p class="body-large section-desc">
				{languageStore.t.categoriesPage.description}
			</p>
		</div>

		<div class="categories-grid">
			{#each categories as category, i}
				{@const translatedCat = languageStore.translateCategory(category.slug, category.name, category.description)}
				<button
					class="category-card liquid-glass"
					onclick={() => handleCategoryClick(category.slug)}
					style="--delay: {i * 60}ms;"
					aria-label="Browse {translatedCat.name} articles"
				>
					<div class="cat-icon-wrap">
						<SFIcon name={category.sfIcon ?? 'code'} size={18} />
					</div>
					<div class="cat-info">
						<h3 class="title-medium">{translatedCat.name}</h3>
						<p class="body-small cat-desc">{translatedCat.description}</p>
					</div>
					<SFIcon name="arrowRight" size={15} class="cat-arrow" />
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
				<SFIcon name="projects" size={15} />
				<span class="label-medium">{languageStore.t.home.projectsBadge}</span>
			</div>
			<h2 class="headline-medium" id="projects-heading">{languageStore.t.home.projectsTitle}</h2>
			<p class="body-large section-desc">
				{languageStore.t.projectsPage.description}
			</p>
		</div>

		<div class="projects-grid">
			{#each featuredProjects as project, i}
				<ProjectCard {project} index={i} />
			{/each}
		</div>

		<div class="section-cta">
			<a href="/projects" class="btn-outlined-primary">
				<span>{languageStore.t.home.viewAllProjects}</span>
				<SFIcon name="arrowRight" size={15} />
			</a>
		</div>
	</div>
</section>

<!-- Newsletter CTA -->
<section class="section cta-section" aria-label="Newsletter signup">
	<div class="container">
		<div class="cta-card">
			<div class="cta-icon" aria-hidden="true">
				<SFIcon name="rss" size={24} color="var(--md-sys-color-on-surface)" />
			</div>
			<h2 class="headline-small">{languageStore.t.home.subscribeTitle}</h2>
			<p class="body-large">
				{languageStore.t.home.subscribeDesc}
			</p>

			{#if subscribeState === 'success'}
				<div class="subscribe-success" role="status">
					<SFIcon name="check" size={18} color="var(--apple-green)" />
					<span>{languageStore.t.home.subscribeSuccess}</span>
				</div>
			{:else}
				<form class="cta-form" onsubmit={handleSubscribe} novalidate>
					<input
						type="email"
						placeholder={languageStore.t.home.subscribePlaceholder}
						class="cta-input"
						class:input-error={subscribeState === 'error'}
						aria-label="Email address for newsletter"
						bind:value={emailValue}
						required
					/>
					<button class="cta-btn" type="submit">
						<span>{languageStore.t.home.subscribeButton}</span>
						<SFIcon name="arrowRight" size={15} color="var(--md-sys-color-surface)" />
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
		gap: var(--space-2);
	}

	.section-label {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		color: var(--md-sys-color-on-surface-variant);
		font-weight: 600;
		font-size: 11px;
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}

	.section-desc {
		color: var(--md-sys-color-on-surface-variant);
		max-width: 56ch;
		font-size: 16px;
	}

	.section-cta {
		margin-top: var(--space-10);
		display: flex;
		justify-content: center;
	}

	.btn-outlined-primary {
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
			background var(--motion-duration-short4) var(--motion-easing-standard),
			transform var(--motion-duration-short4) var(--motion-easing-standard),
			border-color var(--motion-duration-short4) var(--motion-easing-standard);
	}

	.btn-outlined-primary:hover {
		background: rgba(140, 140, 145, 0.16);
		color: var(--md-sys-color-on-surface);
		border-color: rgba(0, 113, 227, 0.3);
		transform: translateY(-1px);
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
		background: transparent;
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
		padding: var(--space-5);
		border-radius: 20px;
		background: var(--liquid-glass-bg);
		backdrop-filter: var(--liquid-blur);
		-webkit-backdrop-filter: var(--liquid-blur);
		border: 1px solid var(--liquid-glass-border);
		box-shadow: var(--liquid-glass-shadow);
		text-align: left;
		cursor: pointer;
		font-family: var(--font-body);
		color: var(--md-sys-color-on-surface);
		transition:
			background 0.25s ease,
			border-color 0.25s ease,
			transform 0.25s var(--motion-easing-standard),
			box-shadow 0.25s ease;
		animation: slide-up var(--motion-duration-medium3) var(--motion-easing-emphasized-decelerate) var(--delay, 0ms) both;
	}

	.category-card:hover {
		background: rgba(140, 140, 145, 0.16);
		border-color: rgba(255, 255, 255, 0.3);
		transform: translateY(-2px);
		box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
	}

	.cat-icon-wrap {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		border-radius: 12px;
		background: rgba(140, 140, 145, 0.14);
		border: 1px solid var(--glass-border);
		color: var(--md-sys-color-on-surface);
		flex-shrink: 0;
		transition: transform 0.2s ease, background 0.2s ease;
	}

	.category-card:hover .cat-icon-wrap {
		transform: scale(1.06);
		background: rgba(140, 140, 145, 0.22);
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
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.cat-arrow {
		color: var(--md-sys-color-on-surface-variant);
		opacity: 0.5;
		transition: opacity 0.2s ease, transform 0.25s var(--motion-easing-standard);
		flex-shrink: 0;
	}

	.category-card:hover .cat-arrow {
		opacity: 1;
		color: var(--md-sys-color-on-surface);
		transform: translateX(3px);
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
		background: var(--liquid-glass-bg);
		backdrop-filter: var(--liquid-blur);
		-webkit-backdrop-filter: var(--liquid-blur);
		border-radius: 28px;
		border: 1px solid var(--liquid-glass-border);
		box-shadow: var(--liquid-glass-shadow);
		padding: var(--space-16) var(--space-8);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-4);
	}

	.cta-icon {
		width: 56px;
		height: 56px;
		border-radius: 50%;
		background: rgba(140, 140, 145, 0.16);
		border: 1px solid var(--glass-border);
		color: var(--md-sys-color-on-surface);
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: var(--space-2);
	}

	.cta-card h2 {
		color: var(--md-sys-color-on-surface);
		font-weight: 700;
	}

	.cta-card p {
		color: var(--md-sys-color-on-surface-variant);
		max-width: 48ch;
	}

	.cta-form {
		display: flex;
		gap: 10px;
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
		border-radius: var(--md-sys-shape-corner-full);
		border: 1px solid var(--glass-border);
		background: rgba(140, 140, 145, 0.08);
		font-family: var(--font-body);
		font-size: 15px;
		color: var(--md-sys-color-on-surface);
		outline: none;
		transition:
			border-color var(--motion-duration-short4) var(--motion-easing-standard),
			box-shadow var(--motion-duration-short4) var(--motion-easing-standard);
	}

	.cta-input:focus {
		border-color: rgba(255, 255, 255, 0.3);
		box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
	}

	.cta-input::placeholder {
		color: var(--md-sys-color-on-surface-variant);
	}

	.cta-btn {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 12px 24px;
		border-radius: var(--md-sys-shape-corner-full);
		border: none;
		background: var(--md-sys-color-on-surface);
		color: var(--md-sys-color-surface);
		font-family: var(--font-body);
		font-size: 15px;
		font-weight: 600;
		cursor: pointer;
		transition:
			transform var(--motion-duration-short4) var(--motion-easing-standard),
			opacity var(--motion-duration-short4) var(--motion-easing-standard);
	}

	.cta-btn:hover {
		transform: translateY(-1px);
		opacity: 0.92;
	}

	.input-error {
		border-color: var(--apple-red) !important;
	}

	.subscribe-error {
		font-size: 13px;
		color: var(--apple-red);
		margin-top: calc(var(--space-2) * -1);
		max-width: none;
	}

	.subscribe-success {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 12px 24px;
		background: rgba(52, 199, 89, 0.12);
		border: 1px solid var(--apple-green);
		border-radius: var(--md-sys-shape-corner-full);
		color: var(--md-sys-color-on-surface);
		font-size: 15px;
		font-weight: 500;
	}

	.subscribe-success .material-symbols-rounded {
		color: var(--apple-green);
		font-size: 22px;
	}
</style>
