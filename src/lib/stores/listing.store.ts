import { derived, writable } from 'svelte/store';
import { BlackApi } from '@api';
import { search } from './search.store.ts';
import asyncDerivedConsistent from './stream.ts';

async function getListingsBySearch($searchParam) {
	const api = new BlackApi({ basePath: 'http://192.168.1.234:2283/api' });
	const { data } = await api.searchApi.getListingsByFilter($searchParam);
	return data;
}

export const listingStore = asyncDerivedConsistent(search, getListingsBySearch, []);

// export const businessStore = derived(search, (searchParam) => async () => {
// 	const api = new BlackApi({ basePath: 'http://192.168.1.234:3001' });
// 	async function getBusinessesBySearch() {
// 		const { data } = await api.searchApi.getBusinessByFilter(searchParam);
// 		return data;
// 	}
// 	return await getBusinessesBySearch();
// });
