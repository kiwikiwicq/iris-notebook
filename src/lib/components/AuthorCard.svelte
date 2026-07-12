<script lang="ts">
	import defaultAvatar from '$lib/assets/giphy.gif';

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
		bio = 'Developer, tinkerer, and lifelong learner. Writing about Android, Linux, and the craft of software.',
		github = 'https://github.com/kiwikiwicq',
		twitter,
		website,
		compact = false
	}: Props = $props();

	// Initials avatar fallback
	const initials = name
		.split(' ')
		.map((n) => n[0])
		.join('')
		.toUpperCase()
		.slice(0, 2);
</script>

<div class="author-card" class:compact>
	<div class="author-avatar" aria-hidden="true">
		{#if avatar}
			<img src={avatar} alt={name} />
		{:else}
			<span class="initials">{initials}</span>
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
					<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
						<path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
					</svg>
				</a>
			{/if}
			{#if twitter}
				<a href={twitter} class="author-link" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
					<span class="material-symbols-rounded" style="font-size: 18px">alternate_email</span>
				</a>
			{/if}
			{#if website}
				<a href={website} class="author-link" target="_blank" rel="noopener noreferrer" aria-label="Website">
					<span class="material-symbols-rounded" style="font-size: 18px">language</span>
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
		background: var(--md-sys-color-surface-container-low);
		border-radius: var(--shape-card);
		border: 1px solid var(--md-sys-color-outline-variant);
		align-items: flex-start;
	}

	.author-card.compact {
		padding: var(--space-4);
		gap: var(--space-3);
		align-items: center;
	}

	.author-avatar {
		width: 64px;
		height: 64px;
		border-radius: var(--md-sys-shape-corner-full);
		background: linear-gradient(135deg, var(--md-sys-color-primary) 0%, var(--md-sys-color-tertiary) 100%);
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
		color: white;
		font-size: 24px;
		font-weight: 600;
		font-family: var(--font-display);
	}

	.compact .initials { font-size: 16px; }

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
		letter-spacing: 0.8px;
		max-width: none;
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
		width: 34px;
		height: 34px;
		border-radius: var(--md-sys-shape-corner-full);
		color: var(--md-sys-color-on-surface-variant);
		text-decoration: none;
		transition:
			background var(--motion-duration-short4) var(--motion-easing-standard),
			color var(--motion-duration-short4) var(--motion-easing-standard);
	}

	.author-link:hover {
		background: var(--md-sys-color-secondary-container);
		color: var(--md-sys-color-on-secondary-container);
	}
</style>
