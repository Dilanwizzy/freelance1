<script lang="ts">
	import type { ListingResponseDto, SearchApiGetListingsByFilterRequest } from '@api';
	import { Avatar } from '@skeletonlabs/skeleton';
	import Icon from '$lib/components/shared-components/icon.svelte';
	import { page } from '$app/stores';
	import { search } from '$lib/stores/search.store';
	import { createSearchUrl } from '$lib/utils/url-utils';

	export let listing: ListingResponseDto;

	$: copySearch = $search;

	const getInititalFromName = (text: string) => {
		const words = text.split(' ');
		const initials = words.map((word) => word.charAt(0).toUpperCase());
		return initials.join('');
	};

	const createUrl = (param: string, isCategory: boolean) => {
		return createSearchUrl($page.url.pathname, copySearch);
		};

	const initial = getInititalFromName(listing.name);
</script>

<div class="w-full h-[540px]">
	<div class="block card card-hover overflow-hidden h-full">
		<header>
			<img
				src="https://images.unsplash.com/photo-1620562303747-ba21ca6f1530?ixid=M3w0Njc5ODF8MHwxfGFsbHx8fHx8fHx8fDE2ODc5NzY2MjR8&ixlib=rb-4.0.3&w=400&h=175&auto=format&fit=crop"
				class="bg-black/50 w-full aspect-[21/9]"
				alt="Post"
			/>
		</header>
		<div class="flex justify-between">
			<div class="-mt-8 p-2">
				<Avatar initials={initial} width="w-16" rounded="rounded-full" />
			</div>
			<div>
				<div class="flex">
					<span class="chip variant-filled-success m-1">Open</span>
					{#if listing.canBeListed}
						<span class="chip variant-filled-tertiary m-1">Verified</span>
					{/if}
				</div>
			</div>
		</div>
		<div class="p-4 space-y-4 h-1/2">
			<h3 class="h3 font-bold" data-toc-ignore>
				<a href={`/listing/${listing.slug}`}>{listing.name}</a>
			</h3>
			<p>{listing.description}</p>
			<article class="space-y-2">
				{#if listing.info?.website}
					<div class="flex">
						<Icon iconName="globe" />
						<a class=" pl-2" href={listing.info?.website}>
							{listing.info?.website}
						</a>
					</div>
				{/if}
				{#if listing.address}
					<div class="flex">
						<Icon iconName="globe" />
						<p class=" pl-2">
							{listing?.address.city}
						</p>
					</div>
					<div class="flex">
						<Icon iconName="location-dot" />
						<a class=" pl-2" href={listing.address.googleMaps}>
							{listing?.address.address1}, {listing?.address.city}, {listing?.address.postalCode}
						</a>
					</div>
				{/if}

				<p />
			</article>
		</div>
		<hr class="opacity-50" />
		<footer class="p-4 flex justify-start items-center">
			<div class="flex-auto flex justify-between items-center">
				<a
					class="chip variant-filled-secondary hover:variant-filled"
					href={createUrl(listing.tags.type.slug, false)}
				>
					<Icon iconName={listing.tags.type.icon} />
					<span>{listing.tags.type.name}</span>
				</a>
				<a
					class="chip variant-filled-tertiary hover:variant-filled"
					href={createUrl(listing.tags.categories[0].slug, true)}
				>
					<span>{listing.tags.categories[0].name}</span>
				</a>
			</div>
		</footer>
	</div>
</div>
