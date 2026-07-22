<script lang="ts">
	import { searchStore } from '$lib/stores/search.svelte';
	import ThemeToggle from '../ThemeToggle.svelte';
	import SFIcon from '../SFIcon.svelte';

	interface Props {
		onMenuClick: () => void;
	}

	let { onMenuClick }: Props = $props();
</script>

<div class="nav-island nav-island--actions">
	<button
		class="search-trigger"
		onclick={() => searchStore.open()}
		aria-label="Search articles (⌘K)"
		title="Search (⌘K)"
	>
		<SFIcon name="search" size={16} />
		<span class="search-placeholder">Search articles...</span>
		<kbd class="cmd-badge">⌘K</kbd>
	</button>

	<div class="action-divider"></div>

	<ThemeToggle />

	<a
		href="https://github.com/kiwikiwicq"
		class="icon-btn github-btn-desktop"
		target="_blank"
		rel="noopener noreferrer"
		aria-label="Visit GitHub profile"
		title="GitHub Profile"
	>
		<SFIcon name="github" size={17} />
	</a>

	<!-- Mobile menu button -->
	<button class="icon-btn menu-btn" onclick={onMenuClick} aria-label="Open navigation menu">
		<SFIcon name="menu" size={18} />
	</button>
</div>

<style>
	.nav-island {
		display: flex;
		align-items: center;
		gap: 6px;
		height: 44px;
		padding: 4px 8px;
		border-radius: var(--md-sys-shape-corner-full);
		background: var(--liquid-glass-bg);
		backdrop-filter: var(--liquid-blur);
		-webkit-backdrop-filter: var(--liquid-blur);
		border: 1px solid var(--liquid-glass-border);
		box-shadow: var(--liquid-glass-shadow);
		transition:
			transform 0.25s var(--motion-easing-standard),
			box-shadow 0.25s var(--motion-easing-standard),
			border-color 0.25s var(--motion-easing-standard);
		pointer-events: auto;
	}

	.nav-island:hover {
		border-color: rgba(255, 255, 255, 0.3);
	}

	.action-divider {
		width: 1px;
		height: 18px;
		background: var(--liquid-glass-border);
		margin-inline: 2px;
	}

	.search-trigger {
		display: flex;
		align-items: center;
		gap: 8px;
		height: 34px;
		width: 180px;
		padding-inline: 10px 8px;
		border-radius: var(--md-sys-shape-corner-full);
		border: 1px solid transparent;
		background: transparent;
		color: var(--md-sys-color-on-surface-variant);
		cursor: pointer;
		transition:
			width 0.25s var(--motion-easing-standard),
			background 0.2s ease,
			color 0.2s ease;
	}

	.search-trigger:hover {
		background: rgba(140, 140, 145, 0.12);
		color: var(--md-sys-color-on-surface);
	}

	.search-placeholder {
		font-size: 12.5px;
		font-weight: 400;
		color: var(--md-sys-color-on-surface-variant);
		flex: 1;
		text-align: left;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.cmd-badge {
		font-size: 10.5px;
		font-weight: 500;
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, sans-serif;
		padding: 2px 5px;
		border-radius: 5px;
		background: rgba(140, 140, 145, 0.16);
		border: 1px solid var(--glass-border);
		color: var(--md-sys-color-on-surface-variant);
		letter-spacing: 0.05em;
		line-height: 1.2;
	}

	.icon-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 34px;
		height: 34px;
		border-radius: 50%;
		border: 1px solid transparent;
		background: transparent;
		color: var(--md-sys-color-on-surface-variant);
		cursor: pointer;
		transition:
			background var(--motion-duration-short4) var(--motion-easing-standard),
			color var(--motion-duration-short4) var(--motion-easing-standard),
			transform 0.15s ease;
		text-decoration: none;
	}

	.icon-btn:hover {
		background: rgba(140, 140, 145, 0.14);
		color: var(--md-sys-color-on-surface);
		transform: scale(1.05);
	}

	@media (max-width: 768px) {
		.nav-island {
			height: 40px;
			padding: 3px 6px;
			gap: 4px;
		}

		.search-trigger {
			width: 34px;
			height: 34px;
			padding-inline: 0;
			justify-content: center;
			background: transparent;
			border: none;
		}

		.search-placeholder,
		.cmd-badge,
		.action-divider,
		.github-btn-desktop {
			display: none !important;
		}

		.icon-btn {
			width: 32px;
			height: 32px;
		}
	}

	@media (min-width: 769px) {
		.menu-btn {
			display: none;
		}
	}
</style>
