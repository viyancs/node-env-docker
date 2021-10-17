<script>
	import { onMount } from "svelte";
	import { spring } from "svelte/motion";
	import Toggle from "../sidebars/Toggle.svelte";
	import Calendar from "./Calendar.svelte";
	import {writable} from 'svelte/store'
	const tween = spring(1, { stiffness: 0.07, damping: 0.7 });

	export let isOpen = false;
	export let url = "/events.json";
  let headerHeight = 0;
  onMount(() => {
    headerHeight =  document.querySelector(".navbar-wrapper").getBoundingClientRect().height
  })



	$: if (isOpen) {
		$tween = 0;
	} else {
		$tween = 1;
	}
	/* stores are more predictable than $: syntax */
	/* need to see the value of hide inside the calendar component*/
	/* to check if it is DayGridMonth and have to re-render*/

	const hide = writable("")
	$: $hide = $tween >= 1 ? "hide" : "";
</script>

<div class="calendar-modal absolute {$hide}" style={"opacity:" + (1 - $tween)}>
	<div class="inner relative w-full h-full" style="height: calc(100vh - {headerHeight}px);" >
		<div
			class="dialog h-full shadow-sm border-1 border-gray-200 rounded"
			style="transform: translate(-50%, {$tween * 100}%)"
		>
			<div class="dialog-inner">
				<Toggle bind:open={isOpen} top x={-50} y={0} r={$tween * 180} />

				<div class="calendar-view">

						<Calendar {hide}  />
			
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.calendar-toggle-modal {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translate(-50%, -96%);
		border-radius: 0;
		background: #fff;
	}
	.calendar-modal {
		/*top: 0;*/
		right: 0;
		bottom: 0;
		left: 0;
		display: flex;

		&.hide {
			display: none;
		}

		.dialog {
			width: 92vw;
			// height: 100%;
			position: absolute;
			left: 50%;
			//margin-top: 4vh;
			background-color: #fff;
			z-index: 999999;
			// box-shadow: -2px -2px 6px #c7c7c7;

			.dialog-inner {
				position: relative;
				padding: 1rem;
			}
		}
	}

	:global(.modal-content.calendar) {
		margin: auto;
		margin-top: 2em;
		height: 100%;
		width: 92vw;
	}
	.calendar-view :global(h2.fc-toolbar-title) {
		font-size: 2.25rem !important;
		padding: 2.25rem;
	}

	.calendar-modal {
		z-index: 2048;
	}
	.calendar-modal
		:global(.fc-daygrid-event-harness:nth-of-type(1) a.fc-daygrid-event) {
		background: linear-gradient(270deg, #00b2ff 0%, #007bff 100%);
	}
	.calendar-modal
		:global(.fc-daygrid-event-harness:nth-of-type(2) a.fc-daygrid-event) {
		background: linear-gradient(270deg, #ffc800 0%, #ff9600 100%);
	}
	.calendar-modal
		:global(.fc-daygrid-event-harness:nth-of-type(3) a.fc-daygrid-event) {
		background: linear-gradient(270deg, #38ff63 0%, #2aa144 100%);
	}
	.calendar-modal :global(.fc-daygrid-event-dot) {
		visibility: hidden;
	}
	.calendar-modal :global(.fc-daygrid-event-harness) {
		color: white;
	}
</style>
