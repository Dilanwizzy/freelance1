<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	// import { Map, Popup, Marker } from 'mapbox-gl';
	//temp to resolve commonjs issue
	import pkg from 'mapbox-gl';
	const { Map, Popup, Marker } = pkg;
	
	import { listingStore } from '$lib/stores/listing.store';
	import MapboxPopup from './popup/mapbox-popup.svelte';
	import { get } from 'svelte/store';

	export let coordinates: [number, number];
	export let isUserCoordinates: boolean;

	let map: Map | undefined;
	let mapContainer: HTMLElement;
	let popupContainer: any;
	let popupContentInstance: any;

	const listingStoreUnsub = listingStore.subscribe(() => {
		if (map) {
			updateMapMarkers();
		}
	});

	function updateMapMarkers() {
		const markers = get(listingStore).markers;
		console.log(`test ${markers}`);
		// Update map markers based on new data
		// For example, you can update the 'places' source with new marker data
		if (markers) {
			if (map.getSource('places')) {
				map.getSource('places').setData({
					type: 'FeatureCollection',
					features: markers.map((marker) => ({
						type: 'Feature',
						properties: {
							id: marker.listing.id
						},
						geometry: marker.point
					}))
				});
			}
		}
	}

	onMount(async () => {
		popupContainer = document.createElement('div');
		document.body.appendChild(popupContainer);

		// loadMapMarkers().then((data) => (mapMarkers = data));

		map = new Map({
			container: mapContainer, // ID of the HTML element where the map will be displayed
			accessToken:
				'',
			style: 'mapbox://styles/mapbox/streets-v12',
			center: coordinates, // Set the initial map center
			zoom: 12, // Set the initial zoom level
			minZoom: 6,
			maxZoom: 17
		});

		map.on('load', () => {
			if (map) {
				map.addSource('places', {
					type: 'geojson',
					data: {
						type: 'FeatureCollection',
						features: $listingStore?.markers.map((marker) => ({
							type: 'feature',
							properties: {
								id: marker.listing.id
							},
							geometry: marker.point
						}))
					},
					cluster: true,
					clusterMaxZoom: 10, // Max zoom to cluster points on
					clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
				});

				if (isUserCoordinates) {
					const el = document.createElement('div');
					el.className = 'marker';
					const marker1 = new Marker(el).setLngLat(coordinates).addTo(map);
				}

				map?.addLayer({
					id: 'clusters',
					type: 'circle',
					source: 'places',
					filter: ['has', 'point_count'],
					paint: {
						// Use step expressions (https://docs.mapbox.com/style-spec/reference/expressions/#step)
						// with three steps to implement three types of circles:
						//   * Blue, 20px circles when point count is less than 100
						//   * Yellow, 30px circles when point count is between 100 and 750
						//   * Pink, 40px circles when point count is greater than or equal to 750
						'circle-color': [
							'step',
							['get', 'point_count'],
							'#51bbd6',
							100,
							'#f1f075',
							750,
							'#f28cb1'
						],
						'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40]
					}
				});

				map?.addLayer({
					id: 'cluster-count',
					type: 'symbol',
					source: 'places',
					filter: ['has', 'point_count'],
					layout: {
						'text-field': ['get', 'point_count_abbreviated'],
						'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
						'text-size': 12
					}
				});

				map?.addLayer({
					id: 'unclustered-point',
					type: 'circle',
					source: 'places',
					filter: ['!', ['has', 'point_count']],
					paint: {
						'circle-color': 'Black',
						'circle-radius': 8,
						'circle-stroke-width': 1,
						'circle-stroke-color': '#fff'
					}
				});

				map?.on('click', 'clusters', (e) => {
					const features = map?.queryRenderedFeatures(e.point, {
						layers: ['clusters']
					});
					const clusterId = features[0].properties.cluster_id;
					map?.getSource('places').getClusterExpansionZoom(clusterId, (err, zoom) => {
						if (err) return;

						map?.easeTo({
							center: features[0].geometry.coordinates,
							zoom: zoom
						});
					});
				});

				map?.on('click', 'unclustered-point', async (e) => {
					const coordinates = e.features[0].geometry.coordinates.slice();
					const description = e.features[0].properties.description;
					const listingId = e.features[0].properties['id'];

					// Ensure that if the map is zoomed out such that multiple
					// copies of the feature are visible, the popup appears
					// over the copy being pointed to.
					while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
						coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
					}

					// Remove the previous popup content instance if exists
					if (popupContentInstance) {
						popupContentInstance.$destroy();
					}

					popupContentInstance = new MapboxPopup({ target: popupContainer, props: { listingId } });

					new Popup()
						.setLngLat(coordinates)
						.setDOMContent(popupContainer)
						.setMaxWidth('320px')
						.addTo(map);
				});

				map?.on('remove', 'unclustered-point', async (e) => {});

				map?.on('mouseenter', 'unclustered-point', () => {
					map.getCanvas().style.cursor = 'pointer';
				});

				// Change it back to a pointer when it leaves.
				map?.on('mouseleave', 'unclustered-point', () => {
					map.getCanvas().style.cursor = '';
				});
			}
		});
	});

	// async function loadMapMarkers() {
	// 	const { data } = await api.searchApi.getBusinessByFilter({
	// 		businessTypes: [],
	// 		categories: [],
	// 		markers: true,
	// 		total: 0,
	// 		limit: 0,
	// 		skip: 0
	// 	});

	// 	// const { data } = await api.addressApi.getMarkers();

	// 	// console.log(data);

	// 	return data.markers;
	// }

	onDestroy(async () => {
		listingStoreUnsub();
		map?.remove();
		if (popupContentInstance) {
			popupContentInstance.$destroy();
		}

		if (userMarkerInstance) {
			userMarkerInstance.$destroy();
		}
	});
</script>

<div class="max-h-[680px] p-2 rounded-lg">
	<div class="w-full h-[580px] justify-center" id="map" bind:this={mapContainer} />
</div>
