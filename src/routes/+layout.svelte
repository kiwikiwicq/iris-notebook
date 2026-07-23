<script lang="ts">
	import '$lib/styles/app.css';
	import AppBar from '$lib/components/AppBar.svelte';
	import NavDrawer from '$lib/components/NavDrawer.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { themeStore } from '$lib/stores/theme.svelte';
	import { glassStore } from '$lib/stores/glass.svelte';
	import { languageStore } from '$lib/stores/language.svelte';
	import { loadMaterialComponents } from '$lib/utils/material';
	import { onMount } from 'svelte';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/stores';
	import { onNavigate } from '$app/navigation';
	import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SITE_TWITTER, SITE_OG_IMAGE } from '$lib/config';
	import BackToTop from '$lib/components/BackToTop.svelte';

	let { children } = $props();

	let drawerOpen = $state(false);

	onMount(async () => {
		// Initialize theme, glass mode, and language (client-side only)
		themeStore.init();
		glassStore.init();
		languageStore.init();

		// Load Material Web components (must be client-side)
		await loadMaterialComponents();
	});

	function openDrawer() {
		drawerOpen = true;
	}

	function closeDrawer() {
		drawerOpen = false;
	}

	// Enable View Transitions API for seamless navigation
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	// Canonical URL derived from current page
	const canonicalUrl = $derived(`${SITE_URL}${$page.url.pathname}`);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{SITE_NAME} – Programming, Android, Linux, AI</title>
	<meta name="description" content={SITE_DESCRIPTION} />
	<meta name="author" content="Iris" />
	<meta name="robots" content="index, follow" />

	<!-- Canonical URL -->
	<link rel="canonical" href={canonicalUrl} />

	<!-- RSS autodiscovery -->
	<link rel="alternate" type="application/rss+xml" title="{SITE_NAME} RSS Feed" href="{SITE_URL}/rss.xml" />

	<!-- Open Graph -->
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:image" content={SITE_OG_IMAGE} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />

	<!-- Twitter / X Card -->
	<meta name="twitter:card" content="summary_large_image" />
	{#if SITE_TWITTER}
		<meta name="twitter:site" content={SITE_TWITTER} />
	{/if}
	<meta name="twitter:image" content={SITE_OG_IMAGE} />
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

<BackToTop />

<!-- Footer -->
<Footer />
