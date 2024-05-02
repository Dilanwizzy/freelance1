<script lang="ts">
	import Mapbox from '$lib/components/mapbox/mapbox.svelte';
	import 'mapbox-gl/dist/mapbox-gl.css';
	import SearchHeader from '$lib/components/shared-components/search-header/search-header.svelte';
	import { onMount } from 'svelte';
	import { api } from '@api';
	import { search } from '$lib/stores/search.store';

	let userLocation: [number, number];
	let isUserCoordinates: boolean = false;

	onMount(async () => {
		if (!$search.markers) {
			search.update((storeValue) => {
				return { ...storeValue, markers: true };
			});
		}

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					userLocation = [longitude, latitude];
					isUserCoordinates = true;
				},
				async (error) => {
					//Fallback(
					const { data } = await api.addressApi.getLocationByIP();
					userLocation = [data.point.coordinates[0], data.point.coordinates[1]];
					console.error('Error getting user location:', error.message);
				},
				{ enableHighAccuracy: true }
			);
		} else {
			const { data } = await api.addressApi.getLocationByIP();
			userLocation = [data.point.coordinates[0], data.point.coordinates[1]];
			console.error('Geolocation is not supported by this browser.');
		}
	});
</script>

<div class="container mx-auto">
	<div class="my-4">
		<SearchHeader />
	</div>
	{#if userLocation}
		<Mapbox {isUserCoordinates} coordinates={userLocation} />
	{/if}
</div>
