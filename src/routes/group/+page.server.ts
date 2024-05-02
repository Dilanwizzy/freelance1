import type { PageServerLoad } from './$types';
export const load = (async ({ locals }) => {
    return {
		meta: {
			title: 'Group'
		}
	};
}) satisfies PageServerLoad;