<script lang="ts">
	import Icon from '$lib/components/shared-components/icon.svelte';
	import { commonRoutes } from '$lib/utils/constants';
</script>

<div class="container mx-auto w-full h-[540px]">
	<h1>What do you want to add?</h1>
	<div class="w-full h-full self-center py-8 px-4">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			<a href={commonRoutes.registerListing}>
				<div class="card card-hover variant-filled p-4 h-[160px]">
					<div class="w-full h-full flex items-center justify-center flex-col">
						<Icon iconName="shop" size={4} />
						<span class=" text-4xl font-bold">Add new Listing</span>
					</div>
				</div>
			</a>

			<a href={commonRoutes.registerEvent}>
				<div class="card card-hover variant-filled p-4 h-[160px]">
					<div class="w-full h-full flex items-center justify-center flex-col">
						<Icon iconName="shop" size={4} />
						<span class=" text-4xl font-bold">Add new Event</span>
					</div>
				</div>
			</a>
			<a href={commonRoutes.registerGroup}>
				<div class="card card-hover variant-filled p-4 h-[160px]">
					<div class="w-full h-full flex items-center justify-center flex-col">
						<Icon iconName="shop" size={4} />
						<span class=" text-4xl font-bold">Add new Group</span>
					</div>
				</div>
			</a>
		</div>
	</div>
</div>
