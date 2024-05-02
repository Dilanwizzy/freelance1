import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, locals: { api } }) => {
	const { data: listing } = await api.listingApi.getListing({ id: params.name });

	if (!listing) {
		redirect(303, '/listing/not-found');
	}

	return {
		listing,
		meta: {
			title: listing.name,
			description: listing.description
		}
	};
}) satisfies PageServerLoad;
