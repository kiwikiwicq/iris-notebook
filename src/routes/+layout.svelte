<script lang="ts">
	import '$lib/styles/app.css';
	import AppBar from '$lib/components/AppBar.svelte';
	import NavDrawer from '$lib/components/NavDrawer.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { themeStore } from '$lib/stores/theme.svelte';
	import { loadMaterialComponents } from '$lib/utils/material';
	import { onMount } from 'svelte';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();

	let drawerOpen = $state(false);

	onMount(async () => {
		// Initialize theme (client-side only)
		themeStore.init();

		// Load Material Web components (must be client-side)
		await loadMaterialComponents();
	});

	function openDrawer() {
		drawerOpen = true;
	}

	function closeDrawer() {
		drawerOpen = false;
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Iris Notebook – Programming, Android, Linux, AI</title>
	<meta name="description" content="A premium personal knowledge base and blog covering programming, Android development, Linux, AI, and thoughtful developer notes." />
	<meta property="og:site_name" content="Iris Notebook" />
	<meta property="og:type" content="website" />
	<meta name="author" content="Iris" />
	<meta name="robots" content="index, follow" />
</svelte:head>

<!-- Skip to main content (accessibility) -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<!-- Mobile Navigation Drawer -->
<NavDrawer isOpen={drawerOpen} onClose={closeDrawer} />

<!-- Top App Bar -->
<AppBar onMenuClick={openDrawer} />

<!-- Page Content -->
<div id="main-content" class="page-enter">
	{@render children()}
</div>

<!-- Footer -->
<Footer />
