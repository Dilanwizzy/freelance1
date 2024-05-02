<script lang="ts">
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { afterUpdate, onDestroy, onMount } from 'svelte';
	import { search } from '$lib/stores/search.store';
	import ListingCard from '$lib/components/listing-card/listing-card.svelte';
	import SearchHeader from '$lib/components/shared-components/search-header/search-header.svelte';
	import { createSearchUrl } from '$lib/utils/url-utils';
	import { Paginator, type PaginationSettings } from '@skeletonlabs/skeleton';

	export let data: PageData;
	let isLoaded: boolean = false;
	let paginationSettings: PaginationSettings = {
		page: data.page.currentPage,
		limit: data.page.limitPerPage,
		size: data.page.total,
		amounts: [10, 20, 50, data.page.total]
	};

	$: listings = data.listing.listings;

	const searchStoreUnsub = search.subscribe((value) => {
		console.log(value);
		if (value.listingTypes && isLoaded) {
			if (value.listingTypes.length == 1) {
				goto(createSearchUrl('/listing', value));
			} else if (data.page.listingType) {
				goto(createSearchUrl('/listing', value));
			}
		}
	});

	onMount(async () => {
		isLoaded = true;
	});

	afterUpdate(() => {
		search.set({
			listingTypes: data.page.listingType ? [data.page.listingType] : [],
			categories: data.page.category ? [data.page.category] : [],
			listingLocationType: 'All',
			listingModel: 'All',
			markers: false,
			total: data.page.total,
			limit: Number(data.page.limitPerPage),
			skip: 0
		});
	});

	onDestroy(() => {
		searchStoreUnsub();
	});
</script>

<!-- <div>{$businessStore?.markers}</div> -->
<div class="container mx-auto">
	<div class="my-4">
		<SearchHeader />
	</div>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
		{#if listings}
			{#each listings as listing (listing.slug)}
				<div class="p-2">
					<ListingCard {listing} />
				</div>
			{/each}
		{/if}
	</div>
	<Paginator settings={paginationSettings} showNumerals maxNumerals={1} />
</div>
