export const prerender = false;
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies, locals: { api } }) => {
	return {
		meta: {
			title: 'Home',
			description: ''
		}
	};
}) satisfies PageServerLoad;
