<script>
	//@ts-ignore
	import Calendar from '@event-calendar/core';
	//@ts-ignore
	import TimeGrid from '@event-calendar/time-grid';
	//@ts-ignore
	import DayGrid from '@event-calendar/day-grid';
	//@ts-ignore
	import ResourceGrid from '@event-calendar/resource-time-grid';

	let plugins = [TimeGrid, DayGrid, ResourceGrid];
	let options = {
		view: 'dayGridMonth',
		events: [
			// your list of events
		]
	};
</script>

<div class="m-4">
	<Calendar {plugins} {options} />
</div>
