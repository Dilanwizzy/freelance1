<script lang="ts">
	import { IconPosition } from '$lib/components/enums';
	import Icon from '$lib/components/shared-components/icon.svelte';

	export let title: string;
	export let selected: boolean = false;
	export let iconPosition: IconPosition = IconPosition.TOP;
	export let iconName: string;
</script>

<div
	class="btn flex flex-col gap-1 bg-surface-200-700-token rounded-container-token hover:scale-105 hover:shadow-md hover:cursor-pointer"
	class:selectedBg={selected}
>
	{#if iconPosition == IconPosition.TOP}
		<Icon {iconName} />
		<div class="text-xs" style="margin: 0px;">
			<span>{title}</span>
		</div>
	{/if}
	{#if iconPosition == IconPosition.LEFT}
		<div class="flex items-center">
			<span class="pr-1">
				<Icon {iconName} size={1.2}/>
			</span>
			<div class="text-xs" style="margin: 0px;">
				<span>{title}</span>
			</div>
		</div>
	{/if}
</div>

<style>
	.selectedBg {
		@apply variant-filled shadow-md;
	}
</style>
