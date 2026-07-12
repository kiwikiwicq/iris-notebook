---
title: "Hello World: My First Markdown Post"
description: "Testing out the new MDX-powered blog system in Iris Notebook."
date: "2026-07-13"
category: "Notes"
author: "Iris"
tags: ["Markdown", "SvelteKit", "Test"]
image: "/assets/Screenshot 2026-07-06 161037.png"
published: true
---

<script>
	import Youtube from '$lib/components/Youtube.svelte';
</script>

## Welcome to the new system

This post is loaded directly from a `.md` file! The frontmatter is parsed by Vite's `import.meta.glob` and the content is rendered by `mdsvex`.

### Image Support
You can now use standard markdown images, and they will load perfectly from the `static` folder!

![Demo Screenshot](/assets/Screenshot%202026-07-06%20161037.png)

### YouTube Support
You can easily embed playable YouTube videos using the custom `Youtube` component:

<Youtube id="dQw4w9WgXcQ" title="Rick Roll" />

### Code block test

```typescript
const message: string = "Hello, world!";
console.log(message);
```

### Table test

| Feature | Supported |
|---------|-----------|
| Frontmatter | ✅ |
| Code Highlighting | ✅ |
| Custom Components | ✅ |

And here is some **bold** and *italic* text.
