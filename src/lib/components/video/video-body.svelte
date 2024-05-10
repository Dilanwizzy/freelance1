<script lang="ts">
	import Video1 from '$lib/videos/video1.mp4';
	import VideoHeader from '$lib/components/video/video-header.svelte';
	import VideoFooter from '$lib/components/video/video-footer.svelte';
</script>

<div class="videoCard flex justify-stretch my-1 sm:gap-5 w-full min-h-[400px]">
	<div class="videoCard rounded-md overflow-hidden h-full sm:w-fit">
		<VideoHeader />
		<video
			class="videoCard__player object-fill video-js vjs-default-skin min-h-[400px] vjs-fill"
			muted
			controls
			preload="metadata"
		>
			<source src={Video1} type="video/mp4" />
		</video>
		<VideoFooter />
	</div>
	<div
		class="absolute bottom-[5%] right-[5%] flex flex-col justify-end items-center pb-3 rounded-lg mb-[15%] gap-4 bg-gray-100/30 min-h-fit min-w-fit sm:static"
	>
		<div class="flex flex-col justify-center items-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width={1}
				stroke="currentColor"
				class="w-8 h-8"
			>
				<path
					stroke-Linecap="round"
					stroke-Linejoin="round"
					d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
				/>
			</svg>
			<span>122k</span>
		</div>
		<div class="flex flex-col justify-center items-center">
			<img
				width="25"
				height="25"
				src="https://img.icons8.com/ios/50/speech-bubble--v1.png"
				alt="speech-bubble--v1"
			/>
			<span>1,013</span>
		</div>
		<div class="flex flex-col justify-center items-center">
			<img width="30" height="30" src="https://img.icons8.com/ios/50/sent--v1.png" alt="sent--v1" />
		</div>
		<div class="my-4">
			<img
				width="25"
				height="20"
				src="https://img.icons8.com/ios-filled/50/ellipsis.png"
				alt="ellipsis"
			/>
		</div>
		<div>
			<img
				class="h-8 w-8 flex-none rounded"
				src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
				alt="avatar_icon"
			/>
		</div>
	</div>
</div>
