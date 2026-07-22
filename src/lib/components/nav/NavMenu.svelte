<script lang="ts">
	import { page } from '$app/stores';

	const navLinks = [
		{ href: '/', label: 'Overview' },
		{ href: '/articles', label: 'Articles' },
		{ href: '/categories', label: 'Categories' },
		{ href: '/projects', label: 'Projects' },
		{ href: '/about', label: 'About' }
	];

	const pathname = $derived($page.url.pathname);

	function isActive(href: string): boolean {
		if (href === '/') return pathname === '/';
		return pathname.startsWith(href);
	}
</script>

<nav class="nav-island nav-island--menu" aria-label="Main navigation">
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

<style>
	.nav-island {
		display: flex;
		align-items: center;
		gap: 4px;
		height: 44px;
		padding: 4px 6px;
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

	.nav-link {
		position: relative;
		display: flex;
		align-items: center;
		padding: 6px 14px;
		height: 34px;
		border-radius: var(--md-sys-shape-corner-full);
		font-size: 13px;
		font-weight: 500;
		letter-spacing: -0.01em;
		color: var(--md-sys-color-on-surface-variant);
		text-decoration: none;
		white-space: nowrap;
		transition:
			background var(--motion-duration-short4) var(--motion-easing-standard),
			color var(--motion-duration-short4) var(--motion-easing-standard),
			transform 0.15s ease;
	}

	.nav-link:hover {
		color: var(--md-sys-color-on-surface);
		background: rgba(140, 140, 145, 0.14);
	}

	.nav-link.active {
		background: var(--md-sys-color-on-surface);
		color: var(--md-sys-color-background);
		font-weight: 600;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
	}

	@media (max-width: 768px) {
		.nav-island--menu {
			display: none;
		}
	}
</style>
