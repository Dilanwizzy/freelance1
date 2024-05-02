import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { commonRoutes } from '$lib/utils/constants';

export const load = (async () => {
	redirect(303, `${commonRoutes.login}?mode=signup`);
}) satisfies PageServerLoad;
