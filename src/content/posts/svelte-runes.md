---
title: "SvelteKit 5 Runes: Simplifying Reactivity"
description: "A look at the new Runes system in Svelte 5 and how it completely changes the way we write reactive frontend code."
date: "2026-07-10"
category: "Programming"
tags: ["Svelte", "Frontend", "JavaScript"]
image: "/assets/Screenshot 2026-07-06 234533.png"
published: true
featured: true
---

## The Problem with Old Svelte

Svelte 3 and 4 were amazing, but their reactivity model relied heavily on compiler magic that broke down outside of `.svelte` files. If you wanted to share state across files, you had to use stores (`writable()`, `readable()`), which felt like a completely different API than `let count = 0;`.

## Enter Runes

Svelte 5 introduces **Runes** — explicit signals that tell the compiler exactly what is reactive. They work identically inside and outside of components.

### $state

To declare a reactive variable, you use `$state`:

```svelte
<script>
    let count = $state(0);

    function increment() {
        count += 1;
    }
</script>

<button onclick={increment}>
    Clicks: {count}
</button>
```

### $derived

When you need a value that depends on state, use `$derived`:

```svelte
<script>
    let count = $state(0);
    let double = $derived(count * 2);
</script>
```

### Universal Reactivity

The best part? You can extract this logic into a pure `.ts` file:

```typescript
// counter.svelte.ts
export function createCounter() {
    let count = $state(0);

    return {
        get count() { return count; },
        increment: () => count++
    };
}
```

Now you have a fully reactive, encapsulated state machine that doesn't rely on Svelte stores or context!

## Conclusion
Svelte 5 makes reactivity explicit, predictable, and universal. It's a massive step forward for the ecosystem.
