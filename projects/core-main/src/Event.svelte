<script>
	export let event = {};
</script>

<div class="event-list">
	<div class="event-name">
		<p>
			<img src="/static/images/grey-calendar.svg" alt="icon" />
			{#if event.link}
				<a href={event.link} target="_blank">{event.title}</a>
			{:else}
				{event.title}
			{/if}
		</p>
	</div>

	{#if event.location}
		<div class="event-location">{event.location}</div>
	{/if}

	<div class="event-date">
		<p>{event.datetime}</p>
	</div>
</div>

<style lang="scss">
	.event-list {
		border-bottom: 1px solid #e9e9e9;
		padding: 10px 5px;
	}

	.event-name p {
		color: #3b3b3b;
		font-size: 0.875rem;
		padding-right: 40px;
		display: flex;
		margin: 0;
		margin: 10px 0 0 0;

		align-items: flex-start;

		img {
			margin-right: 10px;
		}
	}

	.event-location {
		margin: 0;
		font-size: 0.75rem;
		color: #3a3a3a;
		padding-left: 28px;
	}

	.event-date p {
		margin: 0;
		font-size: 0.75rem;
		color: #a5a5a5;
		padding-left: 28px;
	}
</style>
