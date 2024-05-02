<script lang="ts">
	import { initialSearch, search } from '$lib/stores/search.store';
	import { onDestroy, onMount, tick } from 'svelte';
	import { type CategoriesDto, type TypeDto, api } from '@api';
	import CardAction from '$lib/components/shared-components/card-action.svelte';
	import { IconPosition } from '$lib/components/enums';
	import Icon from '../icon.svelte';
	import SearchType from '$lib/components/shared-components/search-header/search-type.svelte';

	let listingTypes: TypeDto[] = [];
	let listingCategories: CategoriesDto[] = [];
	let isContentOverflowing: boolean = false;

	$: selectedType = $search.listingTypes ? $search.listingTypes[0] : '';
	$: selectedCategories =
		$search.categories && $search.categories[0] ? $search.categories[0].split(',') : [];

	let elemMovies: HTMLDivElement;

	function multiColumnLeft(): void {
		console.log(isContentOverflowing);
		let x = elemMovies.scrollWidth;
		if (elemMovies.scrollLeft !== 0) x = elemMovies.scrollLeft - elemMovies.clientWidth;
		elemMovies.scroll(x, 0);
	}

	function multiColumnRight(): void {
		let x = 0;
		// -1 is used because different browsers use different methods to round scrollWidth pixels.
		if (elemMovies.scrollLeft < elemMovies.scrollWidth - elemMovies.clientWidth - 1)
			x = elemMovies.scrollLeft + elemMovies.clientWidth;
		elemMovies.scroll(x, 0);
	}

	async function toggleButtons() {
		await tick();
		if (elemMovies) {
			isContentOverflowing = elemMovies.scrollWidth > elemMovies.clientWidth;
		}
	}

	async function toggleCategoriesByselectedType(type: string) {
		if (selectedType == type) {
			search.set(initialSearch);
			listingCategories = [];
			console.log($search);
			return;
		}

		search.update((storeValue) => {
			return { ...storeValue, listingTypes: [type], categories: [] };
		});

		for (let listingType of listingTypes) {
			if (listingType.slug == type) {
				listingCategories = listingType.categories;
			}
		}
	}

	function selectedCategory(category: string): void {
		const indexOfSelectedCat = selectedCategories.indexOf(category);
		if (indexOfSelectedCat !== -1) {
			selectedCategories.splice(indexOfSelectedCat, 1);
			let categories = selectedCategories.join(',');
			let newCategories = categories == '' ? [] : [categories];

			search.update((storeValue) => {
				return { ...storeValue, categories: newCategories };
			});
			return;
		}

		search.update((storeValue) => {
			return {
				...storeValue,
				categories: [
					selectedCategories.join(',') + `${selectedCategories.length > 0 ? ',' : ''}${category}`
				]
			};
		});
	}

	onMount(async () => {
		const { data } = await api.searchApi.getAllSearchFilters();
		listingTypes = data.types;

		await toggleButtons();
		if (typeof window !== 'undefined') {
			window.addEventListener('resize', toggleButtons); // Add event listener for window resize
		}
	});

	onDestroy(async () => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('resize', toggleButtons); // Add event listener for window resize
		}
	});
</script>

<div class="space-y-4">
	<div class="grid grid-cols-3 gap-4">
		<div class="flex gap-2 pb-2 px-2">
			<div>
				<CardAction title="Location" iconPosition={IconPosition.LEFT} iconName="location-dot" />
			</div>
			{#if !$search.markers}
				<SearchType />
			{/if}
		</div>
	</div>
	<div class="grid grid-cols-[auto_1fr_auto] items-center">
		<!-- {#if isContentOverflowing}
			<button type="button" class="btn-icon variant-filled" on:click={multiColumnLeft}>
				<i class="fa-solid fa-arrow-left" />
			</button>
		{/if} -->

		<!-- Carousel -->
		<div
			bind:this={elemMovies}
			class="snap-x snap-mandatory rm-scroll scroll-smooth flex gap-2 pb-2 overflow-x-auto px-2"
		>
			{#each listingTypes as type, index}
				<div id={type.slug}>
					<button on:click={() => toggleCategoriesByselectedType(type.slug)}>
						<CardAction
							title={type.name}
							selected={selectedType == type.slug}
							iconPosition={IconPosition.TOP}
							iconName={type.icon}
						/>
					</button>
				</div>
			{/each}
		</div>
		<!-- Button-Right -->
		<!-- {#if isContentOverflowing}
			<button type="button" class="btn-icon variant-filled" on:click={multiColumnRight}>
				<i class="fa-solid fa-arrow-right" />
			</button>
		{/if} -->
	</div>
	{#if listingCategories.length > 0}
		<div class="grid grid-cols-[auto_1fr_auto] items-center">
			<!-- {#if isContentOverflowing}
				<button type="button" class="btn-icon bg-transparent absolute" on:click={multiColumnLeft}>
					<Icon iconName="arrow-right"/>
				</button>
			{/if} -->

			<!-- Carousel -->
			<div
				bind:this={elemMovies}
				class="snap-x snap-mandatory rm-scroll scroll-smooth flex gap-2 pb-2 overflow-x-auto px-2"
			>
				<!-- <div>
					<CardAction title="Search" iconName="search" />
				</div> -->
				{#each listingCategories as category, index}
					<div id={category.slug}>
						<button on:click={() => selectedCategory(category.slug)}>
							<CardAction
								title={category.name}
								selected={selectedCategories.includes(category.slug)}
								iconName=""
							/>
						</button>
					</div>
				{/each}
			</div>
			<!-- Button-Right -->
			<!-- {#if isContentOverflowing}
				<button type="button" class="btn-icon variant-filled" on:click={multiColumnRight}>
					<i class="fa-solid fa-arrow-right" />
				</button>
			{/if} -->
		</div>
	{/if}
</div>
