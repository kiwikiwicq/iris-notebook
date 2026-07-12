/**
 * Date formatting utilities for blog posts.
 */

/**
 * Format a date string to human-readable form.
 * e.g. "July 12, 2026"
 */
export function formatDate(dateStr: string): string {
	const date = new Date(dateStr);
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
}

/**
 * Format a date as a relative string.
 * e.g. "3 days ago", "2 months ago"
 */
export function formatRelativeDate(dateStr: string): string {
	const date = new Date(dateStr);
	const now = new Date();
	const diffMs = now.getTime() - date.getTime();
	const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

	if (diffDays === 0) return 'Today';
	if (diffDays === 1) return 'Yesterday';
	if (diffDays < 7) return `${diffDays} days ago`;
	if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
	if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
	return `${Math.floor(diffDays / 365)} years ago`;
}

/**
 * Returns ISO date string for datetime attribute.
 * e.g. "2026-07-12"
 */
export function isoDate(dateStr: string): string {
	return new Date(dateStr).toISOString().split('T')[0];
}
