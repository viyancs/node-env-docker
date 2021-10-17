<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

<div class="flex flex-col justify-center items-center w-screen h-screen">
	<button on:click={() => dispatch('click')}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-36 w-36"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
			/>
		</svg>
	</button>

	<h1 class="pt-4 font-bold text-2xl">No internet connection</h1>
</div>
