<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { type ListingResponseDto, api } from '@api';
	import { Avatar, type PopupSettings, Ratings } from '@skeletonlabs/skeleton';
	import IStarRegular from '~icons/fa6-regular/star';
	import IHalfStarRegular from '~icons/fa6-regular/star-half-stroke';
	import IStarSolid from '~icons/fa6-solid/star';
	import ISeedSolid from '~icons/fa6-solid/seedling';
	import IFishSolid from '~icons/fa6-solid/fish';
	import IArrowRightSolid from '~icons/fa6-solid/arrow-right';
	import ICameraSolid from '~icons/fa6-solid/camera';
	export let listingId: string;

	let listingDetails: ListingResponseDto | null = null;
	let dataLoaded: boolean = false;

	const popupClick: PopupSettings = {
		event: 'click',
		target: 'popupClick',
		placement: 'top'
	};

	onMount(async () => {
		const startTime = Date.now();

		const { data } = await api.listingApi.getListing({ id: listingId });
		listingDetails = data;
		const duration = Date.now() - startTime;
		if (duration > 100) {
			const delay = 500 - duration;
			await new Promise((resolve) => setTimeout(resolve, delay));
		}
		dataLoaded = true;
	});
</script>

{#if !dataLoaded}
	<main class="w-full max-w-sm mx-auto md:max-w-2xl md:flex">
		<div class="grid gap-4 cSize" class:animate-pulse={true}>
			<div class="space-y-2">
				<div class="mx-auto flex items-center justify-center w p-4 sm:p-8 w-2 placeholder" />
				<div class="mx-auto text-center placeholder" />
				<div class="mx-auto flex items-center w-28 placeholder" />
				<div class="mx-auto flex items-center w-14 placeholder" />
			</div>
		</div>
	</main>
{:else}
	<main class="w-full max-w-sm mx-auto md:max-w-2xl md:flex">
		<div class="grid gap-4">
			<div class="space-y-2">
				<div class="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
					<Avatar src="https://placehold.co/400" width="w-20" rounded="rounded-full" />
					<!-- <img
						alt="Logo"
						class="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
						height="70"
						src="https://placehold.co/600x400"
						width="140"
					/> -->
				</div>
				<div class="text-center">
					<h3 class="text-2xl font-bold tracking-tighter sm:text-2xl md:text-3xl">
						{listingDetails?.name}
					</h3>
					<p
						class="mx-auto max-w-[700px] md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed"
					>
						{listingDetails?.address.address1}, {listingDetails?.address.city}, {listingDetails
							?.address.postalCode}
					</p>
					<div class="flex justify-center mt-2">
						<Ratings value={3.5} max={5}>
							<svelte:fragment slot="empty"><IStarRegular /></svelte:fragment>
							<svelte:fragment slot="half"><IHalfStarRegular /></svelte:fragment>
							<svelte:fragment slot="full"><IStarSolid /></svelte:fragment>
						</Ratings>
					</div>
					<div class="flex justify-center mt-2">
						{#each listingDetails?.tags.categories as category}
							<span class="chip variant-filled m-1">{category.name}</span>
						{/each}
					</div>
					<div class="flex justify-center space-x-2 p-2">
						<a href={`/listing/${listingDetails?.slug}`} class="btn variant-filled rounded-md">
							<span>Info</span>
							<span class="w-6 text-center">
								<IArrowRightSolid />
							</span>
						</a>
						<a href="/secret" class="btn variant-filled rounded-md">
							<span>Video</span>
							<span class="w-6 text-center">
								<ICameraSolid />
							</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	</main>
{/if}
