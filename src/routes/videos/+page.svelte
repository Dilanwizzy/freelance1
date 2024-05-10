<script lang="ts">
	import { inview } from 'svelte-inview';
	import type { ObserverEventDetails } from 'svelte-inview';

	import Video from '$lib/components/video/video-body.svelte';
</script>

<div class="flex justify-center min-w-full bg-white gap-0 lg:justify-start h-full lg:gap-[10%]">
	<div class="hidden lg:flex flex-col ml-[12%]">
		<ul role="list" class="divide-y mx-auto mt-[150px] divide-white">
			<li class="flex justify-between items-center py-2 px-4 mb-4 bg-stone-300">
				<p class="text-sm font-semibold leading-6 text-gray-800">Type</p>
				<p class="mt-1 truncate text-xs leading-5 text-gray-800">Categories</p>
			</li>
			<li class="flex justify-between items-center py-1 px-1 mb-0.5 bg-stone-300">
				<div class="flex justify-start items-center h-18 min-w-0">
					<img
						class="h-12 w-12 flex-none rounded-full"
						src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
						alt="brand_icon"
					/>
					<div class="flex flex-col items-start min-w-0">
						<p class="text-md mb-1 ml-5 font-bold leading-5 text-black">Name</p>
						<div class="flex flex-row ml-2 min-w-0">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="black"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-4 h-4 mr-1"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
								/>
							</svg>
							<p class="text-xs text-black">+ 44 70000000000</p>
						</div>
					</div>
				</div>
			</li>
			<li class="flex justify-between items-center py-2 px-1 bg-stone-300">
				<div class="flex flex-row justify-stretch items-center">
					<a href="#">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 21 21"
							stroke-width="0.9"
							stroke="currentColor"
							class="w-6 h-7"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="0"
								fill="white"
								d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
							/>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="0"
								fill="gray"
								d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
							/>
						</svg>
					</a>
					<p class="text-sm font-semibold leading-4 ml-2 text-gray-700">Location (2miles away)</p>
				</div>
				<div class="flex flex-row justify-stretch items-center mr-2">
					<a href="#" class=" hover:text-blue-400">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-5 h-5 mr-1"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
							/>
						</svg>
					</a>
					<a href="#">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="red"
							viewBox="0 0 24 24"
							stroke-width={0}
							stroke="currentColor"
							class="w-6 h-6"
						>
							<path
								stroke-Linecap="round"
								stroke-Linejoin="round"
								d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
							/>
						</svg>
					</a>
				</div>
			</li>
		</ul>
	</div>
	<div class="flex h-full sm:w-fit">
		<div class="scrollbar-hide overflow-y-auto h-dvh min-h-[400px]">
			<Video />
			<Video />
			<Video />
		</div>
	</div>
</div>
