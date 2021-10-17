<script>
	export let message;
	export let event;
	export let sent;
	export let user;
</script>

<div class="chat send">
	<div class="chat-inner-re">
		<img src="/static/avatars/{user.avatar}" class="avatar" alt="" />
		<div class="chat-box">
			<p>
				{message}
			</p>
			{#if event.validated}
				<div class="calendar-detail">
					<img
						src="/static/images/calendar-light.svg"
						alt=""
						class="calendar-icon"
					/>
					<p>
						<strong>{event.eventTitle}</strong> <br />
						{event.start_fmt}
						{event.end_fmt ? `- ${event.end_fmt}` : ""}
					</p>
					<button
						js-save-event
						class="btn btn-outline"
						data-event-id={event.id}
					>
						Save Event
					</button>
				</div>
			{/if}
		</div>
	</div>
	<p class="date-time">{sent}</p>
</div>
