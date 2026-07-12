<script lang="ts">
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { projects } from '$lib/data/projects';

	const languages = [...new Set(projects.map((p) => p.language))];
	let selectedLang = $state('');

	const filteredProjects = $derived(
		selectedLang ? projects.filter((p) => p.language === selectedLang) : projects
	);
</script>

<svelte:head>
	<title>Projects – Iris Notebook</title>
	<meta name="description" content="Open source projects by Iris: Android launchers, dotfiles, SvelteKit sites, local LLM tools, and Compose component libraries." />
</svelte:head>

<main class="projects-page" id="main-content">
	<div class="container">
		<Breadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'Projects' }]} />

		<header class="page-header">
			<h1 class="display-small">Projects</h1>
			<p class="body-large page-subtitle">
				Open source work I've built and released publicly. From Android apps to CLI tools.
			</p>
		</header>

		<!-- Language filter -->
		<div class="filter-bar" role="group" aria-label="Filter by language">
			<button
				class="filter-btn"
				class:active={!selectedLang}
				onclick={() => (selectedLang = '')}
				aria-pressed={!selectedLang}
			>
				All Languages
			</button>
			{#each languages as lang}
				<button
					class="filter-btn"
					class:active={selectedLang === lang}
					onclick={() => (selectedLang = selectedLang === lang ? '' : lang)}
					aria-pressed={selectedLang === lang}
				>
					{lang}
				</button>
			{/each}
		</div>

		<!-- Stats bar -->
		<div class="stats-bar">
			<div class="stat">
				<span class="material-symbols-rounded">folder_code</span>
				<span class="label-large">{projects.length} repositories</span>
			</div>
			<div class="stat">
				<span class="material-symbols-rounded">star</span>
				<span class="label-large">{projects.reduce((sum, p) => sum + p.stars, 0).toLocaleString()} total stars</span>
			</div>
		</div>

		<!-- Projects grid -->
		<div class="projects-grid">
			{#each filteredProjects as project, i}
				<ProjectCard {project} index={i} />
			{/each}
		</div>

		{#if filteredProjects.length === 0}
			<div class="empty-state">
				<span class="material-symbols-rounded">code_off</span>
				<h2 class="headline-small">No projects in this language</h2>
				<button onclick={() => (selectedLang = '')} class="filter-btn">Clear filter</button>
			</div>
		{/if}

		<!-- GitHub CTA -->
		<div class="github-cta">
			<div class="cta-inner">
				<div class="cta-icon">
					<svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
						<path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
					</svg>
				</div>
				<div>
					<h2 class="title-large">See more on GitHub</h2>
					<p class="body-medium">These are just the highlights. Find all my repositories on GitHub.</p>
				</div>
				<a
					href="https://github.com/kiwikiwicq"
					class="github-btn"
					target="_blank"
					rel="noopener noreferrer"
				>
					View GitHub Profile
					<span class="material-symbols-rounded">open_in_new</span>
				</a>
			</div>
		</div>
	</div>
</main>

<style>
	.projects-page {
		padding-top: calc(var(--nav-height) + var(--space-8));
		padding-bottom: var(--space-20);
		min-height: 100vh;
	}

	.page-header {
		margin-block: var(--space-6) var(--space-8);
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.page-subtitle {
		color: var(--md-sys-color-on-surface-variant);
		max-width: 56ch;
	}

	.filter-bar {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		margin-bottom: var(--space-6);
	}

	.filter-btn {
		display: inline-flex;
		align-items: center;
		padding: 8px 16px;
		border-radius: var(--md-sys-shape-corner-small);
		border: 1px solid var(--md-sys-color-outline-variant);
		background: var(--md-sys-color-surface-container-low);
		color: var(--md-sys-color-on-surface-variant);
		font-family: var(--font-body);
		font-size: 13px;
		font-weight: 500;
		cursor: pointer;
		transition:
			background var(--motion-duration-short4) var(--motion-easing-standard),
			color var(--motion-duration-short4) var(--motion-easing-standard),
			border-color var(--motion-duration-short4) var(--motion-easing-standard);
	}

	.filter-btn.active,
	.filter-btn:hover {
		background: var(--md-sys-color-secondary-container);
		color: var(--md-sys-color-on-secondary-container);
		border-color: transparent;
	}

	.stats-bar {
		display: flex;
		gap: var(--space-8);
		margin-bottom: var(--space-8);
		padding: var(--space-4) var(--space-5);
		background: var(--md-sys-color-surface-container-low);
		border-radius: var(--md-sys-shape-corner-large);
		border: 1px solid var(--md-sys-color-outline-variant);
		flex-wrap: wrap;
	}

	.stat {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		color: var(--md-sys-color-on-surface-variant);
	}

	.stat .material-symbols-rounded { font-size: 20px; color: var(--md-sys-color-primary); }

	.projects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: var(--space-5);
		margin-bottom: var(--space-10);
	}

	.empty-state {
		text-align: center;
		padding: var(--space-16) var(--space-6);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-4);
		color: var(--md-sys-color-on-surface-variant);
	}

	.empty-state .material-symbols-rounded {
		font-size: 64px;
		opacity: 0.4;
	}

	/* GitHub CTA */
	.github-cta {
		background: var(--md-sys-color-surface-container-low);
		border-radius: var(--shape-card);
		border: 1px solid var(--md-sys-color-outline-variant);
		overflow: hidden;
	}

	.cta-inner {
		display: flex;
		align-items: center;
		gap: var(--space-6);
		padding: var(--space-8);
		flex-wrap: wrap;
	}

	.cta-icon {
		width: 56px;
		height: 56px;
		border-radius: var(--md-sys-shape-corner-full);
		background: var(--md-sys-color-surface-container-highest);
		color: var(--md-sys-color-on-surface);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.cta-inner > div:not(.cta-icon) {
		flex: 1;
		min-width: 200px;
	}

	.cta-inner h2 {
		color: var(--md-sys-color-on-surface);
		margin-bottom: var(--space-1);
	}

	.cta-inner p {
		color: var(--md-sys-color-on-surface-variant);
	}

	.github-btn {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: 12px 24px;
		border-radius: var(--shape-button);
		background: var(--md-sys-color-on-surface);
		color: var(--md-sys-color-surface);
		font-size: 14px;
		font-weight: 600;
		text-decoration: none;
		white-space: nowrap;
		transition:
			transform var(--motion-duration-short4) var(--motion-easing-standard),
			opacity var(--motion-duration-short4) var(--motion-easing-standard);
	}

	.github-btn:hover {
		transform: translateY(-2px);
		opacity: 0.9;
	}
</style>
