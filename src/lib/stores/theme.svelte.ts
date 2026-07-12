/**
 * Theme store – manages dark/light mode with system-preference detection
 * and localStorage persistence. Uses Svelte 5 runes.
 */

const STORAGE_KEY = 'iris-theme';

function createThemeStore() {
	// Detect initial preference (runs server-side too, defaults to 'light')
	function getInitialTheme(): 'light' | 'dark' {
		if (typeof localStorage !== 'undefined') {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored === 'dark' || stored === 'light') return stored;
		}
		if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			return 'dark';
		}
		return 'light';
	}

	let theme = $state<'light' | 'dark'>('light');
	let initialized = $state(false);

	function init() {
		if (initialized) return;
		theme = getInitialTheme();
		initialized = true;
		applyTheme(theme);

		// Listen for OS-level changes
		if (typeof window !== 'undefined') {
			window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
				if (!localStorage.getItem(STORAGE_KEY)) {
					theme = e.matches ? 'dark' : 'light';
					applyTheme(theme);
				}
			});
		}
	}

	function applyTheme(t: 'light' | 'dark') {
		if (typeof document !== 'undefined') {
			document.documentElement.setAttribute('data-theme', t);
			const metaThemeColor = document.getElementById('theme-color-meta');
			if (metaThemeColor) {
				metaThemeColor.setAttribute('content', t === 'dark' ? '#1C1B1F' : '#6750A4');
			}
		}
	}

	function toggle() {
		theme = theme === 'light' ? 'dark' : 'light';
		applyTheme(theme);
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem(STORAGE_KEY, theme);
		}
	}

	function set(t: 'light' | 'dark') {
		theme = t;
		applyTheme(t);
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem(STORAGE_KEY, t);
		}
	}

	return {
		get theme() { return theme; },
		get isDark() { return theme === 'dark'; },
		get initialized() { return initialized; },
		init,
		toggle,
		set
	};
}

export const themeStore = createThemeStore();
