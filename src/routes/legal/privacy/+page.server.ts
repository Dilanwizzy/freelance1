import type { PageServerLoad } from './$types';

export const load = (async () => {
	return {
		meta: {
			title: 'Privacy',
			description: '.'
		}
	};
}) satisfies PageServerLoad;