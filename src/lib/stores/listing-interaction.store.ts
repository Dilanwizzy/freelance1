import { Writable, writable } from 'svelte/store';
import { api, type ListingResponseDto } from '@api';

export function listingInteraction(id: string): Writable<ListingResponseDto> {
	const { subscribe, set, update } = writable();

	const listingDto = api.listingApi.getListing({ id });

	set(listingDto);

	return { subscribe, set, update };
}
