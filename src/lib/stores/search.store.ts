import { writable } from 'svelte/store';
import {
	ListingResponseDtoBusinessLocationEnum,
	ListingResponseDtoBusinessModelEnum,
	type SearchApiGetListingsByFilterRequest
} from '@api';

export const initialSearch: SearchApiGetListingsByFilterRequest = {
	listingTypes: [],
	categories: [],
	markers: true,
	listingModel: ListingResponseDtoBusinessModelEnum.Goods,
	listingLocationType: ListingResponseDtoBusinessLocationEnum.Physcial,
	total: 0,
	limit: 0,
	skip: 0
};

export const search = writable(initialSearch);

// function createSearch(searchParam: SearchApiGetBusinessByFilterRequest) {
// 	const { subscribe, set } = writable();
// 	const api = new BlackApi({ basePath: 'http://192.168.1.234:3001' });

// 	async function getBusinessesBySearch() {
// 		const { data } = await api.searchApi.getBusinessByFilter(searchParam);
// 		set(data);
// 	}

// 	return { subscribe, getBusinessesBySearch };
// }

// export const searchStore = createSearch(initialSearch);
