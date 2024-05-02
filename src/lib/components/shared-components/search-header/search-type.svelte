<script lang="ts">
	import CardAction from '$lib/components/shared-components/card-action.svelte';
	import { IconPosition } from '$lib/components/enums';
	import { ListBox, ListBoxItem, popup } from '@skeletonlabs/skeleton';
	import { afterUpdate, onDestroy, onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import { search } from '$lib/stores/search.store';
	import { ListingResponseDtoBusinessLocationEnum } from '@api';

	const dispatch = createEventDispatcher();

	let valueSingle: string = $search.listingLocationType;
	let showListBox = false;

	afterUpdate(() => {
		search.update((storeValue) => {
			return { ...storeValue, listingLocationType: valueSingle };
		});
	});
</script>

<div>
	<button use:popup={{ event: 'click', target: 'listingLocations' }}>
		<CardAction title={valueSingle} iconPosition={IconPosition.LEFT} iconName="business" />
	</button>
	<!-- {#if showListBox}
		<div class="overlay"></div> -->
	<!-- <div class="absolute mt-4 absolute w-48 bg-surface-200 rounded-3xl z-50 shadow-lg" data-popup="listingLocations"> -->
	<div class="card p-2 w-60 z-50" data-popup="listingLocations">
		<ListBox>
			<ListBoxItem
				bind:group={valueSingle}
				name="medium"
				value={ListingResponseDtoBusinessLocationEnum.All}
				>{ListingResponseDtoBusinessLocationEnum.All}</ListBoxItem
			>
			<ListBoxItem
				bind:group={valueSingle}
				name="medium"
				value={ListingResponseDtoBusinessLocationEnum.Both}
				>{ListingResponseDtoBusinessLocationEnum.Both}</ListBoxItem
			>
			<ListBoxItem
				bind:group={valueSingle}
				name="medium"
				value={ListingResponseDtoBusinessLocationEnum.Online}
				>{ListingResponseDtoBusinessLocationEnum.Online}</ListBoxItem
			>
			<ListBoxItem
				bind:group={valueSingle}
				name="medium"
				value={ListingResponseDtoBusinessLocationEnum.Physcial}
				>{ListingResponseDtoBusinessLocationEnum.Physcial}</ListBoxItem
			>
		</ListBox>
	</div>
	<!-- {/if} -->
</div>
