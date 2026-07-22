<script lang="ts">
	import type { Project } from '$lib/data/projects';
	import SFIcon from './SFIcon.svelte';

	interface Props {
		project: Project;
		index?: number;
	}

	let { project, index = 0 }: Props = $props();

	function formatStars(count: number): string {
		if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
		return String(count);
	}
</script>

<article class="project-card card" style="--delay: {index * 60}ms">
	<a href={project.url} class="card-link" target="_blank" rel="noopener noreferrer">
		<div class="card-body">
			<div class="card-header">
				<div class="repo-icon">
					<SFIcon name="code" size={16} />
				</div>
				<span class="external-icon">
					<SFIcon name="externalLink" size={15} />
				</span>
			</div>

			<h3 class="repo-name">{project.name}</h3>
			<p class="repo-desc">{project.description}</p>

			<div class="repo-topics">
				{#each project.topics.slice(0, 4) as topic}
					<span class="topic-chip">{topic}</span>
				{/each}
			</div>
		</div>

		<div class="card-footer">
			<div class="lang-badge">
				<span class="lang-dot" style="background: {project.languageColor}"></span>
				<span class="label-small">{project.language}</span>
			</div>
			<div class="repo-stats">
				<span class="stat" title="Stars">
					<SFIcon name="star" size={13} />
					{formatStars(project.stars)}
				</span>
				<span class="stat" title="Forks">
					<SFIcon name="fork" size={13} />
					{project.forks}
				</span>
			</div>
		</div>
	</a>
</article>

<style>
	.project-card {
		background: var(--md-sys-color-surface);
		border-radius: var(--shape-card);
		border: 1px solid var(--glass-border);
		box-shadow: var(--card-shadow-resting);
		overflow: hidden;
		transition:
			transform var(--motion-duration-medium1) var(--motion-easing-standard),
			box-shadow var(--motion-duration-medium1) var(--motion-easing-standard),
			border-color var(--motion-duration-medium1) var(--motion-easing-standard);
		animation: slide-up var(--motion-duration-medium3) var(--motion-easing-emphasized-decelerate) var(--delay, 0ms) both;
	}

	.project-card:hover {
		transform: translateY(-4px) scale(1.01);
		box-shadow: var(--card-shadow-hover);
		border-color: rgba(255, 255, 255, 0.25);
	}

	.card-link {
		display: flex;
		flex-direction: column;
		height: 100%;
		text-decoration: none;
		color: inherit;
	}

	.card-body {
		flex: 1;
		padding: var(--space-6);
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.card-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.repo-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		background: rgba(140, 140, 145, 0.14);
		border-radius: var(--md-sys-shape-corner-medium);
		color: var(--md-sys-color-on-surface);
	}

	.external-icon {
		color: var(--md-sys-color-on-surface-variant);
		opacity: 0.6;
		transition:
			opacity var(--motion-duration-short4) var(--motion-easing-standard),
			transform var(--motion-duration-short4) var(--motion-easing-standard),
			color var(--motion-duration-short4) var(--motion-easing-standard);
	}

	.project-card:hover .external-icon {
		opacity: 1;
		color: var(--md-sys-color-on-surface);
		transform: translate(2px, -2px);
	}

	.external-icon .material-symbols-rounded { font-size: 18px; }

	.repo-name {
		font-size: 16px;
		font-weight: 600;
		color: var(--md-sys-color-on-surface);
		font-family: var(--font-mono);
		letter-spacing: -0.01em;
		transition: color var(--motion-duration-short4) var(--motion-easing-standard);
	}

	.project-card:hover .repo-name {
		color: var(--md-sys-color-on-surface);
	}

	.repo-desc {
		font-size: 14px;
		line-height: 1.5;
		color: var(--md-sys-color-on-surface-variant);
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
		max-width: none;
	}

	.repo-topics {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin-top: auto;
	}

	.topic-chip {
		padding: 3px 10px;
		border-radius: var(--md-sys-shape-corner-full);
		background: rgba(140, 140, 145, 0.12);
		color: var(--md-sys-color-on-surface);
		font-size: 11px;
		font-weight: 600;
		letter-spacing: -0.01em;
	}

	.card-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px var(--space-6);
		border-top: 1px solid var(--glass-border);
		background: rgba(140, 140, 145, 0.04);
	}

	.lang-badge {
		display: flex;
		align-items: center;
		gap: 6px;
		color: var(--md-sys-color-on-surface-variant);
	}

	.lang-dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.repo-stats {
		display: flex;
		align-items: center;
		gap: var(--space-4);
	}

	.stat {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: 12px;
		font-weight: 500;
		color: var(--md-sys-color-on-surface-variant);
	}

	.stat .material-symbols-rounded { font-size: 15px; }
</style>
