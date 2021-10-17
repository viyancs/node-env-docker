<script>
	import { get } from './Context.svelte';
	import Event from './Event.svelte';
	import { TabPane } from 'sveltestrap';

	const context = get();

	$: events = $context.events;
</script>

<TabPane tabId="events" active>
	<span slot="tab">Events</span>
	<div class="event-wrapper">
		{#each events as event}
			<Event {event} />
		{/each}
	</div>
</TabPane>

<style lang="scss">
	.event-wrapper {
		height: 45vh;
		overflow: auto;
	}
</style>
