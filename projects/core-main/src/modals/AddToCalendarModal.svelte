<script>
	export let message;

	$: event = message?.event;
	$: invited = message?.invited;
</script>

<div
	class="modal"
	class:open={event}
	id="addToCalendar"
	tabindex="-1"
	role="dialog"
	aria-hidden="true"
	js-event={event?.id}
>
	<div class="modal-dialog modal-md" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="exampleModalLabel">Create Event</h5>
				<button
					type="button"
					class="close"
					data-dismiss="modal"
					aria-label="Close"
					on:click={() => (message = undefined)}
				>
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<div class="createEventWrapper">
					<p class="pb-4 px-0 m-0 ">
						<span class="modal-event-title text-xl font-bold">{event?.eventTitle}</span>
					</p>

					<div class="text-sm">Start on:</div>
					<div class="text-lg">{event?.start_fmt}</div>

					{#if event?.end_fmt}
						<div class="text-sm">Ends on:</div>
						<div class="text-lg">{event?.end_fmt}</div>
					{/if}
					<br />
					<div class="">Also invite</div>
					<div class="modal-also-invite">
						{#each invited ?? [] as user}
							<div class="form-check py-2">
								<input class="form-check-input" type="checkbox" value="" id="user-{user?.id}" />
								<label class="form-check-label" for="user-{user?.id}">
									{user?.first}
									{user?.last} ({user?.role})
								</label>
							</div>
						{/each}
					</div>
					<div class="flex justify-center items-center pt-4">
						<button type="text" class="btn btn-primary"> Add to calendar </button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.modal {
		display: none;
	}
	.modal.open {
		display: flex;
	}
	.modal-checkbox {
		float: left;
		width: 50px !important;
	}
	.createEventWrapper {
		> p {
			font-size: 0.875rem;
			width: 100%;
			max-width: 225px;
		}

		input.form-control {
			border: 2px solid #76309a;
			background: transparent;
			margin-bottom: 12px;
			height: 25px;
			width: 100%;
			max-width: 200px;
			border-radius: 20px;
			font-size: 0.875rem;
		}

		.btn.btn-primary {
			background: linear-gradient(90deg, #6e319c 6.04%, #942d93 100%);
			border-radius: 30px;
			padding: 12px 25px;
			font-size: 0.875rem;
			border: none;
		}
	}
	.modal-label {
		font-size: 1rem !important;
		float: left;
		padding-top: 1px;
	}
	.modal-invite-row {
		justify-content: left;
		align-items: left;
		height: 80px;
	}
	.createEventWrapper > p {
		font-size: 0.875rem;
		width: 100%;
		max-width: 225px;
	}
</style>
