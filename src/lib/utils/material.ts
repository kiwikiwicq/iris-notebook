/**
 * Material Web client-side component loader.
 * Must be called inside onMount to avoid SSR issues.
 */
export async function loadMaterialComponents() {
	// Buttons
	await import('@material/web/button/filled-button.js');
	await import('@material/web/button/outlined-button.js');
	await import('@material/web/button/text-button.js');

	// Icon buttons
	await import('@material/web/iconbutton/icon-button.js');
	await import('@material/web/iconbutton/filled-icon-button.js');
	await import('@material/web/iconbutton/outlined-icon-button.js');

	// Chips
	await import('@material/web/chips/chip-set.js');
	await import('@material/web/chips/filter-chip.js');
	await import('@material/web/chips/assist-chip.js');
	await import('@material/web/chips/suggestion-chip.js');

	// Text fields
	await import('@material/web/textfield/outlined-text-field.js');
	await import('@material/web/textfield/filled-text-field.js');

	// Progress
	await import('@material/web/progress/linear-progress.js');
	await import('@material/web/progress/circular-progress.js');

	// Lists
	await import('@material/web/list/list.js');
	await import('@material/web/list/list-item.js');

	// Divider
	await import('@material/web/divider/divider.js');

	// FAB
	await import('@material/web/fab/fab.js');

	// Ripple
	await import('@material/web/ripple/ripple.js');

	// Focus ring
	await import('@material/web/focus/md-focus-ring.js');
}
