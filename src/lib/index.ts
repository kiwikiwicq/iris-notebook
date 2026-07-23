// Component barrel exports
export { default as AppBar } from './components/AppBar.svelte';
export { default as Footer } from './components/Footer.svelte';
export { default as NavDrawer } from './components/NavDrawer.svelte';
export { default as Hero } from './components/Hero.svelte';
export { default as ArticleCard } from './components/ArticleCard.svelte';
export { default as CategoryChip } from './components/CategoryChip.svelte';
export { default as ProjectCard } from './components/ProjectCard.svelte';
export { default as ThemeToggle } from './components/ThemeToggle.svelte';
export { default as LanguageToggle } from './components/LanguageToggle.svelte';
export { default as SearchBar } from './components/SearchBar.svelte';
export { default as Tag } from './components/Tag.svelte';
export { default as AuthorCard } from './components/AuthorCard.svelte';
export { default as TOC } from './components/TOC.svelte';
export { default as Pagination } from './components/Pagination.svelte';
export { default as Breadcrumbs } from './components/Breadcrumbs.svelte';
export { default as CodeBlock } from './components/CodeBlock.svelte';

// Store exports
export { themeStore } from './stores/theme.svelte';
export { searchStore } from './stores/search.svelte';
export { languageStore } from './stores/language.svelte';

// Utility exports
export { readingTime, readingTimeLabel } from './utils/reading-time';
export { formatDate, formatRelativeDate, isoDate } from './utils/format-date';
export { loadMaterialComponents } from './utils/material';

/** Data exports */
export { posts, getPublishedPosts, getFeaturedPosts, getPostBySlug, getPostsByCategory } from './data/posts';
export { categories, getCategoryBySlug, getCategoryColor } from './data/categories';
export { projects, getFeaturedProjects } from './data/projects';

// Config
export * from './config';
