<script lang="ts">
	import SFIcon from './SFIcon.svelte';

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

<div class="code-block liquid-glass">
	<div class="code-header">
		<div class="code-meta">
			{#if filename}
				<span class="filename">
					<SFIcon name="articles" size={13} />
					<span>{filename}</span>
				</span>
			{/if}
			{#if lang && lang !== 'text'}
				<span class="lang-badge">{lang}</span>
			{/if}
		</div>
		<button class="copy-btn" class:copied onclick={copyCode} aria-label={copied ? 'Copied!' : 'Copy code'}>
			<SFIcon name={copied ? 'check' : 'copy'} size={13} color={copied ? 'var(--apple-green)' : 'currentColor'} />
			<span>{copied ? 'Copied!' : 'Copy'}</span>
		</button>
	</div>
	<div class="code-content">
		<pre><code class="language-{lang}">{code}</code></pre>
	</div>
</div>

<style>
	.code-block {
		border-radius: 16px;
		overflow: hidden;
		margin-block: 1.5rem;
		position: relative;
	}

	.code-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--space-3) var(--space-4);
		background: rgba(140, 140, 145, 0.1);
		border-bottom: 1px solid var(--glass-border);
	}

	.code-meta {
		display: flex;
		align-items: center;
		gap: var(--space-2);
	}

	.filename {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--md-sys-color-on-surface-variant);
	}

	.lang-badge {
		font-family: var(--font-mono);
		font-size: 11px;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		padding: 2px 6px;
		border-radius: 4px;
		background: rgba(140, 140, 145, 0.14);
		color: var(--md-sys-color-on-surface-variant);
	}

	.copy-btn {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 4px 10px;
		border-radius: 6px;
		border: 1px solid var(--glass-border);
		background: rgba(140, 140, 145, 0.12);
		color: var(--md-sys-color-on-surface-variant);
		font-family: var(--font-body);
		font-size: 12px;
		font-weight: 500;
		cursor: pointer;
		transition: background 0.2s ease, color 0.2s ease;
	}

	.copy-btn:hover {
		background: rgba(140, 140, 145, 0.22);
		color: var(--md-sys-color-on-surface);
	}

	.copy-btn.copied {
		background: rgba(48, 209, 88, 0.15);
		border-color: var(--apple-green);
		color: var(--md-sys-color-on-surface);
	}

	.code-content {
		padding: var(--space-4);
		overflow-x: auto;
		background: rgba(0, 0, 0, 0.2);
	}

	.code-content pre {
		margin: 0;
		font-family: var(--font-mono);
		font-size: 13px;
		line-height: 1.6;
		color: var(--md-sys-color-on-surface);
	}
</style>
