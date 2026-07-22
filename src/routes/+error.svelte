<script lang="ts">
	import { page } from '$app/stores';
	import SFIcon from '$lib/components/SFIcon.svelte';
</script>

<svelte:head>
	<title>{$page.status} — Iris Notebook</title>
</svelte:head>

<main class="error-page">
	<div class="container">
		<div class="error-content liquid-glass">
			<div class="error-icon-wrap">
				<SFIcon name="search" size={36} />
			</div>
			<h1 class="display-medium error-code">{$page.status}</h1>
			<h2 class="headline-small error-title">
				{$page.status === 404 ? 'Page not found' : 'Something went wrong'}
			</h2>
			<p class="body-large error-message">
				{$page.error?.message || 'We could not find what you were looking for.'}
			</p>
			
			<div class="actions">
				<a href="/" class="btn-primary">
					<SFIcon name="articles" size={15} color="var(--md-sys-color-surface)" />
					<span>Return to Home</span>
				</a>
				<button class="btn-outlined" onclick={() => window.history.back()}>
					<SFIcon name="arrowRight" size={15} class="icon-flip" />
					<span>Go Back</span>
				</button>
			</div>
		</div>
	</div>
</main>

<style>
	.error-page {
		min-height: calc(100vh - var(--nav-height) - 100px);
		display: flex;
		align-items: center;
		justify-content: center;
		padding-block: var(--space-12);
	}

	.error-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		max-width: 560px;
		margin: 0 auto;
		padding: var(--space-12) var(--space-8);
		border-radius: 28px;
	}

	.error-icon-wrap {
		width: 64px;
		height: 64px;
		border-radius: 50%;
		background: rgba(140, 140, 145, 0.16);
		border: 1px solid var(--glass-border);
		color: var(--md-sys-color-on-surface);
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: var(--space-4);
	}

	.error-code {
		font-weight: 800;
		color: var(--md-sys-color-on-surface);
		margin-bottom: var(--space-2);
		letter-spacing: -0.03em;
	}

	.error-title {
		color: var(--md-sys-color-on-surface);
		margin-bottom: var(--space-4);
		font-weight: 600;
	}

	.error-message {
		color: var(--md-sys-color-on-surface-variant);
		margin-bottom: var(--space-8);
	}

	.actions {
		display: flex;
		gap: var(--space-3);
		flex-wrap: wrap;
		justify-content: center;
	}

	.btn-primary {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 11px 22px;
		border-radius: var(--md-sys-shape-corner-full);
		background: var(--md-sys-color-on-surface);
		color: var(--md-sys-color-surface);
		font-size: 14px;
		font-weight: 600;
		text-decoration: none;
		transition: opacity 0.2s ease;
	}

	.btn-primary:hover {
		opacity: 0.92;
	}

	.btn-outlined {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 11px 22px;
		border-radius: var(--md-sys-shape-corner-full);
		border: 1px solid var(--glass-border);
		background: rgba(140, 140, 145, 0.1);
		color: var(--md-sys-color-on-surface);
		font-size: 14px;
		font-weight: 500;
		cursor: pointer;
		font-family: var(--font-body);
		transition: background 0.2s ease;
	}

	.btn-outlined:hover {
		background: rgba(140, 140, 145, 0.2);
	}
</style>
