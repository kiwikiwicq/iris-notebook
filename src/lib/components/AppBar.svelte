<script lang="ts">
	import { themeStore } from '$lib/stores/theme.svelte';
	import { searchStore } from '$lib/stores/search.svelte';
	import { page } from '$app/stores';
	import ThemeToggle from './ThemeToggle.svelte';
	import SearchBar from './SearchBar.svelte';
	import SFIcon from './SFIcon.svelte';

	interface Props {
		onMenuClick: () => void;
	}

	let { onMenuClick }: Props = $props();

	let scrolled = $state(false);
	const pathname = $derived($page.url.pathname);

	$effect(() => {
		if (typeof window !== 'undefined') {
			const handleScroll = () => {
				scrolled = window.scrollY > 8;
			};
			window.addEventListener('scroll', handleScroll, { passive: true });
			return () => window.removeEventListener('scroll', handleScroll);
		}
	});

	const navLinks = [
		{ href: '/', label: 'Overview' },
		{ href: '/articles', label: 'Articles' },
		{ href: '/categories', label: 'Categories' },
		{ href: '/projects', label: 'Projects' },
		{ href: '/about', label: 'About' }
	];

	function isActive(href: string): boolean {
		if (href === '/') return pathname === '/';
		return pathname.startsWith(href);
	}
</script>

<header class="app-bar" class:scrolled aria-label="Site navigation">
	<div class="app-bar__inner">
		<!-- Logo -->
		<a href="/" class="app-bar__logo" aria-label="Iris Notebook – Home">
			<div class="logo-badge">
				<SFIcon name="code" size={15} color="var(--md-sys-color-on-surface)" />
			</div>
			<span class="logo-text">Iris Notebook</span>
		</a>

		<!-- Desktop navigation -->
		<nav class="app-bar__nav" aria-label="Main navigation">
			{#each navLinks as link}
				<a
					href={link.href}
					class="nav-link"
					class:active={isActive(link.href)}
					aria-current={isActive(link.href) ? 'page' : undefined}
				>
					{link.label}
				</a>
			{/each}
		</nav>

		<!-- Actions -->
		<div class="app-bar__actions">
			<button
				class="icon-btn search-trigger"
				onclick={() => searchStore.open()}
				aria-label="Search articles (⌘K)"
				title="Search (⌘K)"
			>
				<SFIcon name="search" size={17} />
				<span class="search-placeholder">Search articles...</span>
				<kbd class="cmd-badge">⌘K</kbd>
			</button>

			<ThemeToggle />

			<a
				href="https://github.com/kiwikiwicq"
				class="icon-btn github-btn-desktop"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Visit GitHub profile"
				title="GitHub Profile"
			>
				<SFIcon name="github" size={18} />
			</a>

			<!-- Mobile menu button -->
			<button class="icon-btn menu-btn" onclick={onMenuClick} aria-label="Open navigation menu">
				<SFIcon name="menu" size={18} />
			</button>
		</div>
	</div>
</header>

<SearchBar />

<style>
	.app-bar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		height: var(--nav-height);
		background: var(--appbar-bg);
		backdrop-filter: var(--liquid-blur);
		-webkit-backdrop-filter: var(--liquid-blur);
		border-bottom: 1px solid var(--liquid-glass-border);
		box-shadow: inset 0 -1px 0 rgba(255, 255, 255, 0.08);
		transition:
			background var(--motion-duration-medium1) var(--motion-easing-standard),
			border-color var(--motion-duration-medium1) var(--motion-easing-standard),
			box-shadow var(--motion-duration-medium1) var(--motion-easing-standard);
	}

	.app-bar.scrolled {
		box-shadow: var(--md-sys-elevation-1);
	}

	.app-bar__inner {
		display: flex;
		align-items: center;
		height: 100%;
		width: 100%;
		max-width: var(--max-width);
		margin-inline: auto;
		padding-inline: var(--space-6);
		gap: var(--space-6);
	}

	/* Logo */
	.app-bar__logo {
		display: flex;
		align-items: center;
		gap: 10px;
		text-decoration: none;
		color: var(--md-sys-color-on-surface);
		flex-shrink: 0;
	}

	.logo-badge {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		background: var(--liquid-glass-bg);
		backdrop-filter: var(--liquid-blur);
		border: 1px solid var(--liquid-glass-border);
		border-radius: 8px;
		color: var(--md-sys-color-on-surface);
		box-shadow: var(--liquid-glass-shadow);
		transition: transform 0.25s var(--motion-easing-standard);
	}

	.app-bar__logo:hover .logo-badge {
		transform: scale(1.08);
	}

	.logo-text {
		font-size: 17px;
		font-weight: 600;
		letter-spacing: -0.022em;
		color: var(--md-sys-color-on-surface);
	}

	/* Navigation */
	.app-bar__nav {
		display: flex;
		align-items: center;
		gap: var(--space-1);
		flex: 1;
		justify-content: center;
	}

	.nav-link {
		position: relative;
		display: flex;
		align-items: center;
		padding: 6px 14px;
		border-radius: var(--md-sys-shape-corner-full);
		font-size: 13px;
		font-weight: 500;
		letter-spacing: -0.01em;
		color: var(--md-sys-color-on-surface-variant);
		text-decoration: none;
		transition:
			background var(--motion-duration-short4) var(--motion-easing-standard),
			color var(--motion-duration-short4) var(--motion-easing-standard);
	}

	.nav-link:hover {
		color: var(--md-sys-color-on-surface);
		background: rgba(140, 140, 145, 0.12);
	}

	.nav-link.active {
		background: rgba(140, 140, 145, 0.16);
		color: var(--md-sys-color-on-surface);
		font-weight: 600;
	}

	/* Actions */
	.app-bar__actions {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		flex-shrink: 0;
		margin-left: auto;
	}

	.icon-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 34px;
		padding-inline: 8px;
		border-radius: var(--md-sys-shape-corner-full);
		border: 1px solid transparent;
		background: transparent;
		color: var(--md-sys-color-on-surface-variant);
		cursor: pointer;
		transition:
			background var(--motion-duration-short4) var(--motion-easing-standard),
			border-color var(--motion-duration-short4) var(--motion-easing-standard),
			color var(--motion-duration-short4) var(--motion-easing-standard);
		text-decoration: none;
	}

	.search-trigger {
		display: flex;
		align-items: center;
		gap: 8px;
		height: 34px;
		width: 210px;
		padding-inline: 12px;
		border-radius: var(--md-sys-shape-corner-full);
		border: 1px solid var(--liquid-glass-border);
		background: var(--liquid-glass-bg);
		backdrop-filter: var(--liquid-blur);
		-webkit-backdrop-filter: var(--liquid-blur);
		box-shadow: var(--liquid-glass-shadow);
		color: var(--md-sys-color-on-surface-variant);
		cursor: pointer;
		transition:
			width 0.25s var(--motion-easing-standard),
			background 0.2s ease,
			border-color 0.2s ease;
	}

	.search-trigger:hover {
		background: rgba(140, 140, 145, 0.18);
		border-color: rgba(255, 255, 255, 0.3);
		color: var(--md-sys-color-on-surface);
	}

	.search-placeholder {
		font-size: 13px;
		font-weight: 400;
		color: var(--md-sys-color-on-surface-variant);
		flex: 1;
		text-align: left;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.cmd-badge {
		font-size: 11px;
		font-weight: 500;
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, sans-serif;
		padding: 2px 6px;
		border-radius: 5px;
		background: rgba(140, 140, 145, 0.16);
		border: 1px solid var(--glass-border);
		color: var(--md-sys-color-on-surface-variant);
		letter-spacing: 0.08em;
		line-height: 1.2;
	}

	.icon-btn:hover {
		background: rgba(140, 140, 145, 0.12);
		color: var(--md-sys-color-on-surface);
	}

	/* Mobile: hide desktop nav & desktop GitHub button, collapse search */
	@media (max-width: 768px) {
		.app-bar__inner {
			width: 100%;
			max-width: 100%;
			justify-content: space-between;
			padding-inline: max(14px, env(safe-area-inset-right, 0px));
		}
		.app-bar__actions {
			gap: 2px;
		}
		.menu-btn {
			margin-right: -4px;
		}
		.app-bar__nav,
		.github-btn-desktop {
			display: none !important;
		}
		.search-trigger {
			width: 36px;
			height: 36px;
			padding-inline: 0;
			justify-content: center;
		}
		.search-placeholder,
		.cmd-badge {
			display: none;
		}
		.logo-text {
			font-size: 15px;
		}
	}

	/* Desktop: hide hamburger */
	@media (min-width: 769px) {
		.menu-btn {
			display: none;
		}
	}
</style>
