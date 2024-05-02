<script lang="ts">
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { navPages } from '$lib/utils/constants';
	import { LightSwitch } from '@skeletonlabs/skeleton';

	const drawerStore = getDrawerStore();

	$: currentPage = $page.data.meta?.title;

	function drawerClose(): void {
		drawerStore.close();
	}
</script>

<div>
	<div class="flex justify-between">
		<div class="p-4">
			<h2 >Navigation</h2>
		</div>
		<div class="p-4">
			<LightSwitch />
		</div>
	</div>

	<hr />
	<nav class="list-nav p-4">
		<ul>
			{#each navPages as navPage}
				<li>
					{#if currentPage == navPage.name}
						<a href={navPage.path} class="btn variant-filled-tertiary" on:click={drawerClose}>
							<span>{navPage.name}</span>
						</a>
					{:else}
						<a href={navPage.path} class="btn variant-filled-surface" on:click={drawerClose}>
							<span>{navPage.name}</span>
						</a>
					{/if}
				</li>
			{/each}
		</ul>
	</nav>
</div>
