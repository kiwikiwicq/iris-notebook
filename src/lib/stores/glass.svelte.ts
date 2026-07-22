/**
 * Glass store – manages fluid UI transparency percentage (0% = Liquid Glass, 100% = Opaque)
 * with real-time CSS variable interpolation and localStorage persistence using Svelte 5 runes.
 */

const STORAGE_KEY = 'iris-glass-opacity';

function createGlassStore() {
	let opacity = $state<number>(0);
	let initialized = $state(false);

	function getInitialOpacity(): number {
		if (typeof localStorage !== 'undefined') {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored !== null) {
				const num = parseInt(stored, 10);
				if (!isNaN(num)) return Math.max(0, Math.min(100, num));
			}
		}
		return 0; // Default to Liquid Glass (0%)
	}

	function applyOpacity(val: number) {
		if (typeof document === 'undefined') return;

		const clamped = Math.max(0, Math.min(100, val));
		const t = clamped / 100;
		const root = document.documentElement;

		root.style.setProperty('--glass-opacity-pct', `${clamped}%`);

		const isDark = root.getAttribute('data-theme') === 'dark';

		// Interpolate blur and saturation
		const blurPx = Math.round(30 * (1 - t));
		const saturatePct = Math.round(100 + 110 * (1 - t));

		if (blurPx <= 0) {
			root.style.setProperty('--liquid-blur', 'none');
		} else {
			root.style.setProperty('--liquid-blur', `blur(${blurPx}px) saturate(${saturatePct}%)`);
		}

		// Interpolate background opacity and border
		if (isDark) {
			const bgAlpha = (0.65 + 0.33 * t).toFixed(3);
			const borderAlpha = (0.14 + 0.04 * t).toFixed(3);
			root.style.setProperty('--liquid-glass-bg', `rgba(28, 28, 30, ${bgAlpha})`);
			root.style.setProperty('--liquid-glass-border', `rgba(255, 255, 255, ${borderAlpha})`);
		} else {
			const bgAlpha = (0.72 + 0.26 * t).toFixed(3);
			const borderAlpha = (0.6 - 0.48 * t).toFixed(3);
			root.style.setProperty('--liquid-glass-bg', `rgba(255, 255, 255, ${bgAlpha})`);
			root.style.setProperty('--liquid-glass-border', `rgba(255, 255, 255, ${borderAlpha})`);
		}
	}

	function init() {
		if (initialized) return;
		opacity = getInitialOpacity();
		initialized = true;
		applyOpacity(opacity);
	}

	function setOpacity(val: number) {
		opacity = Math.max(0, Math.min(100, val));
		applyOpacity(opacity);
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem(STORAGE_KEY, opacity.toString());
		}
	}

	function getLabel(val: number): string {
		if (val < 35) return 'Liquid Glass';
		if (val < 70) return 'Frosted Glass';
		return 'Opaque';
	}

	return {
		get opacity() {
			return opacity;
		},
		get label() {
			return getLabel(opacity);
		},
		get initialized() {
			return initialized;
		},
		init,
		setOpacity,
		applyOpacity
	};
}

export const glassStore = createGlassStore();
