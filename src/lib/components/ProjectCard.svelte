<script lang="ts">
	import type { Project } from '$lib/data/projects';

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

<article class="project-card" style="--delay: {index * 60}ms">
	<a href={project.url} class="card-link" target="_blank" rel="noopener noreferrer">
		<div class="card-body">
			<div class="card-header">
				<div class="repo-icon">
					<span class="material-symbols-rounded">folder_code</span>
				</div>
				<span class="external-icon">
					<span class="material-symbols-rounded">open_in_new</span>
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
					<span class="material-symbols-rounded">star</span>
					{formatStars(project.stars)}
				</span>
				<span class="stat" title="Forks">
					<span class="material-symbols-rounded">fork_right</span>
					{project.forks}
				</span>
			</div>
		</div>
	</a>
</article>

<style>
	.project-card {
		background: var(--md-sys-color-surface-container-low);
		border-radius: var(--shape-card);
		border: 1px solid var(--md-sys-color-outline-variant);
		box-shadow: var(--card-shadow-resting);
		overflow: hidden;
		transition:
			transform var(--motion-duration-medium1) var(--motion-easing-standard),
			box-shadow var(--motion-duration-medium1) var(--motion-easing-standard),
			border-color var(--motion-duration-medium1) var(--motion-easing-standard);
		animation: slide-up var(--motion-duration-medium3) var(--motion-easing-emphasized-decelerate) var(--delay, 0ms) both;
	}

	.project-card:hover {
		transform: translateY(-6px);
		box-shadow: var(--card-shadow-hover);
		border-color: var(--md-sys-color-primary);
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
		gap: var(--space-3);
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
		width: 40px;
		height: 40px;
		background: var(--md-sys-color-primary-container);
		border-radius: var(--md-sys-shape-corner-medium);
		color: var(--md-sys-color-primary);
	}

	.external-icon {
		color: var(--md-sys-color-on-surface-variant);
		opacity: 0;
		transition: opacity var(--motion-duration-short4) var(--motion-easing-standard);
	}

	.project-card:hover .external-icon {
		opacity: 1;
	}

	.external-icon .material-symbols-rounded { font-size: 18px; }

	.repo-name {
		font-size: 16px;
		font-weight: 600;
		color: var(--md-sys-color-on-surface);
		font-family: var(--font-mono);
		transition: color var(--motion-duration-short4) var(--motion-easing-standard);
	}

	.project-card:hover .repo-name {
		color: var(--md-sys-color-primary);
	}

	.repo-desc {
		font-size: 14px;
		line-height: 1.6;
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
		gap: var(--space-2);
	}

	.topic-chip {
		padding: 2px 10px;
		border-radius: var(--md-sys-shape-corner-full);
		background: var(--md-sys-color-primary-container);
		color: var(--md-sys-color-on-primary-container);
		font-size: 12px;
		font-weight: 500;
	}

	.card-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--space-4) var(--space-6);
		border-top: 1px solid var(--md-sys-color-outline-variant);
		background: var(--md-sys-color-surface-container);
	}

	.lang-badge {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		color: var(--md-sys-color-on-surface-variant);
	}

	.lang-dot {
		width: 12px;
		height: 12px;
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
		font-size: 13px;
		color: var(--md-sys-color-on-surface-variant);
	}

	.stat .material-symbols-rounded { font-size: 16px; }
</style>
