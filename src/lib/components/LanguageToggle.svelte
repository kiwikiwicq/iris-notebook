<script lang="ts">
	import { languageStore, LANGUAGE_OPTIONS, type Language } from '$lib/stores/language.svelte';
	import SFIcon from './SFIcon.svelte';

	let isOpen = $state(false);
	let containerRef = $state<HTMLDivElement | null>(null);

	let currentLang = $derived(languageStore.currentLanguage);
	let currentOption = $derived(
		LANGUAGE_OPTIONS.find((opt) => opt.code === currentLang) || LANGUAGE_OPTIONS[0]
	);

	function toggleDropdown() {
		isOpen = !isOpen;
	}

	function selectLanguage(lang: Language) {
		languageStore.setLanguage(lang);
		isOpen = false;
	}

	$effect(() => {
		if (typeof window === 'undefined') return;

		const handlePointerDownOutside = (e: PointerEvent) => {
			if (isOpen && containerRef && !containerRef.contains(e.target as Node)) {
				isOpen = false;
			}
		};

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && isOpen) {
				isOpen = false;
			}
		};

		window.addEventListener('pointerdown', handlePointerDownOutside);
		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('pointerdown', handlePointerDownOutside);
			window.removeEventListener('keydown', handleKeyDown);
		};
	});
</script>

<div class="lang-toggle-container notranslate" translate="no" bind:this={containerRef}>
	<button
		class="lang-btn"
		class:active={isOpen}
		onclick={toggleDropdown}
		aria-expanded={isOpen}
		aria-haspopup="listbox"
		aria-label="Change language (Current: {currentOption.label})"
		title="Change language"
	>
		<SFIcon name="globe" size={15} />
		<span class="lang-code">{currentOption.code.toUpperCase()}</span>
	</button>

	{#if isOpen}
		<div
			class="lang-dropdown notranslate"
			translate="no"
			role="listbox"
			aria-label="Select language"
			tabindex="-1"
		>
			<div class="dropdown-header">
				<span>{languageStore.t.common.selectLanguage}</span>
			</div>
			<div class="dropdown-divider"></div>
			{#each LANGUAGE_OPTIONS as opt}
				<button
					class="lang-option"
					class:selected={opt.code === currentLang}
					role="option"
					aria-selected={opt.code === currentLang}
					onclick={() => selectLanguage(opt.code)}
				>
					<span class="flag">{opt.flag}</span>
					<span class="name">{opt.nativeName}</span>
					{#if opt.code === currentLang}
						<span class="check-icon">
							<SFIcon name="check" size={14} />
						</span>
					{/if}
				</button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.lang-toggle-container {
		position: relative;
		display: inline-block;
	}

	.lang-btn {
		display: flex;
		align-items: center;
		gap: 5px;
		height: 34px;
		padding-inline: 10px;
		border-radius: var(--md-sys-shape-corner-full);
		border: 1px solid transparent;
		background: transparent;
		color: var(--md-sys-color-on-surface-variant);
		font-size: 12.5px;
		font-weight: 600;
		cursor: pointer;
		letter-spacing: 0.02em;
		transition:
			background var(--motion-duration-short4) var(--motion-easing-standard),
			color var(--motion-duration-short4) var(--motion-easing-standard),
			transform 0.15s ease;
	}

	.lang-btn:hover,
	.lang-btn.active {
		background: rgba(140, 140, 145, 0.14);
		color: var(--md-sys-color-on-surface);
	}

	.lang-code {
		font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif;
	}

	.lang-dropdown {
		position: absolute;
		top: calc(100% + 8px);
		right: 0;
		z-index: 200;
		min-width: 170px;
		padding: 6px;
		border-radius: 16px;
		background: var(--liquid-glass-bg);
		backdrop-filter: var(--liquid-blur);
		-webkit-backdrop-filter: var(--liquid-blur);
		border: 1px solid var(--liquid-glass-border);
		box-shadow: var(--liquid-glass-shadow);
		display: flex;
		flex-direction: column;
		gap: 2px;
		animation: popover-in 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
		transform-origin: top right;
	}

	.dropdown-header {
		padding: 6px 10px 4px;
		font-size: 11px;
		font-weight: 600;
		color: var(--md-sys-color-on-surface-variant);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		opacity: 0.8;
	}

	.dropdown-divider {
		height: 1px;
		background: var(--liquid-glass-border);
		margin-block: 2px 4px;
	}

	.lang-option {
		display: flex;
		align-items: center;
		gap: 10px;
		width: 100%;
		padding: 8px 10px;
		border-radius: 10px;
		border: none;
		background: transparent;
		color: var(--md-sys-color-on-surface-variant);
		font-size: 13.5px;
		font-weight: 500;
		cursor: pointer;
		text-align: left;
		transition:
			background 0.15s ease,
			color 0.15s ease;
	}

	.lang-option:hover {
		background: rgba(140, 140, 145, 0.15);
		color: var(--md-sys-color-on-surface);
	}

	.lang-option.selected {
		background: rgba(103, 80, 164, 0.15);
		color: var(--md-sys-color-on-surface);
		font-weight: 600;
	}

	.flag {
		font-size: 15px;
		line-height: 1;
	}

	.name {
		flex: 1;
		white-space: nowrap;
	}

	.check-icon {
		color: var(--md-sys-color-primary, #6750a4);
		display: flex;
		align-items: center;
	}

	@media (max-width: 768px) {
		.lang-btn {
			width: 32px;
			height: 32px;
			padding-inline: 0;
			justify-content: center;
			gap: 0;
		}

		.lang-code {
			display: none;
		}

		.lang-dropdown {
			right: -40px;
		}
	}

	@keyframes popover-in {
		from {
			opacity: 0;
			transform: scale(0.92) translateY(-6px);
		}
		to {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
	}
</style>
