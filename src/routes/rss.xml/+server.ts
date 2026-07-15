import { getPublishedPosts } from '$lib/data/posts';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SITE_AUTHOR } from '$lib/config';

export const prerender = true;

function escapeXml(str: string): string {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

export async function GET() {
	const posts = getPublishedPosts();

	const items = posts
		.map(
			(post) => `
		<item>
			<title>${escapeXml(post.title)}</title>
			<link>${SITE_URL}/articles/${post.slug}</link>
			<guid isPermaLink="true">${SITE_URL}/articles/${post.slug}</guid>
			<description>${escapeXml(post.description)}</description>
			<pubDate>${new Date(post.date).toUTCString()}</pubDate>
			<author>${escapeXml(post.author)}</author>
			<category>${escapeXml(post.category)}</category>
			${post.image ? `<enclosure url="${SITE_URL}${post.image}" type="image/png" length="0"/>` : ''}
		</item>`
		)
		.join('');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
	xmlns:atom="http://www.w3.org/2005/Atom"
	xmlns:content="http://purl.org/rss/1.0/modules/content/"
	xmlns:dc="http://purl.org/dc/elements/1.1/">
	<channel>
		<title>${escapeXml(SITE_NAME)}</title>
		<link>${SITE_URL}</link>
		<description>${escapeXml(SITE_DESCRIPTION)}</description>
		<language>en-us</language>
		<managingEditor>${escapeXml(SITE_AUTHOR)}</managingEditor>
		<webMaster>${escapeXml(SITE_AUTHOR)}</webMaster>
		<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
		<atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
		<image>
			<url>${SITE_URL}/og-image.png</url>
			<title>${escapeXml(SITE_NAME)}</title>
			<link>${SITE_URL}</link>
		</image>
		${items}
	</channel>
</rss>`;

	return new Response(xml.trim(), {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
