<script>
	import Calendar from '@event-calendar/core';
	import TimeGrid from '@event-calendar/time-grid';
	import DayGrid from '@event-calendar/day-grid';
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
