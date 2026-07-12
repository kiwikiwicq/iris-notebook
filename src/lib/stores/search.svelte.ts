/**
 * Search store – manages search overlay state and query/results.
 * Uses Svelte 5 runes.
 */

import type { Post } from '$lib/data/posts';

function createSearchStore() {
	let isOpen = $state(false);
	let query = $state('');
	let allPosts = $state<Post[]>([]);

	const results = $derived.by(() => {
		if (!query.trim() || query.length < 2) return [];
		const q = query.toLowerCase().trim();
		return allPosts
			.filter((post) => {
				return (
					post.title.toLowerCase().includes(q) ||
					post.description.toLowerCase().includes(q) ||
					post.tags.some((t) => t.toLowerCase().includes(q)) ||
					post.category.toLowerCase().includes(q)
				);
			})
			.slice(0, 8);
	});

	function open() {
		isOpen = true;
		// Allow DOM to update then focus
		if (typeof document !== 'undefined') {
			setTimeout(() => {
				const input = document.getElementById('search-input');
				input?.focus();
			}, 50);
		}
	}

	function close() {
		isOpen = false;
		query = '';
	}

	function setPosts(posts: Post[]) {
		allPosts = posts;
	}

	return {
		get isOpen() { return isOpen; },
		get query() { return query; },
		set query(v: string) { query = v; },
		get results() { return results; },
		open,
		close,
		setPosts
	};
}

export const searchStore = createSearchStore();
