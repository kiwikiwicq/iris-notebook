<script lang="ts">
	import SFIcon from '../SFIcon.svelte';
</script>

<a href="/" class="nav-island nav-island--brand" aria-label="Iris Notebook – Home">
	<div class="logo-badge">
		<SFIcon name="code" size={15} color="var(--md-sys-color-on-surface)" />
	</div>
	<span class="logo-text">Iris Notebook</span>
</a>

<style>
	.nav-island {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		height: 44px;
		padding-inline: 14px;
		border-radius: var(--md-sys-shape-corner-full);
		background: var(--liquid-glass-bg);
		backdrop-filter: var(--liquid-blur);
		-webkit-backdrop-filter: var(--liquid-blur);
		border: 1px solid var(--liquid-glass-border);
		box-shadow: var(--liquid-glass-shadow);
		text-decoration: none;
		color: var(--md-sys-color-on-surface);
		transition:
			transform 0.25s var(--motion-easing-standard),
			box-shadow 0.25s var(--motion-easing-standard),
			background-color 0.25s var(--motion-easing-standard),
			border-color 0.25s var(--motion-easing-standard);
		pointer-events: auto;
	}

	.nav-island:hover {
		transform: translateY(-1px);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
		border-color: rgba(255, 255, 255, 0.3);
	}

	.logo-badge {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		background: rgba(140, 140, 145, 0.15);
		border: 1px solid var(--glass-border);
		border-radius: 50%;
		color: var(--md-sys-color-on-surface);
		transition: transform 0.25s var(--motion-easing-standard);
	}

	.nav-island:hover .logo-badge {
		transform: scale(1.08) rotate(-4deg);
	}

	.logo-text {
		font-size: 15px;
		font-weight: 600;
		letter-spacing: -0.02em;
		color: var(--md-sys-color-on-surface);
		white-space: nowrap;
	}

	@media (max-width: 768px) {
		.nav-island {
			height: 40px;
			padding-inline: 12px;
		}
		.logo-text {
			font-size: 14px;
		}
	}
</style>
