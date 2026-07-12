// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	// Material Web custom element type declarations
	namespace svelteHTML {
		interface IntrinsicElements {
			'md-filled-button': Record<string, unknown>;
			'md-outlined-button': Record<string, unknown>;
			'md-text-button': Record<string, unknown>;
			'md-tonal-button': Record<string, unknown>;
			'md-elevated-button': Record<string, unknown>;
			'md-filled-text-field': Record<string, unknown>;
			'md-outlined-text-field': Record<string, unknown>;
			'md-chip-set': Record<string, unknown>;
			'md-filter-chip': Record<string, unknown>;
			'md-assist-chip': Record<string, unknown>;
			'md-suggestion-chip': Record<string, unknown>;
			'md-input-chip': Record<string, unknown>;
			'md-icon': Record<string, unknown>;
			'md-icon-button': Record<string, unknown>;
			'md-filled-icon-button': Record<string, unknown>;
			'md-outlined-icon-button': Record<string, unknown>;
			'md-fab': Record<string, unknown>;
			'md-navigation-drawer': Record<string, unknown>;
			'md-navigation-drawer-modal': Record<string, unknown>;
			'md-list': Record<string, unknown>;
			'md-list-item': Record<string, unknown>;
			'md-divider': Record<string, unknown>;
			'md-linear-progress': Record<string, unknown>;
			'md-circular-progress': Record<string, unknown>;
			'md-tabs': Record<string, unknown>;
			'md-primary-tab': Record<string, unknown>;
			'md-secondary-tab': Record<string, unknown>;
			'md-dialog': Record<string, unknown>;
			'md-ripple': Record<string, unknown>;
			'md-focus-ring': Record<string, unknown>;
			'md-checkbox': Record<string, unknown>;
			'md-radio': Record<string, unknown>;
			'md-switch': Record<string, unknown>;
			'md-slider': Record<string, unknown>;
			'md-select': Record<string, unknown>;
			'md-outlined-select': Record<string, unknown>;
			'md-select-option': Record<string, unknown>;
			'md-menu': Record<string, unknown>;
			'md-menu-item': Record<string, unknown>;
			'md-snackbar': Record<string, unknown>;
			'md-badge': Record<string, unknown>;
			'md-card': Record<string, unknown>;
			'md-elevated-card': Record<string, unknown>;
			'md-filled-card': Record<string, unknown>;
			'md-outlined-card': Record<string, unknown>;
		}
	}
}

export {};
