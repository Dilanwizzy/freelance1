<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import type { LayoutData } from './$types';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import NavigationLoadingBar from '$lib/components/shared-components/navigation-loading-bar.svelte';
	import LeftSideBarNavigation from '$lib/components/shared-components/navigation/side-bar-navigation.svelte';
	import { AppBar, AppShell } from '@skeletonlabs/skeleton';
	import logo from '$lib/images/logo.png';
	import { initializeStores, Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import TopBarNavigation from '$lib/components/shared-components/navigation/top-bar-navigation.svelte';
	import { autoModeWatcher } from '@skeletonlabs/skeleton';
	import { navPages } from '$lib/utils/constants';
	import { onDestroy } from 'svelte';

	//popup
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	export let data: LayoutData;

	$: pageHeader = showHeader($page.url.pathname);

	initializeStores();
	const drawerStore = getDrawerStore();

	function drawerOpen(): void {
		drawerStore.open({});
	}

	function showHeader(pathname: string): string {
		let classN = '';
		console.log(pathname);
		navPages.forEach((navPage) => {
			if (navPage.path === pathname && !navPage.enableHeader) {
				classN = 'hidden';
			}
		});

		return classN;
	}
</script>

<svelte:head>
	{@html '<script>(' + autoModeWatcher.toString() + ')();</script>'}

	<title>{$page.data.meta?.title || 'Black'} - Black</title>
	<link rel="manifest" href="/manifest.json" />
	<meta name="theme-color" content="currentColor" />
	<!-- <FaviconHeader />
	<AppleHeader /> -->

	{#if $page.data.meta}
		<meta name="description" content={$page.data.meta.description} />

		<!-- Facebook Meta Tags -->
		<meta property="og:type" content="website" />
		<meta property="og:title" content={$page.data.meta.title} />
		<meta property="og:description" content={$page.data.meta.description} />
		<meta property="og:image" content={$page.data.meta.imageUrl} />

		<!-- Twitter Meta Tags -->
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:title" content={$page.data.meta.title} />
		<meta name="twitter:description" content={$page.data.meta.description} />
		<meta name="twitter:image" content={$page.data.meta.imageUrl} />
	{/if}
</svelte:head>

<noscript class="absolute z-[1000] flex h-screen w-screen place-content-center place-items-center">
</noscript>

<Drawer width="w-[280px]" padding="p-4" position="right">
	<LeftSideBarNavigation />
</Drawer>
<AppShell slotSidebarLeft="bg-surface-500/5 w-0 lg:w-64">
	<svelte:fragment slot="header">
		<AppBar
			class="text-2xl {pageHeader}"
			gridColumns="grid-cols-3"
			slotDefault="place-self-center"
			slotTrail="place-content-end"
		>
			<svelte:fragment slot="lead">
				<div class="flex items-center space-x-4">
					<a href="/" class="lg:!ml-0 w-[48px] lg:w-auto overflow-hidden">
						<img src={logo} class=" w-12 h-12" />
					</a>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<button class="btn-icon btn-icon-sm lg:!hidden" on:click={drawerOpen}>
					<span>
						<svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
							<rect width="100" height="20" />
							<rect y="30" width="100" height="20" />
							<rect y="60" width="100" height="20" />
						</svg>
					</span>
				</button>
				<div class="hidden lg:block">
					<TopBarNavigation user={data.user} />
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- <svelte:fragment slot="sidebarLeft">
		<Navigation />
	</svelte:fragment> -->
	<slot />
	<!-- <svelte:fragment slot="pageFooter">Page Footer</svelte:fragment> -->
</AppShell>
<!-- {#if showNavigationLoadingBar}
	<NavigationLoadingBar />
{/if} -->
