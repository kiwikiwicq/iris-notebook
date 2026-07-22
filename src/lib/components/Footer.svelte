<script lang="ts">
	import SFIcon from './SFIcon.svelte';

	const currentYear = new Date().getFullYear();
</script>

<footer class="footer">
	<div class="container">
		<div class="footer-inner">
			<!-- Brand -->
			<div class="footer-brand">
				<a href="/" class="brand-link" aria-label="Iris Notebook Home">
					<div class="brand-badge">
						<SFIcon name="code" size={14} color="var(--md-sys-color-on-surface)" />
					</div>
					<span class="brand-name">Iris Notebook</span>
				</a>
				<p class="brand-tagline">
					Technical engineering notebook on Swift, Kotlin, Linux, and software design.
				</p>
			</div>

			<!-- Navigation -->
			<nav class="footer-nav" aria-label="Footer navigation">
				<div class="nav-group">
					<p class="nav-group-title">Explore</p>
					<ul>
						<li><a href="/">Overview</a></li>
						<li><a href="/articles">Articles</a></li>
						<li><a href="/categories">Categories</a></li>
						<li><a href="/projects">Projects</a></li>
						<li><a href="/about">About</a></li>
					</ul>
				</div>
				<div class="nav-group">
					<p class="nav-group-title">Topics</p>
					<ul>
						<li><a href="/categories#android">Android &amp; Kotlin</a></li>
						<li><a href="/categories#linux">Linux Systems</a></li>
						<li><a href="/categories#programming">Swift &amp; Rust</a></li>
						<li><a href="/categories#ai">AI Systems</a></li>
						<li><a href="/categories#notes">Architecture Notes</a></li>
					</ul>
				</div>
				<div class="nav-group nav-group-connect">
					<p class="nav-group-title">Connect</p>
					<ul>
						<li>
							<a href="https://github.com/kiwikiwicq" target="_blank" rel="noopener noreferrer">
								<SFIcon name="github" size={14} />
								<span>GitHub Profile</span>
							</a>
						</li>
						<li>
							<a href="/rss.xml">
								<SFIcon name="rss" size={14} />
								<span>RSS Feed</span>
							</a>
						</li>
					</ul>
				</div>
			</nav>
		</div>

		<hr class="divider" />

		<div class="footer-bottom">
			<p class="copyright">© {currentYear} Iris Notebook. Written by Iris. Crafted for Mac, iOS &amp; Web.</p>
			<button
				class="back-to-top liquid-glass"
				onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
				aria-label="Back to top"
			>
				<SFIcon name="arrowUp" size={13} />
				<span>Back to top</span>
			</button>
		</div>
	</div>
</footer>

<style>
	.footer {
		background: var(--liquid-glass-bg);
		backdrop-filter: var(--liquid-blur);
		-webkit-backdrop-filter: var(--liquid-blur);
		border-top: 1px solid var(--liquid-glass-border);
		padding-top: var(--space-12);
		padding-bottom: calc(var(--space-8) + env(safe-area-inset-bottom, 0px));
	}

	.footer-inner {
		display: grid;
		grid-template-columns: 1fr 2fr;
		gap: var(--space-12);
		margin-bottom: var(--space-8);
	}

	.brand-link {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		text-decoration: none;
		color: var(--md-sys-color-on-surface);
		margin-bottom: var(--space-3);
	}

	.brand-badge {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		background: rgba(140, 140, 145, 0.16);
		border: 1px solid var(--glass-border);
		border-radius: 8px;
		color: var(--md-sys-color-on-surface);
	}

	.brand-name {
		font-size: 16px;
		font-weight: 600;
		letter-spacing: -0.015em;
	}

	.brand-tagline {
		font-size: 13px;
		color: var(--md-sys-color-on-surface-variant);
		line-height: 1.5;
		max-width: 34ch;
	}

	.footer-nav {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-8);
	}

	.nav-group-title {
		color: var(--md-sys-color-on-surface);
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 0.02em;
		text-transform: uppercase;
		margin-bottom: 12px;
		opacity: 0.85;
	}

	.nav-group ul {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.nav-group a {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: 13px;
		color: var(--md-sys-color-on-surface-variant);
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.nav-group a:hover {
		color: var(--md-sys-color-on-surface);
	}

	.divider {
		height: 1px;
		background: var(--glass-border);
		border: none;
		margin-bottom: var(--space-6);
	}

	.footer-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: var(--space-4);
		font-size: 12px;
		color: var(--md-sys-color-on-surface-variant);
	}

	.copyright {
		margin: 0;
		line-height: 1.5;
	}

	.back-to-top {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 7px 16px;
		border-radius: var(--md-sys-shape-corner-full);
		color: var(--md-sys-color-on-surface);
		font-family: var(--font-body);
		font-size: 12px;
		font-weight: 500;
		cursor: pointer;
		transition: background 0.2s ease, opacity 0.2s ease;
	}

	.back-to-top:hover {
		background: rgba(140, 140, 145, 0.22);
	}

	/* Responsive Mobile Styles */
	@media (max-width: 768px) {
		.footer-inner {
			grid-template-columns: 1fr;
			gap: var(--space-8);
		}
		.brand-tagline {
			max-width: 100%;
		}
	}

	@media (max-width: 540px) {
		.footer-nav {
			grid-template-columns: repeat(2, 1fr);
			gap: var(--space-6);
		}

		.nav-group-connect {
			grid-column: span 2;
			margin-top: var(--space-2);
		}

		.footer-bottom {
			flex-direction: column;
			align-items: center;
			text-align: center;
			gap: var(--space-4);
			width: 100%;
		}

		.copyright {
			max-width: 100%;
		}

		.back-to-top {
			margin-top: 4px;
		}
	}
</style>
