<script lang="ts">
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import SFIcon from '$lib/components/SFIcon.svelte';
	import { projects } from '$lib/data/projects';

	const languages = [...new Set(projects.map((p) => p.language))];
	let selectedLang = $state('');

	const filteredProjects = $derived(
		selectedLang ? projects.filter((p) => p.language === selectedLang) : projects
	);
</script>

<svelte:head>
	<title>Projects — Iris Notebook</title>
	<meta name="description" content="Open source projects by Iris: Android tools, Linux utilities, SvelteKit sites, and developer libraries." />
</svelte:head>

<main class="projects-page" id="main-content">
	<div class="container">
		<Breadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'Projects' }]} />

		<header class="page-header">
			<h1 class="display-small">Projects</h1>
			<p class="body-large page-subtitle">
				Open source work, developer utilities, and experimental software tools.
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
		<div class="stats-bar liquid-glass">
			<div class="stat">
				<SFIcon name="folder" size={18} />
				<span class="label-large">{projects.length} repositories</span>
			</div>
			<div class="stat">
				<SFIcon name="star" size={18} />
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
			<div class="empty-state liquid-glass">
				<SFIcon name="code" size={48} />
				<h2 class="headline-small">No projects in this language</h2>
				<button onclick={() => (selectedLang = '')} class="filter-btn">Clear filter</button>
			</div>
		{/if}

		<!-- GitHub CTA -->
		<div class="github-cta liquid-glass">
			<div class="cta-inner">
				<div class="cta-icon">
					<SFIcon name="github" size={28} />
				</div>
				<div>
					<h2 class="title-large">See more on GitHub</h2>
					<p class="body-medium">Find all public repositories and active developments on GitHub.</p>
				</div>
				<a
					href="https://github.com/kiwikiwicq"
					class="github-btn"
					target="_blank"
					rel="noopener noreferrer"
				>
					<span>View GitHub Profile</span>
					<SFIcon name="externalLink" size={14} color="var(--md-sys-color-surface)" />
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
		padding: 8px 18px;
		border-radius: var(--md-sys-shape-corner-full);
		border: 1px solid var(--liquid-glass-border);
		background: var(--liquid-glass-bg);
		backdrop-filter: var(--liquid-blur);
		-webkit-backdrop-filter: var(--liquid-blur);
		box-shadow: var(--liquid-glass-shadow);
		color: var(--md-sys-color-on-surface-variant);
		font-family: var(--font-body);
		font-size: 13px;
		font-weight: 500;
		letter-spacing: -0.01em;
		cursor: pointer;
		transition:
			background var(--motion-duration-short4) var(--motion-easing-standard),
			color var(--motion-duration-short4) var(--motion-easing-standard),
			border-color var(--motion-duration-short4) var(--motion-easing-standard);
	}

	.filter-btn:hover {
		background: rgba(140, 140, 145, 0.16);
		color: var(--md-sys-color-on-surface);
	}

	.filter-btn.active {
		background: rgba(140, 140, 145, 0.22);
		border-color: rgba(140, 140, 145, 0.35);
		color: var(--md-sys-color-on-surface);
		font-weight: 600;
	}

	.stats-bar {
		display: flex;
		gap: var(--space-8);
		margin-bottom: var(--space-8);
		padding: var(--space-4) var(--space-6);
		border-radius: 20px;
		flex-wrap: wrap;
	}

	.stat {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		color: var(--md-sys-color-on-surface);
	}

	.projects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: var(--space-5);
		margin-bottom: var(--space-10);
	}

	.empty-state {
		text-align: center;
		padding: var(--space-16) var(--space-6);
		border-radius: 24px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-4);
		color: var(--md-sys-color-on-surface-variant);
	}

	/* GitHub CTA */
	.github-cta {
		border-radius: 24px;
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
		width: 52px;
		height: 52px;
		border-radius: var(--md-sys-shape-corner-full);
		background: rgba(140, 140, 145, 0.16);
		border: 1px solid var(--glass-border);
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
		transform: translateY(-1px);
		opacity: 0.92;
	}
</style>
