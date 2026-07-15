/**
 * Bookmarks store – persists article slugs to localStorage.
 * Uses Svelte 5 runes.
 */

const STORAGE_KEY = 'iris-bookmarks';

function createBookmarksStore() {
	let slugs = $state<string[]>([]);
	let initialized = $state(false);

	function init() {
		if (initialized || typeof localStorage === 'undefined') return;
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			slugs = raw ? JSON.parse(raw) : [];
		} catch {
			slugs = [];
		}
		initialized = true;
	}

	function save() {
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
		}
	}

	function toggle(slug: string) {
		if (slugs.includes(slug)) {
			slugs = slugs.filter((s) => s !== slug);
		} else {
			slugs = [...slugs, slug];
		}
		save();
	}

	function isBookmarked(slug: string): boolean {
		return slugs.includes(slug);
	}

	function clear() {
		slugs = [];
		save();
	}

	return {
		get slugs() { return slugs; },
		get count() { return slugs.length; },
		init,
		toggle,
		isBookmarked,
		clear
	};
}

export const bookmarksStore = createBookmarksStore();
