<script lang="ts">
	interface Props {
		isOpen: boolean;
		onClose: () => void;
	}

	let { isOpen, onClose }: Props = $props();

	const navLinks = [
		{ href: '/', label: 'Home', icon: 'home' },
		{ href: '/articles', label: 'Articles', icon: 'article' },
		{ href: '/categories', label: 'Categories', icon: 'category' },
		{ href: '/projects', label: 'Projects', icon: 'code_blocks' },
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
			<span class="material-symbols-rounded">close</span>
		</button>
	</div>

	<hr class="divider" />

	<ul class="drawer__nav">
		{#each navLinks as link, i}
			<li style="--delay: {i * 40}ms" class:animated={isOpen}>
				<a href={link.href} class="drawer-link" onclick={onClose}>
					<span class="material-symbols-rounded">{link.icon}</span>
					<span>{link.label}</span>
				</a>
			</li>
		{/each}
	</ul>

	<div class="drawer__footer">
		<a href="https://github.com/kiwikiwicq" class="drawer-link" target="_blank" rel="noopener noreferrer">
			<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
				<path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
			</svg>
			<span>GitHub</span>
		</a>
	</div>
</nav>

<style>
	.scrim {
		position: fixed;
		inset: 0;
		z-index: 149;
		background: rgba(0, 0, 0, 0.32);
		backdrop-filter: blur(2px);
		animation: fade-in var(--motion-duration-medium1) var(--motion-easing-standard) both;
	}

	.drawer {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		z-index: 150;
		width: min(320px, 85vw);
		background: var(--md-sys-color-surface-container-low);
		display: flex;
		flex-direction: column;
		transform: translateX(-100%);
		transition: transform var(--motion-duration-medium3) var(--motion-easing-emphasized-decelerate);
		box-shadow: var(--md-sys-elevation-5);
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

	.logo-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		background: var(--md-sys-color-primary-container);
		border-radius: var(--md-sys-shape-corner-medium);
		color: var(--md-sys-color-on-primary-container);
	}

	.logo-icon .material-symbols-rounded { font-size: 18px; }

	.logo-text {
		font-size: 16px;
		font-weight: 600;
		color: var(--md-sys-color-on-surface);
	}

	.close-btn {
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
	}

	.close-btn:hover {
		background: color-mix(in srgb, var(--md-sys-color-on-surface) 8%, transparent);
	}

	.divider {
		height: 1px;
		background: var(--md-sys-color-outline-variant);
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
		gap: var(--space-4);
		padding: var(--space-4) var(--space-4);
		border-radius: var(--md-sys-shape-corner-full);
		text-decoration: none;
		color: var(--md-sys-color-on-surface-variant);
		font-size: 14px;
		font-weight: 500;
		letter-spacing: 0.1px;
		transition: background var(--motion-duration-short4) var(--motion-easing-standard),
		            color var(--motion-duration-short4) var(--motion-easing-standard);
	}

	.drawer-link:hover {
		background: color-mix(in srgb, var(--md-sys-color-on-surface) 8%, transparent);
		color: var(--md-sys-color-on-surface);
	}

	.drawer__footer {
		padding: var(--space-3);
		border-top: 1px solid var(--md-sys-color-outline-variant);
		padding-bottom: calc(var(--space-5) + env(safe-area-inset-bottom, 0));
	}
</style>
