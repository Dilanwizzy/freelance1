<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { commonRoutes, navPages } from '$lib/utils/constants';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import Profile from './profile.navigation.svelte';

	$: currentPage = $page.data.meta?.title;

	export let user;
</script>

<div class="space-x-2 flex">
	{#each navPages as navPage}
		{#if user?.id && navPage.name == 'Login'}
			<Profile />
		{:else if currentPage == navPage.name}
			<div>
				<a href={navPage.path} class="btn variant-filled-tertiary">
					<span>{navPage.name}</span>
				</a>
			</div>
		{:else}
			<div>
				<a href={navPage.path} class="btn variant-filled-surface">
					<span>{navPage.name}</span>
				</a>
			</div>
		{/if}
	{/each}
	<div class="self-center">
		<LightSwitch />
	</div>
</div>
