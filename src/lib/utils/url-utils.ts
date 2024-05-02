import { type SearchApiGetListingsByFilterRequest } from '@api';

export const createSearchUrl = (path: string, search: SearchApiGetListingsByFilterRequest) => {
	const pageNumber: number =
		search.total > search.limit ? Math.ceil(search.total / search.limit) : 1;
	let categories = '';
	let listingType = '';
    
	if (search.categories && search.categories.length > 0) {
        console.log(search);
		categories = `&category=${search.categories[0]}`;
	}

	if (search.listingTypes && search.listingTypes.length > 0) {
		listingType = `&listing-type=${search.listingTypes[0]}`;
	}

	return encodeURI(`${path}?limitPerPage=${search.limit}&page=${pageNumber}${listingType}${categories}`);
};
