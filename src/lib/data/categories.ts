/**
 * Category definitions for Iris Notebook.
 */

export interface Category {
	slug: string;
	name: string;
	description: string;
	icon: string; // Material Symbol name
	color: string; // CSS color
	colorContainer: string;
}

export const categories: Category[] = [
	{
		slug: 'android',
		name: 'Android',
		description: 'Jetpack Compose, Material Design, Kotlin, and Android development.',
		icon: 'android',
		color: '#3DDC84',
		colorContainer: '#E6FAF0'
	},
	{
		slug: 'linux',
		name: 'Linux',
		description: 'System administration, ricing, dotfiles, shell scripting, and open source.',
		icon: 'terminal',
		color: '#FF9800',
		colorContainer: '#FFF3E0'
	},
	{
		slug: 'programming',
		name: 'Programming',
		description: 'Languages, algorithms, architecture, and software engineering craft.',
		icon: 'code',
		color: '#6750A4',
		colorContainer: '#EADDFF'
	},
	{
		slug: 'ai',
		name: 'AI',
		description: 'Machine learning, LLMs, local AI tools, and thoughtful AI notes.',
		icon: 'psychology',
		color: '#2196F3',
		colorContainer: '#E3F2FD'
	},
	{
		slug: 'notes',
		name: 'Notes',
		description: 'Quick thoughts, reading notes, and personal reflections.',
		icon: 'edit_note',
		color: '#E91E63',
		colorContainer: '#FCE4EC'
	}
];

/** Get category by slug */
export function getCategoryBySlug(slug: string): Category | undefined {
	return categories.find((c) => c.slug === slug.toLowerCase());
}

/** Get category display color (dark mode aware) */
export function getCategoryColor(slug: string): string {
	return getCategoryBySlug(slug)?.color ?? '#6750A4';
}
