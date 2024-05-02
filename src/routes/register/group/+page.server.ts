import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { commonRoutes } from '$lib/utils/constants';

export const load = (async ({ locals }) => {
    if (!locals.user.id) redirect(303, commonRoutes.refreshSession);
	
    return {
        meta: {
            title: 'New Group'
        }
    }
}) satisfies PageServerLoad;
