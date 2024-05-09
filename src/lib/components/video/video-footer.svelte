<script lang="ts">
	import Icon from '$lib/components/shared-components/icon.svelte';
	import { Avatar } from '@skeletonlabs/skeleton';
</script>

<div class="videoFooter absolute bottom-1 flex justify-between items-center px-5 min-w-full">
	<div class="flex flex-col justify-start gap-2 items-center">
		<div class="videoFooter_text flex flex-col justify-start items-start">
			<Avatar initials="df" />
			<h3 class="text-white">
				Hello.
				<button>Follow</button>
			</h3>
		</div>
		<div class="videoFooter_ticker text-left text-black font-medium bg-gray-200/25 px-1">
			DilanWizzy
		</div>
		<div class="videoFooter_actionsLeft flex flex-col justify-start items-center text-white">
			<Icon iconName="arrow-right" />
			<Icon iconName="arrow-right" />
			<Icon iconName="arrow-right" />
			<Icon iconName="arrow-right" />
		</div>
	</div>
	<div class="videoFooter_actionsRight flex flex-col justify-end self-end items-center text-white">
		<div class="vidoeFooter_stat flex justify-center items-center">
			<Icon iconName="arrow-right" />
			<p>23</p>
		</div>
		<div class="videoFooter_stat flex justify-center items-center">
			<Icon iconName="arrow-right" />
			<p>34</p>
		</div>
	</div>
</div>
