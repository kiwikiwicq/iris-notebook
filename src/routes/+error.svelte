<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.status} – Iris Notebook</title>
</svelte:head>

<main class="error-page">
	<div class="container">
		<div class="error-content">
			<span class="material-symbols-rounded error-icon">
				{$page.status === 404 ? 'travel_explore' : 'warning'}
			</span>
			<h1 class="display-medium error-code">{$page.status}</h1>
			<h2 class="headline-small error-title">
				{$page.status === 404 ? 'Page not found' : 'Something went wrong'}
			</h2>
			<p class="body-large error-message">
				{$page.error?.message || 'We could not find what you were looking for.'}
			</p>
			
			<div class="actions">
				<a href="/" class="btn-primary">
					<span class="material-symbols-rounded">home</span>
					Return to Home
				</a>
				<button class="btn-outlined-primary" onclick={() => window.history.back()}>
					<span class="material-symbols-rounded">arrow_back</span>
					Go Back
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
		max-width: 600px;
		margin: 0 auto;
		background: var(--md-sys-color-surface-container-low);
		padding: var(--space-12) var(--space-8);
		border-radius: var(--md-sys-shape-corner-extra-large);
		border: 1px solid var(--md-sys-color-outline-variant);
		box-shadow: var(--card-shadow-resting);
	}

	.error-icon {
		font-size: 72px;
		color: var(--md-sys-color-primary);
		margin-bottom: var(--space-4);
		opacity: 0.9;
	}

	.error-code {
		font-weight: 800;
		background: linear-gradient(135deg, var(--md-sys-color-primary), var(--md-sys-color-tertiary));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: var(--space-2);
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
		gap: var(--space-4);
		flex-wrap: wrap;
		justify-content: center;
	}

	.btn-primary {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: 12px 28px;
		border-radius: var(--shape-button);
		background: var(--md-sys-color-primary);
		color: var(--md-sys-color-on-primary);
		font-size: 14px;
		font-weight: 600;
		text-decoration: none;
		transition:
			background var(--motion-duration-short4) var(--motion-easing-standard),
			transform var(--motion-duration-short4) var(--motion-easing-standard);
	}

	.btn-primary:hover {
		background: var(--md-sys-color-primary-container);
		color: var(--md-sys-color-on-primary-container);
		transform: translateY(-2px);
	}

	.btn-outlined-primary {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: 12px 28px;
		border-radius: var(--shape-button);
		border: 1.5px solid var(--md-sys-color-primary);
		color: var(--md-sys-color-primary);
		font-size: 14px;
		font-weight: 600;
		background: transparent;
		cursor: pointer;
		font-family: var(--font-body);
		transition:
			background var(--motion-duration-short4) var(--motion-easing-standard),
			transform var(--motion-duration-short4) var(--motion-easing-standard);
	}

	.btn-outlined-primary:hover {
		background: var(--md-sys-color-primary-container);
		color: var(--md-sys-color-on-primary-container);
		transform: translateY(-2px);
	}
</style>
