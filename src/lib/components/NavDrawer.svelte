<script lang="ts">
	import SFIcon from './SFIcon.svelte';
	import NavGlassSlider from './nav/NavGlassSlider.svelte';

	interface Props {
		isOpen: boolean;
		onClose: () => void;
	}

	let { isOpen, onClose }: Props = $props();

	const navLinks: { href: string; label: string; icon: 'articles' | 'categories' | 'projects' | 'person' }[] = [
		{ href: '/', label: 'Overview', icon: 'articles' },
		{ href: '/articles', label: 'Articles', icon: 'articles' },
		{ href: '/categories', label: 'Categories', icon: 'categories' },
		{ href: '/projects', label: 'Projects', icon: 'projects' },
		{ href: '/about', label: 'About', icon: 'person' }
	];

	$effect(() => {
		if (typeof document === 'undefined') return;
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	});

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') onClose();
	}
</script>

<!-- Scrim -->
{#if isOpen}
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<div
		class="scrim"
		role="presentation"
		onclick={onClose}
		onkeydown={handleKeydown}
		aria-hidden="true"
	></div>
{/if}

<!-- Drawer -->
<nav
	class="drawer"
	class:open={isOpen}
	aria-label="Mobile navigation"
	aria-hidden={!isOpen}
	onkeydown={handleKeydown}
>
	<div class="drawer__header">
		<div class="drawer__logo">
			<span class="logo-text">Iris Notebook</span>
		</div>
		<button class="close-btn" onclick={onClose} aria-label="Close navigation">
			<SFIcon name="close" size={16} />
		</button>
	</div>

	<hr class="divider" />

	<ul class="drawer__nav">
		{#each navLinks as link, i}
			<li style="--delay: {i * 40}ms" class:animated={isOpen}>
				<a href={link.href} class="drawer-link" onclick={onClose}>
					<SFIcon name={link.icon} size={18} />
					<span>{link.label}</span>
				</a>
			</li>
		{/each}
	</ul>

	<div class="drawer__footer">
		<div class="mobile-glass-control">
			<span class="control-label">Glass Style</span>
			<NavGlassSlider />
		</div>
		<a href="https://github.com/kiwikiwicq" class="drawer-link" target="_blank" rel="noopener noreferrer">
			<SFIcon name="github" size={18} />
			<span>GitHub</span>
		</a>
	</div>
</nav>

<style>
	.scrim {
		position: fixed;
		inset: 0;
		z-index: 149;
		background: rgba(0, 0, 0, 0.45);
		backdrop-filter: var(--liquid-blur);
		-webkit-backdrop-filter: var(--liquid-blur);
		animation: fade-in var(--motion-duration-medium1) var(--motion-easing-standard) both;
	}

	.drawer {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		z-index: 150;
		width: min(300px, 85vw);
		background: var(--liquid-glass-bg);
		backdrop-filter: var(--liquid-blur);
		-webkit-backdrop-filter: var(--liquid-blur);
		border-right: 1px solid var(--liquid-glass-border);
		box-shadow: var(--liquid-glass-shadow);
		display: flex;
		flex-direction: column;
		transform: translateX(-100%);
		transition: transform var(--motion-duration-medium3) var(--motion-easing-emphasized-decelerate);
	}

	.drawer.open {
		transform: translateX(0);
	}

	.drawer__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--space-5) var(--space-5) var(--space-4);
		padding-top: calc(var(--space-5) + env(safe-area-inset-top, 0));
	}

	.drawer__logo {
		display: flex;
		align-items: center;
		gap: var(--space-2);
	}

	.logo-text {
		font-size: 16px;
		font-weight: 600;
		color: var(--md-sys-color-on-surface);
	}

	.close-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		border-radius: var(--md-sys-shape-corner-full);
		border: 1px solid var(--glass-border);
		background: rgba(140, 140, 145, 0.1);
		color: var(--md-sys-color-on-surface-variant);
		cursor: pointer;
	}

	.close-btn:hover {
		background: rgba(140, 140, 145, 0.2);
		color: var(--md-sys-color-on-surface);
	}

	.divider {
		height: 1px;
		background: var(--glass-border);
		border: none;
		margin-inline: var(--space-4);
		margin-block: 0;
	}

	.drawer__nav {
		list-style: none;
		padding: var(--space-3);
		flex: 1;
	}

	.drawer__nav li.animated {
		animation: slide-right var(--motion-duration-medium2) var(--motion-easing-emphasized-decelerate) var(--delay, 0ms) both;
	}

	.drawer-link {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 10px 14px;
		border-radius: var(--md-sys-shape-corner-full);
		text-decoration: none;
		color: var(--md-sys-color-on-surface-variant);
		font-size: 14px;
		font-weight: 500;
		letter-spacing: -0.01em;
		transition: background var(--motion-duration-short4) var(--motion-easing-standard),
		            color var(--motion-duration-short4) var(--motion-easing-standard);
	}

	.drawer-link:hover {
		background: rgba(140, 140, 145, 0.12);
		color: var(--md-sys-color-on-surface);
	}

	.drawer__footer {
		padding: var(--space-3);
		border-top: 1px solid var(--glass-border);
		padding-bottom: calc(var(--space-5) + env(safe-area-inset-bottom, 0));
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.mobile-glass-control {
		display: flex;
		flex-direction: column;
		gap: 6px;
		padding: 4px 6px 8px;
	}

	.control-label {
		font-size: 11.5px;
		font-weight: 500;
		color: var(--md-sys-color-on-surface-variant);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.mobile-glass-control :global(.nav-island--glass-slider) {
		display: flex !important;
		width: 100%;
		justify-content: space-between;
	}
</style>
