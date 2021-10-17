<script>
	import { createEventDispatcher } from "svelte";

	export let left = "Off";
	export let right = "On";
	export let checked = false;
	export let disabled = false;

	const dispatch = createEventDispatcher();
</script>
<div class="left">{left}</div>
<!-- Toggle A -->
<div class="Toggle flex items-center">
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label class="flex items-center cursor-pointer">
		<!-- toggle -->
		<div class="relative">
			<!-- input -->
			<input
				type="checkbox"
				class="sr-only"
				bind:checked
				{disabled}
				on:change={(e) => {
					dispatch("change", e.currentTarget.checked);
				}}
			/>
			<!-- line -->
			<div class="line w-10 h-4 bg-gray-200 rounded-full shadow-inner" />
			<!-- dot -->
			<div
				class:bg-green-400={checked}
				class="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"
			/>
		</div>
		<!-- label -->
		<div class="ml-3 text-gray-700 font-medium">
			<slot {checked} />
		</div>
	</label>
</div>
<div class="right">{right}</div>

<style>
	input:checked ~ .dot {
		transform: translateX(100%);
	}
	.left{
		margin-left: 2rem;
	}
	.right{
		margin-left: 10px;
	}
</style>
