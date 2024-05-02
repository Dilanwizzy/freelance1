<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container mx-auto w-full h-full">
	<header>
		<img
			src="https://images.unsplash.com/photo-1620562303747-ba21ca6f1530?ixid=M3w0Njc5ODF8MHwxfGFsbHx8fHx8fHx8fDE2ODc5NzY2MjR8&ixlib=rb-4.0.3&w=400&h=175&auto=format&fit=crop"
			class="bg-black/50 w-full b-img h-[250px]"
			alt="Post"
		/>
	</header>
    <div class="flex justify-between">
        <div class="-mt-6 p-2">
            <Avatar initials="JP" width="w-24" rounded="rounded-full" />
        </div>
        <div>
            <div class="flex">
                <span class="chip variant-filled-success m-1">Open</span>
            </div>
        </div>
    </div>
	<h1>Listing: {data.listing.name}</h1>
</div>
