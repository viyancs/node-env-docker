<script>
	import { get } from './Context.svelte';
	import Event from './Event.svelte';
	import { TabPane } from 'sveltestrap';

	const context = get();

	$: artistEvents = $context.artistEvents;
</script>

<TabPane tabId="artist-events">
	<span slot="tab">Artists</span>
	<div class="event-wrapper">
		{#each artistEvents as event}
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
