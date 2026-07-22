<script lang="ts">
	interface Props {
		name:
			| 'search'
			| 'articles'
			| 'categories'
			| 'projects'
			| 'person'
			| 'bookmark'
			| 'bookmarked'
			| 'arrowRight'
			| 'arrowUp'
			| 'externalLink'
			| 'darkMode'
			| 'lightMode'
			| 'menu'
			| 'close'
			| 'typography'
			| 'code'
			| 'github'
			| 'rss'
			| 'star'
			| 'fork'
			| 'check'
			| 'notification'
			| 'multitasking'
			| 'audio'
			| 'video'
			| 'folder'
			| 'accessibility'
			| 'share'
			| 'copy'
			| 'terminal'
			| 'sparkles'
			| 'mobile'
			| 'command';
		size?: number;
		color?: string;
		class?: string;
	}

	let { name, size = 18, color = 'currentColor', class: className = '' }: Props = $props();
</script>

<svg
	class="sf-icon {className}"
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke={color}
	stroke-width="1.6"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"
>
	{#if name === 'search'}
		<!-- SF Symbol: magnifyingglass -->
		<circle cx="11" cy="11" r="7" />
		<line x1="16.5" y1="16.5" x2="21" y2="21" />
	{:else if name === 'articles'}
		<!-- SF Symbol: doc.text -->
		<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
		<polyline points="14 2 14 8 20 8" />
		<line x1="16" y1="13" x2="8" y2="13" />
		<line x1="16" y1="17" x2="8" y2="17" />
		<line x1="10" y1="9" x2="8" y2="9" />
	{:else if name === 'categories'}
		<!-- SF Symbol: square.grid.2x2 -->
		<rect x="3" y="3" width="7" height="7" rx="1.5" />
		<rect x="14" y="3" width="7" height="7" rx="1.5" />
		<rect x="14" y="14" width="7" height="7" rx="1.5" />
		<rect x="3" y="14" width="7" height="7" rx="1.5" />
	{:else if name === 'projects'}
		<!-- SF Symbol: chevron.left.forwardslash.chevron.right -->
		<polyline points="16 18 22 12 16 6" />
		<polyline points="8 6 2 12 8 18" />
	{:else if name === 'person'}
		<!-- SF Symbol: person -->
		<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
		<circle cx="12" cy="7" r="4" />
	{:else if name === 'bookmark'}
		<!-- SF Symbol: bookmark -->
		<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
	{:else if name === 'bookmarked'}
		<!-- SF Symbol: bookmark.fill -->
		<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" fill={color} />
	{:else if name === 'arrowRight'}
		<!-- SF Symbol: arrow.right -->
		<line x1="5" y1="12" x2="19" y2="12" />
		<polyline points="12 5 19 12 12 19" />
	{:else if name === 'arrowUp'}
		<!-- SF Symbol: arrow.up -->
		<line x1="12" y1="19" x2="12" y2="5" />
		<polyline points="5 12 12 5 19 12" />
	{:else if name === 'externalLink'}
		<!-- SF Symbol: arrow.up.forward -->
		<line x1="7" y1="17" x2="17" y2="7" />
		<polyline points="7 7 17 7 17 17" />
	{:else if name === 'darkMode'}
		<!-- SF Symbol: moon -->
		<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
	{:else if name === 'lightMode'}
		<!-- SF Symbol: sun.max -->
		<circle cx="12" cy="12" r="5" />
		<line x1="12" y1="1" x2="12" y2="3" />
		<line x1="12" y1="21" x2="12" y2="23" />
		<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
		<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
		<line x1="1" y1="12" x2="3" y2="12" />
		<line x1="21" y1="12" x2="23" y2="12" />
		<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
		<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
	{:else if name === 'menu'}
		<!-- Exact 1:1 Equal Size: iOS Control Center Dual-Pill Toggle Hamburger Icon -->
		<g>
			<!-- Top Pill: Outlined Ring + Left Capsule Thumb (Visual bounds: x 2.5..21.5, y 2.5..11.0) -->
			<rect x="3.3" y="3.3" width="17.4" height="6.9" rx="3.45" stroke={color} stroke-width="1.6" fill="none" />
			<rect x="5.2" y="4.7" width="6.6" height="4.1" rx="2.05" fill={color} stroke="none" />
			<!-- Bottom Pill: Solid Body + Right Cutout Thumb (Visual bounds: x 2.5..21.5, y 13.5..22.0) -->
			<path
				fill={color}
				stroke="none"
				fill-rule="evenodd"
				d="M 6.75,13.5 H 17.25 A 4.25,4.25 0 0 1 21.5,17.75 A 4.25,4.25 0 0 1 17.25,22 H 6.75 A 4.25,4.25 0 0 1 2.5,17.75 A 4.25,4.25 0 0 1 6.75,13.5 Z M 14.25,15.7 H 16.75 A 2.05,2.05 0 0 1 18.8,17.75 A 2.05,2.05 0 0 1 16.75,19.8 H 14.25 A 2.05,2.05 0 0 1 12.2,17.75 A 2.05,2.05 0 0 1 14.25,15.7 Z"
			/>
		</g>
	{:else if name === 'close'}
		<!-- SF Symbol: xmark -->
		<line x1="18" y1="6" x2="6" y2="18" />
		<line x1="6" y1="6" x2="18" y2="18" />
	{:else if name === 'typography'}
		<!-- SF Symbol: textformat -->
		<path d="M4 7V4h16v3" />
		<path d="M9 20h6" />
		<path d="M12 4v16" />
	{:else if name === 'code'}
		<!-- SF Symbol: code -->
		<polyline points="16 18 22 12 16 6" />
		<polyline points="8 6 2 12 8 18" />
	{:else if name === 'github'}
		<!-- GitHub mark -->
		<path
			d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
			fill="currentColor"
			stroke="none"
		/>
	{:else if name === 'rss'}
		<!-- SF Symbol: antenna.radiowaves.left.and.right / rss -->
		<path d="M4 11a9 9 0 0 1 9 9" />
		<path d="M4 4a16 16 0 0 1 16 16" />
		<circle cx="5" cy="19" r="1" fill={color} />
	{:else if name === 'star'}
		<!-- SF Symbol: star -->
		<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
	{:else if name === 'fork'}
		<!-- SF Symbol: point.topleft.down.curvedto.point.bottomright.up -->
		<circle cx="12" cy="18" r="3" />
		<circle cx="6" cy="6" r="3" />
		<circle cx="18" cy="6" r="3" />
		<path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9" />
		<path d="M12 12v3" />
	{:else if name === 'check'}
		<!-- SF Symbol: checkmark -->
		<polyline points="20 6 9 17 4 12" />
	{:else if name === 'notification'}
		<!-- SF Symbol: bell -->
		<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
		<path d="M13.73 21a2 2 0 0 1-3.46 0" />
	{:else if name === 'multitasking'}
		<!-- SF Symbol: rectangle.split.2x1 -->
		<rect x="3" y="4" width="18" height="16" rx="2" />
		<line x1="12" y1="4" x2="12" y2="20" />
	{:else if name === 'audio'}
		<!-- SF Symbol: speaker.wave.2 -->
		<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
		<path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
		<path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
	{:else if name === 'video'}
		<!-- SF Symbol: play.circle -->
		<circle cx="12" cy="12" r="10" />
		<polygon points="10 8 16 12 10 16 10 8" />
	{:else if name === 'folder'}
		<!-- SF Symbol: folder -->
		<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
	{:else if name === 'accessibility'}
		<!-- SF Symbol: figure.wave -->
		<circle cx="12" cy="4" r="2" />
		<path d="M18 9l-6 2-6-2" />
		<path d="M12 11v6" />
		<path d="M9 22l3-5 3 5" />
	{:else if name === 'share'}
		<!-- SF Symbol: square.and.arrow.up -->
		<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
		<polyline points="16 6 12 2 8 6" />
		<line x1="12" y1="2" x2="12" y2="15" />
	{:else if name === 'copy'}
		<!-- SF Symbol: doc.on.doc -->
		<rect x="9" y="9" width="13" height="13" rx="2" />
		<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
	{:else if name === 'terminal'}
		<!-- SF Symbol: terminal -->
		<polyline points="4 17 10 11 4 5" />
		<line x1="12" y1="19" x2="20" y2="19" />
	{:else if name === 'sparkles'}
		<!-- SF Symbol: sparkles -->
		<path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z" />
	{:else if name === 'mobile'}
		<!-- SF Symbol: iphone -->
		<rect x="5" y="2" width="14" height="20" rx="3" />
		<line x1="12" y1="18" x2="12" y2="18.01" />
	{:else if name === 'command'}
		<!-- SF Symbol: command -->
		<path d="M18 9a3 3 0 1 0-3-3H9a3 3 0 1 0-3 3v6a3 3 0 1 0 3 3h6a3 3 0 1 0 3-3V9z" />
	{/if}
</svg>

<style>
	.sf-icon {
		display: inline-block;
		vertical-align: middle;
		flex-shrink: 0;
	}
</style>
