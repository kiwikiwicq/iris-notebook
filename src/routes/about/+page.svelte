<script lang="ts">
	import AuthorCard from '$lib/components/AuthorCard.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import Tag from '$lib/components/Tag.svelte';
	import SFIcon from '$lib/components/SFIcon.svelte';
	import { categories } from '$lib/data/categories';
	import { getPublishedPosts } from '$lib/data/posts';
	import { languageStore } from '$lib/stores/language.svelte';

	const posts = getPublishedPosts();

	const skills = [
		{ group: 'Languages', items: ['Kotlin', 'Rust', 'TypeScript', 'Python', 'Lua', 'Shell'] },
		{ group: 'Android', items: ['Jetpack Compose', 'Material Design 3', 'Coroutines', 'Room', 'Hilt'] },
		{ group: 'Linux', items: ['Arch Linux', 'Hyprland', 'Neovim', 'Fish', 'systemd', 'Docker'] },
		{ group: 'Web', items: ['SvelteKit', 'TypeScript', 'CSS', 'Vite', 'Node.js'] },
		{ group: 'AI/ML', items: ['Ollama', 'LangChain', 'HuggingFace', 'PyTorch'] }
	];

	const timeline = [
		{
			year: '2026',
			items: [
				'Launched Iris Notebook (this site)',
				'Released horizon-launcher for Android'
			]
		},
		{
			year: '2025',
			items: [
				'Contributed to open source software tools',
				'Started deep dive into local LLMs',
				'Moved daily driver to Hyprland on Arch'
			]
		},
		{
			year: '2024',
			items: [
				'Started technical notes on Android runtime',
				'Released Jetpack Compose component libraries',
				'Learned Rust'
			]
		}
	];
</script>

<svelte:head>
	<title>{languageStore.t.aboutPage.title} — Iris Notebook</title>
	<meta name="description" content={languageStore.t.aboutPage.subtitle} />
</svelte:head>

<main class="about-page" id="main-content">
	<div class="container">
		<Breadcrumbs crumbs={[{ label: languageStore.t.nav.overview, href: '/' }, { label: languageStore.t.nav.about }]} />

		<!-- Hero section -->
		<section class="about-hero" aria-labelledby="about-name">
			<div class="hero-content">
				<div class="hero-avatar" aria-hidden="true">
					<span class="avatar-letter">I</span>
				</div>
				<div class="hero-text">
					<p class="hello label-medium">Hello, I'm</p>
					<h1 class="display-small" id="about-name">Iris</h1>
					<p class="about-tagline title-large">
						{languageStore.t.aboutPage.subtitle}
					</p>
					<p class="about-bio body-large">
						{languageStore.t.aboutPage.bioContent}
					</p>
					<div class="about-actions">
						<a href="/articles" class="btn-filled">
							<SFIcon name="articles" size={16} color="var(--md-sys-color-surface)" />
							<span>{languageStore.t.hero.browseArticles}</span>
						</a>
						<a href="https://github.com/kiwikiwicq" class="btn-outlined" target="_blank" rel="noopener noreferrer">
							<SFIcon name="github" size={16} />
							<span>GitHub</span>
						</a>
					</div>
				</div>
			</div>
		</section>

		<!-- Quick stats -->
		<div class="quick-stats liquid-glass">
			<div class="qstat">
				<span class="qstat-num">{posts.length}+</span>
				<span class="qstat-label">{languageStore.t.nav.articles}</span>
			</div>
			<div class="qstat-div"></div>
			<div class="qstat">
				<span class="qstat-num">{categories.length}</span>
				<span class="qstat-label">{languageStore.t.nav.categories}</span>
			</div>
		</div>

		<!-- What I write about -->
		<section class="about-section" aria-labelledby="writing-heading">
			<h2 class="headline-medium section-title" id="writing-heading">{languageStore.t.aboutPage.expertiseTitle}</h2>
			<div class="topics-grid">
				{#each categories as cat}
					{@const translatedCat = languageStore.translateCategory(cat.slug, cat.name, cat.description)}
					<a href="/articles?category={cat.slug}" class="topic-card liquid-glass">
						<div class="topic-icon">
							<SFIcon name="code" size={18} />
						</div>
						<div>
							<h3 class="title-medium">{translatedCat.name}</h3>
							<p class="body-small topic-desc">{translatedCat.description}</p>
						</div>
					</a>
				{/each}
			</div>
		</section>

		<!-- Skills -->
		<section class="about-section" aria-labelledby="skills-heading">
			<h2 class="headline-medium section-title" id="skills-heading">Skills &amp; Tools</h2>
			<div class="skills-grid">
				{#each skills as skillGroup}
					<div class="skill-group liquid-glass">
						<h3 class="title-small skill-group-name">{skillGroup.group}</h3>
						<div class="skill-tags">
							{#each skillGroup.items as skill}
								<Tag tag={skill} />
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- Timeline -->
		<section class="about-section" aria-labelledby="timeline-heading">
			<h2 class="headline-medium section-title" id="timeline-heading">Timeline</h2>
			<div class="timeline">
				{#each timeline as period, i}
					<div class="timeline-period" style="--delay: {i * 80}ms">
						<div class="timeline-year">
							<span class="year-badge liquid-glass">{period.year}</span>
						</div>
						<div class="timeline-events">
							{#each period.items as item}
								<div class="timeline-event">
									<SFIcon name="check" size={14} color="var(--apple-green)" />
									<span class="body-medium">{item}</span>
								</div>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- Author card full -->
		<section class="about-section" aria-labelledby="contact-heading">
			<h2 class="headline-medium section-title" id="contact-heading">Get in touch</h2>
			<AuthorCard />
		</section>
	</div>
</main>

<style>
	.about-page {
		padding-top: calc(var(--nav-height) + var(--space-8));
		padding-bottom: var(--space-20);
		min-height: 100vh;
	}

	.about-hero {
		margin-block: var(--space-6) var(--space-10);
	}

	.hero-content {
		display: flex;
		align-items: flex-start;
		gap: var(--space-8);
	}

	@media (max-width: 640px) {
		.hero-content { flex-direction: column; }
	}

	.hero-avatar {
		width: 84px;
		height: 84px;
		border-radius: var(--md-sys-shape-corner-full);
		background: rgba(140, 140, 145, 0.16);
		border: 1px solid var(--glass-border);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.avatar-letter {
		font-size: 36px;
		font-weight: 700;
		color: var(--md-sys-color-on-surface);
		font-family: var(--font-display);
	}

	.hero-text {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.hello {
		color: var(--md-sys-color-on-surface-variant);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		font-size: 12px;
	}

	.about-tagline {
		color: var(--md-sys-color-on-surface);
		font-weight: 600;
	}

	.about-bio {
		color: var(--md-sys-color-on-surface-variant);
		max-width: 64ch;
		line-height: 1.6;
	}

	.about-actions {
		display: flex;
		gap: var(--space-3);
		margin-top: var(--space-2);
		flex-wrap: wrap;
	}

	.btn-filled {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 11px 22px;
		border-radius: var(--md-sys-shape-corner-full);
		background: var(--md-sys-color-on-surface);
		color: var(--md-sys-color-surface);
		font-size: 14px;
		font-weight: 600;
		text-decoration: none;
		transition: transform 0.25s var(--motion-easing-standard), opacity 0.2s ease;
	}

	.btn-filled:hover { transform: translateY(-1px); opacity: 0.92; }

	.btn-outlined {
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
		text-decoration: none;
		transition: background 0.2s ease, border-color 0.2s ease;
	}

	.btn-outlined:hover {
		background: rgba(140, 140, 145, 0.16);
		border-color: rgba(255, 255, 255, 0.25);
	}

	/* Quick stats */
	.quick-stats {
		display: flex;
		align-items: center;
		gap: var(--space-8);
		padding: var(--space-6) var(--space-8);
		border-radius: 20px;
		margin-bottom: var(--space-12);
		flex-wrap: wrap;
		justify-content: center;
	}

	.qstat {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
	}

	.qstat-num {
		font-size: 32px;
		font-weight: 700;
		color: var(--md-sys-color-on-surface);
		letter-spacing: -0.02em;
		line-height: 1;
	}

	.qstat-label {
		font-size: 13px;
		color: var(--md-sys-color-on-surface-variant);
	}

	.qstat-div {
		width: 1px;
		height: 36px;
		background: var(--glass-border);
	}

	/* About sections */
	.about-section {
		margin-bottom: var(--space-12);
	}

	.section-title {
		margin-bottom: var(--space-6);
		color: var(--md-sys-color-on-surface);
	}

	/* Topics grid */
	.topics-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
		gap: var(--space-4);
	}

	.topic-card {
		display: flex;
		gap: var(--space-4);
		padding: var(--space-5);
		border-radius: 20px;
		text-decoration: none;
		color: var(--md-sys-color-on-surface);
		align-items: center;
		transition:
			background 0.2s ease,
			border-color 0.2s ease,
			transform 0.25s var(--motion-easing-standard);
	}

	.topic-card:hover {
		background: rgba(140, 140, 145, 0.16);
		border-color: rgba(255, 255, 255, 0.28);
		transform: translateY(-2px);
	}

	.topic-icon {
		width: 42px;
		height: 42px;
		border-radius: 12px;
		background: rgba(140, 140, 145, 0.12);
		color: var(--md-sys-color-on-surface);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.topic-desc {
		color: var(--md-sys-color-on-surface-variant);
		margin-top: 2px;
	}

	/* Skills */
	.skills-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: var(--space-4);
	}

	.skill-group {
		padding: var(--space-5);
		border-radius: 20px;
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.skill-group-name {
		color: var(--md-sys-color-on-surface);
		font-weight: 600;
	}

	.skill-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}

	/* Timeline */
	.timeline {
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
	}

	.timeline-period {
		display: flex;
		gap: var(--space-6);
		align-items: flex-start;
	}

	@media (max-width: 480px) {
		.timeline-period { flex-direction: column; gap: var(--space-2); }
	}

	.year-badge {
		display: inline-flex;
		align-items: center;
		padding: 4px 14px;
		border-radius: var(--md-sys-shape-corner-full);
		font-size: 13px;
		font-weight: 700;
		color: var(--md-sys-color-on-surface);
	}

	.timeline-events {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		flex: 1;
	}

	.timeline-event {
		display: flex;
		align-items: center;
		gap: 10px;
		color: var(--md-sys-color-on-surface-variant);
	}
</style>
