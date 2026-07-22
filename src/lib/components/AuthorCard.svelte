<script lang="ts">
	import defaultAvatar from '$lib/assets/giphy.gif';
	import SFIcon from './SFIcon.svelte';

	interface Props {
		name?: string;
		avatar?: string;
		bio?: string;
		github?: string;
		twitter?: string;
		website?: string;
		compact?: boolean;
	}

	let {
		name = 'Iris',
		avatar = defaultAvatar,
		bio = 'Developer, tinkerer, and software engineer. Notes on Swift, Kotlin, Linux, and system design.',
		github = 'https://github.com/kiwikiwicq',
		twitter,
		website,
		compact = false
	}: Props = $props();
</script>

<div class="author-card liquid-glass" class:compact>
	<div class="author-avatar" aria-hidden="true">
		{#if avatar}
			<img src={avatar} alt={name} />
		{:else}
			<span class="initials">{name.slice(0, 2).toUpperCase()}</span>
		{/if}
	</div>

	<div class="author-info">
		<p class="author-label label-small">Written by</p>
		<h3 class="author-name">{name}</h3>
		{#if !compact}
			<p class="author-bio body-medium">{bio}</p>
		{/if}

		<div class="author-links">
			{#if github}
				<a href={github} class="author-link" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
					<SFIcon name="github" size={16} />
				</a>
			{/if}
			{#if twitter}
				<a href={twitter} class="author-link" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
					<SFIcon name="accessibility" size={16} />
				</a>
			{/if}
			{#if website}
				<a href={website} class="author-link" target="_blank" rel="noopener noreferrer" aria-label="Website">
					<SFIcon name="externalLink" size={16} />
				</a>
			{/if}
		</div>
	</div>
</div>

<style>
	.author-card {
		display: flex;
		gap: var(--space-5);
		padding: var(--space-6);
		border-radius: 24px;
		align-items: flex-start;
	}

	.author-card.compact {
		padding: var(--space-4);
		gap: var(--space-3);
		align-items: center;
	}

	.author-avatar {
		width: 56px;
		height: 56px;
		border-radius: var(--md-sys-shape-corner-full);
		border: 1px solid var(--glass-border);
		background: rgba(140, 140, 145, 0.16);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		overflow: hidden;
	}

	.compact .author-avatar {
		width: 40px;
		height: 40px;
	}

	.initials {
		color: var(--md-sys-color-on-surface);
		font-size: 20px;
		font-weight: 600;
		font-family: var(--font-display);
	}

	.compact .initials { font-size: 15px; }

	.author-avatar img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.author-info {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		flex: 1;
		min-width: 0;
	}

	.author-label {
		color: var(--md-sys-color-on-surface-variant);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		font-size: 11px;
		font-weight: 600;
	}

	.author-name {
		font-size: 18px;
		font-weight: 600;
		color: var(--md-sys-color-on-surface);
	}

	.compact .author-name { font-size: 15px; }

	.author-bio {
		color: var(--md-sys-color-on-surface-variant);
		line-height: 1.6;
		max-width: 60ch;
		font-size: 14px;
	}

	.author-links {
		display: flex;
		gap: var(--space-2);
		margin-top: var(--space-1);
	}

	.author-link {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: var(--md-sys-shape-corner-full);
		border: 1px solid var(--glass-border);
		background: rgba(140, 140, 145, 0.1);
		color: var(--md-sys-color-on-surface-variant);
		text-decoration: none;
		transition:
			background var(--motion-duration-short4) var(--motion-easing-standard),
			color var(--motion-duration-short4) var(--motion-easing-standard);
	}

	.author-link:hover {
		background: rgba(140, 140, 145, 0.2);
		color: var(--md-sys-color-on-surface);
	}
</style>
