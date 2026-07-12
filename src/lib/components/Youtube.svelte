<script lang="ts">
	interface Props {
		id: string;
		title?: string;
	}
	let { id, title = 'YouTube video player' }: Props = $props();
</script>

<div class="youtube-wrapper">
	<iframe
		src="https://www.youtube.com/embed/{id}"
		{title}
		frameborder="0"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
		referrerpolicy="strict-origin-when-cross-origin"
		allowfullscreen
	></iframe>
</div>

<style>
	.youtube-wrapper {
		position: relative;
		width: 100%;
		padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
		border-radius: var(--md-sys-shape-corner-large, 16px);
		overflow: hidden;
		margin-block: 2rem;
		box-shadow: 0 4px 12px rgba(0,0,0,0.1);
	}

	.youtube-wrapper iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border: 0;
	}
</style>
