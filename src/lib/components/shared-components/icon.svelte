<script lang="ts">
	import { SvelteComponent } from 'svelte';
	import { IconList } from '$lib/components/icons';

	export let iconName: string = '';
	export let size: number = 1;

	function findIconComponent(iconName: string): typeof SvelteComponent | undefined {
		const icon = IconList.find((icon) => icon.name === iconName);
		return icon ? icon.component : undefined;
	}

	let matchedComponent = findIconComponent(iconName);
</script>

{#if matchedComponent}
	<svelte:component this={matchedComponent} style="font-size: {size}rem;" />
{/if}
