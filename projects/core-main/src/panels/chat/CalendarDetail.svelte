<script>
	import { getContext, onMount } from 'svelte';
	import { spring } from 'svelte/motion';

	export let message;

	const calendarEvent = getContext("");

	const tween = spring(0);

	onMount(() => {
		setTimeout(() => ($tween = 1), 300);
	});
</script>

<div
	class="calendar-detail flex flex-col m-0 mt-2"
	style={`opacity:${$tween}; height:${$tween * 100}%`}
>
	<div class="flex space-x-2">
		<img src="/static/images/calendar-light.svg" alt="" class="calendar-icon" />
		<div class="font-bold text-white">{message.event.eventTitle}</div>
	</div>
	<p class="flex-1">
		{message.event.start_fmt}
		{message.event.end_fmt ? ' - ' + message.event.end_fmt : ''}
	</p>
	<button
		js-save-event
		class="btn btn-outline p-2"
		data-event-id={message.id}
		on:click
		on:click={() => {
			console.log(message);
			$calendarEvent = message;
		}}
	>
		Save Event
	</button>
</div>

<style lang="scss">
	.calendar-detail {
		p {
			color: #ffffff;
			font-size: 12px;

			img {
				margin-right: 5px;
			}
		}

		.btn {
			height: fit-content;
			padding: 2px 5px;
			margin: auto 0 auto 20px;
		}
		.btn.btn-outline {
			border-radius: 20px;
			color: #7838a2;
			border: 1px solid #7838a2;
			font-size: 0.75rem;
			background: #fff;
		}
	}
</style>
