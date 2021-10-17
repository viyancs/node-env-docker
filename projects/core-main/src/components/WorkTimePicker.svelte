<script>
	import Flatpickr from 'svelte-flatpickr';
	import 'flatpickr/dist/flatpickr.css';
	
	export let lower; // "9:00"
	export let upper; // "16:30"
	let lowerTime = {
		enableTime: true,
		noCalendar: true,
		dateFormat: "H:i",
		maxTime: upper, // "16:30"
		defaultDate: lower || "9:00" // "9:00"
	}
	let upperTime = {
		enableTime: true,
		noCalendar: true,
		dateFormat: "H:i",
		minTime: lower, // "9:00"
		defaultDate: upper || "16:30" // "16:30"
	}
	function handleChangeLower(event) {
		const [ selectedDates, dateStr ] = event.detail;
		upperTime.minTime = dateStr
		lowerTime.defaultDate = dateStr
        lower = dateStr
	}
	const handleChangeUpper = (event) => {
		const [ selectedDates, dateStr ] = event.detail;
		lowerTime.maxTime = dateStr
		upperTime.defaultDate = dateStr
        upper = dateStr
	}
</script>

<div class="flex items-center">
	<div class="mr-2">
		From
	</div>
	<div class="mr-2 w-20">
		<Flatpickr value={lowerTime.defaultDate} options={lowerTime} on:change={handleChangeLower} />
	</div>
	<div class="mr-2">
		To
	</div>
	<div class="mr-2 w-20">
	
		<Flatpickr value={upperTime.defaultDate} options={upperTime} on:change={handleChangeUpper} />
	</div>
</div>


<style>
	:global(.flatpickr-input) {
		width: 100%;
	}
</style>
