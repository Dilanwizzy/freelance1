import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, url }) => {
	const categories = url.searchParams.get('category');
	const listingType = url.searchParams.get('listing-type');
	const listingLocation = url.searchParams.get('listing-location');
	const limitPerPageMode = url.searchParams.get('limitPerPage');
	const page = url.searchParams.get('page');

	let newUrl = '';

	if (categories) {
		newUrl = newUrl + `?category=${categories}`;
	}

	if (listingType) {
		const search = newUrl != '' ? '&' : '?';
		newUrl = newUrl + search + `listing-type=${listingType}`;
	}

	if (listingLocation) {
		const search = newUrl != '' ? '&' : '?';
		newUrl = newUrl + search + `listing-location=${listingLocation}`;
	}

	if (!limitPerPageMode || Number(limitPerPageMode) < 10) {
		const search = newUrl != '' ? newUrl : '?';
		const perPage = search != '?' ? '&' : '';
		newUrl = url.pathname + search + perPage + 'limitPerPage=10&page=1';
		redirect(303, newUrl);
	}

	const { data: listing } = await locals.api.searchApi.getListingsByFilter({
		listingTypes: listingType ? [listingType] : [],
		categories: categories ? [categories] : [],
		listingLocationType: 'All',
		listingModel: 'All',
		markers: false,
		total: 0,
		limit: Number(limitPerPageMode),
		skip: Number(page) == 1 ? 0 : Number(limitPerPageMode) * (Number(page) - 1)
	});

	const no1 = 39;
	const no2 = 10;
	console.log(no1 > no2 ? Math.ceil(no1 / no2) : 1);

	return {
		meta: {
			title: 'Listing'
		},
		page: {
			limitPerPage: Number(limitPerPageMode),
			currentPage: Number(page),
			category: categories,
			total: listing.total + 1,
			listingType,
			listingLocation
		},
		listing: listing
	};
}) satisfies PageServerLoad;
