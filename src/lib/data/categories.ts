/**
 * Category definitions for Iris Notebook.
 */

export interface Category {
	slug: string;
	name: string;
	description: string;
	icon: string;
	sfIcon?: 'mobile' | 'terminal' | 'code' | 'sparkles' | 'articles' | 'folder';
	color: string;
	colorContainer: string;
}

export const categories: Category[] = [
	{
		slug: 'android',
		name: 'Android',
		description: 'Jetpack Compose, Material Design, Kotlin, and Android development.',
		icon: 'android',
		sfIcon: 'mobile',
		color: '#3DDC84',
		colorContainer: 'rgba(61, 220, 132, 0.12)'
	},
	{
		slug: 'linux',
		name: 'Linux',
		description: 'System administration, ricing, dotfiles, shell scripting, and open source.',
		icon: 'terminal',
		sfIcon: 'terminal',
		color: '#FF9800',
		colorContainer: 'rgba(255, 152, 0, 0.12)'
	},
	{
		slug: 'programming',
		name: 'Programming',
		description: 'Languages, algorithms, architecture, and software engineering craft.',
		icon: 'code',
		sfIcon: 'code',
		color: '#6750A4',
		colorContainer: 'rgba(103, 80, 164, 0.12)'
	},
	{
		slug: 'ai',
		name: 'AI',
		description: 'Machine learning, LLMs, local AI tools, and thoughtful AI notes.',
		icon: 'psychology',
		sfIcon: 'sparkles',
		color: '#2196F3',
		colorContainer: 'rgba(33, 150, 243, 0.12)'
	},
	{
		slug: 'notes',
		name: 'Notes',
		description: 'Quick thoughts, reading notes, and personal reflections.',
		icon: 'edit_note',
		sfIcon: 'articles',
		color: '#E91E63',
		colorContainer: 'rgba(233, 30, 99, 0.12)'
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
