<script lang="ts">
	import Video from '$lib/components/video/video-body.svelte';
</script>

<!-- <div>
	<div
		class="max-w-[375px] mx-auto w-full h-screen flex flex-col justify-center snap-start sm:pt-20"
	>
		<Video />
	</div>
</div> -->

<div class="h-dvh flex flex-grow flex-col">
	<div class="relative w-full h-full overflow-hidden">
		<div class="w-full h-full flex flex-col justify-start">
			<div class="self-center">
				<div class="w-full h-full py-8 px-8">
					<div class="">
						<div
							class="h-full w-full md:w-[420px] overflow-y-scroll hide-scrollbar md:max-w-[800px] snap-y snap-mandatory"
						>
							<div class="h-full w-full">
								<Video />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
