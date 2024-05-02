<script lang="ts">
	import Video1 from '$lib/videos/video1.mp4';
	import VideoHeader from '$lib/components/video/video-header.svelte';
	import VideoFooter from '$lib/components/video/video-footer.svelte';
</script>

<div class="videoCard">
	<VideoHeader />
	<video class="videoCard__player" autoplay loop muted>
		<source src={Video1} type="video/mp4" />
	</video>

	<VideoFooter />
</div>
