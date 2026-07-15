export interface Post {
	slug: string;
	title: string;
	description: string;
	date: string;
	updatedDate?: string;
	category: string;
	tags: string[];
	readingTime: number;
	image: string;
	imageAlt: string;
	author: string;
	published: boolean;
	featured?: boolean;
}

// Load all markdown files from src/content/posts
const markdownFiles = import.meta.glob('/src/content/posts/*.{md,mdx,svx}', { eager: true });

/** Estimate reading time from the compiled HTML or raw content string. */
function computeReadingTime(resolver: any): number {
	const WPM = 238;
	// mdsvex exposes the compiled HTML via .html (some versions) or we fall back to metadata
	const html: string = resolver.html ?? '';
	if (html) {
		// Strip HTML tags to get plain text word count
		const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
		const words = text.split(' ').filter(Boolean).length;
		return Math.max(1, Math.round(words / WPM));
	}
	return resolver.metadata?.readingTime ?? 5;
}

export const posts: Post[] = Object.entries(markdownFiles)
	.map(([path, resolver]: [string, any]) => {
		// Extract frontmatter metadata from the module
		const metadata = resolver.metadata || {};

		// Get slug from filename
		const slug = path.split('/').pop()?.split('.')[0] || '';

		// Ensure date is a valid string for localeCompare
		let safeDate = new Date().toISOString().split('T')[0];
		if (typeof metadata.date === 'string' && !isNaN(Date.parse(metadata.date))) {
			safeDate = metadata.date;
		}

		// Ensure tags is always an array
		let safeTags: string[] = [];
		if (Array.isArray(metadata.tags)) {
			safeTags = metadata.tags;
		} else if (typeof metadata.tags === 'string') {
			safeTags = metadata.tags.split(',').map((t: string) => t.trim());
		}

		return {
			slug,
			title: metadata.title || 'Untitled',
			description: metadata.description || '',
			date: safeDate,
			updatedDate: metadata.updatedDate,
			category: metadata.category || 'Uncategorized',
			tags: safeTags,
			readingTime: computeReadingTime(resolver),
			image: metadata.image || `/images/categories/${(metadata.category || 'programming').toLowerCase()}.svg`,
			imageAlt: metadata.imageAlt || metadata.title || 'Cover image',
			author: metadata.author || 'Iris',
			published: metadata.published !== false,
			featured: metadata.featured === true,
		};
	});

/** Get only published posts, sorted by date descending */
export function getPublishedPosts(): Post[] {
	return posts.filter((p) => p.published).sort((a, b) => b.date.localeCompare(a.date));
}

/** Get featured posts */
export function getFeaturedPosts(): Post[] {
	return posts.filter((p) => p.published && p.featured).sort((a, b) => b.date.localeCompare(a.date));
}

/** Get post by slug */
export function getPostBySlug(slug: string): Post | undefined {
	return posts.find((p) => p.slug === slug && p.published);
}

/** Get posts by category */
export function getPostsByCategory(category: string): Post[] {
	return posts.filter((p) => p.published && p.category.toLowerCase() === category.toLowerCase());
}

/** Get posts by tag */
export function getPostsByTag(tag: string): Post[] {
	return posts.filter((p) => p.published && p.tags.some((t) => t.toLowerCase() === tag.toLowerCase()));
}

/** Get related posts (same category, excluding current) */
export function getRelatedPosts(currentSlug: string, category: string, limit = 3): Post[] {
	return posts
		.filter((p) => p.published && p.slug !== currentSlug && p.category === category)
		.slice(0, limit);
}
