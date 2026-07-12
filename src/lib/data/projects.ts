/**
 * Sample project data for Iris Notebook's Projects page.
 */

export interface Project {
	name: string;
	description: string;
	url: string;
	language: string;
	languageColor: string;
	stars: number;
	forks: number;
	topics: string[];
	archived?: boolean;
	featured?: boolean;
}

export const projects: Project[] = [
	{
		name: 'horizon-launcher',
		description:
			'A minimal, fast Android home screen launcher built with Jetpack Compose and Material You. Supports dynamic color, gesture navigation, and customizable widgets.',
		url: 'https://github.com/kiwikiwicq/horizon-launcher',
		language: 'Kotlin',
		languageColor: '#7F52FF',
		stars: 2840,
		forks: 187,
		topics: ['android', 'kotlin', 'jetpack-compose', 'material-you', 'launcher'],
		featured: true
	},
	{
		name: 'iris-notebook',
		description:
			'This website! A personal knowledge base and blog built with SvelteKit and Material Design 3. Features dark mode, full-text search, and beautiful typography.',
		url: 'https://github.com/kiwikiwicq/iris-notebook',
		language: 'Svelte',
		languageColor: '#FF3E00',
		stars: 567,
		forks: 89,
		topics: ['sveltekit', 'material-design', 'blog', 'personal-site'],
		featured: true
	}
];

/** Get featured projects */
export function getFeaturedProjects(): Project[] {
	return projects.filter((p) => p.featured);
}

/** Get language color for display */
export function getLanguageColor(lang: string): string {
	const colors: Record<string, string> = {
		Kotlin: '#7F52FF',
		Svelte: '#FF3E00',
		Python: '#3572A5',
		Rust: '#DEA584',
		TypeScript: '#3178C6',
		JavaScript: '#F1E05A',
		Lua: '#000080',
		Go: '#00ADD8',
		Shell: '#89E051'
	};
	return colors[lang] ?? '#6750A4';
}
