<script lang="ts">
	const currentYear = new Date().getFullYear();
</script>

<footer class="footer">
	<div class="container">
		<div class="footer-inner">
			<!-- Brand -->
			<div class="footer-brand">
				<a href="/" class="brand-link" aria-label="Iris Notebook home">
					<span class="brand-name">Iris Notebook</span>
				</a>
				<p class="brand-tagline body-small">
					A premium notebook for developers.
					<br />Programming, Android, Linux, and AI.
				</p>
			</div>

			<!-- Navigation -->
			<nav class="footer-nav" aria-label="Footer navigation">
				<div class="nav-group">
					<p class="nav-group-title label-medium">Pages</p>
					<ul>
						<li><a href="/">Home</a></li>
						<li><a href="/articles">Articles</a></li>
						<li><a href="/categories">Categories</a></li>
						<li><a href="/projects">Projects</a></li>
						<li><a href="/about">About</a></li>
					</ul>
				</div>
				<div class="nav-group">
					<p class="nav-group-title label-medium">Categories</p>
					<ul>
						<li><a href="/categories#android">Android</a></li>
						<li><a href="/categories#linux">Linux</a></li>
						<li><a href="/categories#programming">Programming</a></li>
						<li><a href="/categories#ai">AI</a></li>
						<li><a href="/categories#notes">Notes</a></li>
					</ul>
				</div>
				<div class="nav-group">
					<p class="nav-group-title label-medium">Connect</p>
					<ul>
						<li>
							<a href="https://github.com/kiwikiwicq" target="_blank" rel="noopener noreferrer">
								<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
									<path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
								</svg>
								GitHub
							</a>
						</li>
						<li><a href="/rss.xml">RSS Feed</a></li>
					</ul>
				</div>
			</nav>
		</div>

		<hr class="divider" />

		<div class="footer-bottom">
			<p class="body-small">© {currentYear} Iris Notebook. Built with SvelteKit &amp; Material Design 3.</p>
			<button
				class="back-to-top"
				onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
				aria-label="Back to top"
			>
				<span class="material-symbols-rounded">arrow_upward</span>
				Back to top
			</button>
		</div>
	</div>
</footer>

<style>
	.footer {
		background: var(--md-sys-color-surface-container-low);
		border-top: 1px solid var(--md-sys-color-outline-variant);
		padding-top: var(--space-16);
		padding-bottom: calc(var(--space-8) + env(safe-area-inset-bottom, 0));
	}

	.footer-inner {
		display: grid;
		grid-template-columns: 1fr 2fr;
		gap: var(--space-16);
		margin-bottom: var(--space-10);
	}

	@media (max-width: 768px) {
		.footer-inner {
			grid-template-columns: 1fr;
			gap: var(--space-8);
		}
	}

	/* Brand */
	.brand-link {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		text-decoration: none;
		color: var(--md-sys-color-on-surface);
		margin-bottom: var(--space-4);
	}

	.brand-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		background: var(--md-sys-color-primary-container);
		border-radius: var(--md-sys-shape-corner-medium);
		color: var(--md-sys-color-on-primary-container);
	}

	.brand-icon .material-symbols-rounded { font-size: 18px; }

	.brand-name {
		font-size: 16px;
		font-weight: 600;
	}

	.brand-tagline {
		color: var(--md-sys-color-on-surface-variant);
		line-height: 1.6;
	}

	/* Nav */
	.footer-nav {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-8);
	}

	@media (max-width: 480px) {
		.footer-nav {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.nav-group-title {
		color: var(--md-sys-color-on-surface);
		text-transform: uppercase;
		letter-spacing: 1px;
		margin-bottom: var(--space-4);
		max-width: none;
	}

	.nav-group ul {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.nav-group a {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		font-size: 14px;
		color: var(--md-sys-color-on-surface-variant);
		text-decoration: none;
		transition: color var(--motion-duration-short4) var(--motion-easing-standard);
	}

	.nav-group a:hover {
		color: var(--md-sys-color-primary);
	}

	/* Bottom */
	.divider {
		height: 1px;
		background: var(--md-sys-color-outline-variant);
		border: none;
		margin-bottom: var(--space-5);
	}

	.footer-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: var(--space-4);
	}

	.footer-bottom p {
		color: var(--md-sys-color-on-surface-variant);
		max-width: none;
	}

	.back-to-top {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: 8px 16px;
		border-radius: var(--md-sys-shape-corner-full);
		border: 1px solid var(--md-sys-color-outline-variant);
		background: transparent;
		color: var(--md-sys-color-on-surface-variant);
		font-family: var(--font-body);
		font-size: 13px;
		font-weight: 500;
		cursor: pointer;
		transition:
			background var(--motion-duration-short4) var(--motion-easing-standard),
			color var(--motion-duration-short4) var(--motion-easing-standard);
	}

	.back-to-top:hover {
		background: var(--md-sys-color-secondary-container);
		color: var(--md-sys-color-on-secondary-container);
		border-color: transparent;
	}

	.back-to-top .material-symbols-rounded { font-size: 18px; }
</style>
