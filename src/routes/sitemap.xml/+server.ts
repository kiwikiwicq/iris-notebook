import { getPublishedPosts } from '$lib/data/posts';
import { categories } from '$lib/data/categories';
import { SITE_URL } from '$lib/config';

export const prerender = true;

interface SitemapEntry {
	url: string;
	lastmod?: string;
	changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
	priority?: number;
}

export async function GET() {
	const posts = getPublishedPosts();
	const today = new Date().toISOString().split('T')[0];

	const staticPages: SitemapEntry[] = [
		{ url: `${SITE_URL}/`, changefreq: 'daily', priority: 1.0, lastmod: today },
		{ url: `${SITE_URL}/articles`, changefreq: 'daily', priority: 0.9, lastmod: today },
		{ url: `${SITE_URL}/categories`, changefreq: 'weekly', priority: 0.8, lastmod: today },
		{ url: `${SITE_URL}/projects`, changefreq: 'weekly', priority: 0.8, lastmod: today },
		{ url: `${SITE_URL}/about`, changefreq: 'monthly', priority: 0.7, lastmod: today }
	];

	const articlePages: SitemapEntry[] = posts.map((post) => ({
		url: `${SITE_URL}/articles/${post.slug}`,
		lastmod: post.updatedDate ?? post.date,
		changefreq: 'monthly',
		priority: 0.8
	}));

	const categoryPages: SitemapEntry[] = categories.map((cat) => ({
		url: `${SITE_URL}/categories#${cat.slug}`,
		changefreq: 'weekly',
		priority: 0.6,
		lastmod: today
	}));

	const allEntries = [...staticPages, ...articlePages, ...categoryPages];

	const urlset = allEntries
		.map(
			(entry) => `
	<url>
		<loc>${entry.url}</loc>
		${entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ''}
		${entry.changefreq ? `<changefreq>${entry.changefreq}</changefreq>` : ''}
		${entry.priority !== undefined ? `<priority>${entry.priority.toFixed(1)}</priority>` : ''}
	</url>`
		)
		.join('');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
	${urlset}
</urlset>`;

	return new Response(xml.trim(), {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
