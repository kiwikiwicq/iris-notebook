<script lang="ts">
	import { themeStore } from '$lib/stores/theme.svelte';
	import { searchStore } from '$lib/stores/search.svelte';
	import { page } from '$app/stores';
	import ThemeToggle from './ThemeToggle.svelte';
	import SearchBar from './SearchBar.svelte';

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
		{ href: '/', label: 'Home', icon: 'home' },
		{ href: '/articles', label: 'Articles', icon: 'article' },
		{ href: '/categories', label: 'Categories', icon: 'category' },
		{ href: '/projects', label: 'Projects', icon: 'code_blocks' },
		{ href: '/about', label: 'About', icon: 'person' }
	];

	function isActive(href: string): boolean {
		if (href === '/') return pathname === '/';
		return pathname.startsWith(href);
	}
</script>

<header class="app-bar" class:scrolled aria-label="Site navigation">
	<div class="app-bar__inner container">
		<!-- Logo -->
		<a href="/" class="app-bar__logo" aria-label="Iris Notebook – home">
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
				class="icon-btn"
				onclick={() => searchStore.open()}
				aria-label="Search articles (Ctrl+K)"
				title="Search (Ctrl+K)"
			>
				<span class="material-symbols-rounded">search</span>
			</button>

			<ThemeToggle />

			<a
				href="https://github.com/kiwikiwicq"
				class="icon-btn"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Visit GitHub profile"
				title="GitHub"
			>
				<svg class="github-icon" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
					<path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
				</svg>
			</a>

			<!-- Mobile menu button -->
			<button class="icon-btn menu-btn" onclick={onMenuClick} aria-label="Open navigation menu">
				<span class="material-symbols-rounded">menu</span>
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
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border-bottom: 1px solid transparent;
		transition:
			border-color var(--motion-duration-medium1) var(--motion-easing-standard),
			box-shadow var(--motion-duration-medium1) var(--motion-easing-standard);
	}

	.app-bar.scrolled {
		border-color: var(--md-sys-color-outline-variant);
		box-shadow: var(--md-sys-elevation-1);
	}

	.app-bar__inner {
		display: flex;
		align-items: center;
		height: 100%;
		gap: var(--space-6);
	}

	/* Logo */
	.app-bar__logo {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		text-decoration: none;
		color: var(--md-sys-color-on-surface);
		flex-shrink: 0;
	}

	.logo-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		background: var(--md-sys-color-primary-container);
		border-radius: var(--md-sys-shape-corner-medium);
		color: var(--md-sys-color-on-primary-container);
		transition: transform var(--motion-duration-medium1) var(--motion-easing-standard);
	}

	.logo-icon .material-symbols-rounded {
		font-size: 20px;
	}

	.app-bar__logo:hover .logo-icon {
		transform: rotate(-10deg) scale(1.08);
	}

	.logo-text {
		font-size: 18px;
		font-weight: 600;
		letter-spacing: -0.3px;
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
		padding: var(--space-2) var(--space-3);
		border-radius: var(--md-sys-shape-corner-full);
		font-size: 14px;
		font-weight: 500;
		letter-spacing: 0.1px;
		color: var(--md-sys-color-on-surface-variant);
		text-decoration: none;
		transition:
			background var(--motion-duration-short4) var(--motion-easing-standard),
			color var(--motion-duration-short4) var(--motion-easing-standard);
	}

	.nav-link:hover {
		background: color-mix(in srgb, var(--md-sys-color-on-surface) 8%, transparent);
		color: var(--md-sys-color-on-surface);
	}

	.nav-link.active {
		background: var(--md-sys-color-secondary-container);
		color: var(--md-sys-color-on-secondary-container);
		font-weight: 600;
	}

	/* Actions */
	.app-bar__actions {
		display: flex;
		align-items: center;
		gap: var(--space-1);
		flex-shrink: 0;
	}

	.icon-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border-radius: var(--md-sys-shape-corner-full);
		border: none;
		background: transparent;
		color: var(--md-sys-color-on-surface-variant);
		cursor: pointer;
		transition:
			background var(--motion-duration-short4) var(--motion-easing-standard),
			color var(--motion-duration-short4) var(--motion-easing-standard);
		text-decoration: none;
	}

	.icon-btn:hover {
		background: color-mix(in srgb, var(--md-sys-color-on-surface) 8%, transparent);
		color: var(--md-sys-color-on-surface);
	}

	.icon-btn:active {
		background: color-mix(in srgb, var(--md-sys-color-on-surface) 12%, transparent);
	}

	.github-icon {
		width: 20px;
		height: 20px;
	}

	/* Mobile: hide desktop nav */
	@media (max-width: 768px) {
		.app-bar__nav {
			display: none;
		}
	}

	/* Desktop: hide hamburger */
	@media (min-width: 769px) {
		.menu-btn {
			display: none;
		}
	}
</style>
