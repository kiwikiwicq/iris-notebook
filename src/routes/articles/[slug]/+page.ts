import { error } from '@sveltejs/kit';
import { getPublishedPosts } from '$lib/data/posts';

export const prerender = true;

// Tell SvelteKit which slugs to pre-render
export function entries() {
	return getPublishedPosts().map((post) => ({ slug: post.slug }));
}

export async function load({ params }) {
	const { slug } = params;

	// Validate slug format to prevent malicious inputs
	if (!/^[a-z0-9-]+$/.test(slug)) {
		error(400, 'Invalid article slug format');
	}

	const posts = import.meta.glob('/src/content/posts/*.{md,svx,mdx}');

	// Find the matching file path for the given slug
	const match = Object.keys(posts).find((path) => {
		const filename = path.split('/').pop()?.split('.')[0];
		return filename === slug;
	});

	if (!match) {
		error(404, `Could not find post with slug: ${slug}`);
	}

	// Load the component and metadata
	const post = (await posts[match]()) as any;

	return {
		slug,
		component: post.default,
		meta: post.metadata
	};
}
