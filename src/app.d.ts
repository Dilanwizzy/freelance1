// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface Locals {
			api: import('@api').BlackApi;
			user: { id?: string; recipeUserId?: string };
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
