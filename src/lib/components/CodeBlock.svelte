<script lang="ts">
	interface Props {
		code: string;
		lang?: string;
		filename?: string;
	}

	let { code, lang = 'text', filename }: Props = $props();

	let copied = $state(false);

	async function copyCode() {
		try {
			await navigator.clipboard.writeText(code);
			copied = true;
			setTimeout(() => (copied = false), 2000);
		} catch {
			// fallback
		}
	}
</script>

<div class="code-block">
	<div class="code-header">
		<div class="code-meta">
			{#if filename}
				<span class="filename">
					<span class="material-symbols-rounded" style="font-size: 14px">description</span>
					{filename}
				</span>
			{/if}
			{#if lang && lang !== 'text'}
				<span class="lang-badge">{lang}</span>
			{/if}
		</div>
		<button class="copy-btn" onclick={copyCode} aria-label={copied ? 'Copied!' : 'Copy code'}>
			<span class="material-symbols-rounded" style="font-size: 16px">
				{copied ? 'check' : 'content_copy'}
			</span>
			{copied ? 'Copied!' : 'Copy'}
		</button>
	</div>
	<div class="code-content">
		<pre><code class="language-{lang}">{code}</code></pre>
	</div>
</div>

<style>
	.code-block {
		border-radius: var(--md-sys-shape-corner-large);
		overflow: hidden;
		border: 1px solid var(--md-sys-color-outline-variant);
		margin-block: 1.5rem;
	}

	.code-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--space-3) var(--space-4);
		background: var(--md-sys-color-surface-container-high);
		border-bottom: 1px solid var(--md-sys-color-outline-variant);
	}

	.code-meta {
		display: flex;
		align-items: center;
		gap: var(--space-3);
	}

	.filename {
		display: flex;
		align-items: center;
		gap: 4px;
		font-family: var(--font-mono);
		font-size: 13px;
		color: var(--md-sys-color-on-surface-variant);
	}

	.lang-badge {
		padding: 2px 8px;
		border-radius: var(--md-sys-shape-corner-full);
		background: var(--md-sys-color-primary-container);
		color: var(--md-sys-color-on-primary-container);
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.copy-btn {
		display: flex;
		align-items: center;
		gap: 4px;
		padding: 4px 10px;
		border-radius: var(--md-sys-shape-corner-full);
		border: 1px solid var(--md-sys-color-outline-variant);
		background: transparent;
		color: var(--md-sys-color-on-surface-variant);
		font-family: var(--font-body);
		font-size: 12px;
		cursor: pointer;
		transition:
			background var(--motion-duration-short4) var(--motion-easing-standard),
			color var(--motion-duration-short4) var(--motion-easing-standard),
			border-color var(--motion-duration-short4) var(--motion-easing-standard);
	}

	.copy-btn:hover {
		background: var(--md-sys-color-primary-container);
		color: var(--md-sys-color-on-primary-container);
		border-color: var(--md-sys-color-primary);
	}

	.code-content {
		overflow-x: auto;
		background: var(--md-sys-color-surface-container);
	}

	pre {
		padding: var(--space-5);
		margin: 0;
		font-family: var(--font-mono);
		font-size: 14px;
		line-height: 1.65;
		tab-size: 2;
	}

	code {
		font-family: var(--font-mono);
	}
</style>
