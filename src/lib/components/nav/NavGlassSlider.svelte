<script lang="ts">
	import { glassStore } from '$lib/stores/glass.svelte';

	let value = $state(glassStore.opacity);

	$effect(() => {
		value = glassStore.opacity;
	});

	function handleInput(e: Event) {
		const target = e.target as HTMLInputElement;
		const val = parseInt(target.value, 10);
		value = val;
		glassStore.setOpacity(val);
	}
</script>

<div class="nav-island nav-island--glass-slider" title={`Glass opacity: ${value}%`}>
	<!-- Translucent / Clear Layers Icon (Left) -->
	<svg
		class="glass-icon"
		width="17"
		height="17"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="1.8"
		stroke-linecap="round"
		stroke-linejoin="round"
		aria-hidden="true"
	>
		<rect x="3" y="7" width="13" height="13" rx="3.5" opacity="0.5" />
		<rect x="8" y="3" width="13" height="13" rx="3.5" />
	</svg>

	<div class="slider-wrapper">
		<input
			type="range"
			min="0"
			max="100"
			step="1"
			{value}
			oninput={handleInput}
			aria-label="Adjust interface glass opacity (0% to 100%)"
			class="glass-range-input"
			style="--slider-pct: {value}%"
		/>
	</div>

	<!-- Solid / Opaque Layers Icon (Right) -->
	<svg
		class="glass-icon solid"
		width="17"
		height="17"
		viewBox="0 0 24 24"
		aria-hidden="true"
	>
		<rect x="3" y="7" width="13" height="13" rx="3.5" fill="currentColor" opacity="0.4" />
		<rect x="8" y="3" width="13" height="13" rx="3.5" fill="currentColor" />
	</svg>
</div>

<style>
	.nav-island {
		display: flex;
		align-items: center;
		gap: 10px;
		height: 44px;
		padding: 4px 14px;
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
		user-select: none;
	}

	.nav-island:hover {
		border-color: rgba(255, 255, 255, 0.3);
	}

	.glass-icon {
		color: var(--md-sys-color-on-surface-variant);
		flex-shrink: 0;
		transition: color 0.2s ease;
	}

	.nav-island:hover .glass-icon {
		color: var(--md-sys-color-on-surface);
	}

	.slider-wrapper {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 110px;
	}

	.glass-range-input {
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		height: 5px;
		border-radius: 9999px;
		background: rgba(140, 140, 145, 0.25);
		outline: none;
		cursor: pointer;
		margin: 0;
		transition: background 0.15s ease;
	}

	/* WebKit Thumb - Apple Squircle Capsule Knob */
	.glass-range-input::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 20px;
		height: 15px;
		border-radius: 6.5px;
		background: #ffffff;
		box-shadow:
			inset 0 1px 0.5px rgba(255, 255, 255, 0.9),
			0 2px 5px rgba(0, 0, 0, 0.35);
		cursor: pointer;
		transition:
			transform 0.15s ease,
			box-shadow 0.15s ease;
	}

	.glass-range-input::-webkit-slider-thumb:hover {
		transform: scale(1.08);
		box-shadow:
			inset 0 1px 0.5px rgba(255, 255, 255, 1),
			0 3px 8px rgba(0, 0, 0, 0.45);
	}

	.glass-range-input::-webkit-slider-thumb:active {
		transform: scale(0.94);
	}

	/* Firefox Thumb */
	.glass-range-input::-moz-range-thumb {
		width: 20px;
		height: 15px;
		border: none;
		border-radius: 6.5px;
		background: #ffffff;
		box-shadow:
			inset 0 1px 0.5px rgba(255, 255, 255, 0.9),
			0 2px 5px rgba(0, 0, 0, 0.35);
		cursor: pointer;
		transition: transform 0.15s ease;
	}

	@media (max-width: 1024px) {
		.slider-wrapper {
			width: 90px;
		}
	}

	@media (max-width: 768px) {
		.nav-island--glass-slider {
			display: none;
		}
	}
</style>
