/**
 * Estimates reading time based on word count.
 * Average adult reads ~238 words per minute for technical content.
 */
export function readingTime(text: string): number {
	const WPM = 238;
	const words = text.trim().split(/\s+/).length;
	return Math.max(1, Math.round(words / WPM));
}

/**
 * Returns a human-readable reading time string.
 * e.g. "5 min read"
 */
export function readingTimeLabel(text: string): string {
	const minutes = readingTime(text);
	return `${minutes} min read`;
}
