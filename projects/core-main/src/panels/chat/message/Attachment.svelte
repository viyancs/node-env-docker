<script>
	import { createEventDispatcher, onMount } from "svelte";
	import { spring } from "svelte/motion";

	/**
	 * @type {File}
	 */
	export let file;
	export let uploadObserver;

	const reader = new FileReader();
	let src;

	let progress = spring(0);

	onMount(() => {
		reader.onload = function (e) {
			src = e.target.result;
		};
		reader.readAsDataURL(file);

		let unsubscribe;
		if (uploadObserver) {
			unsubscribe = uploadObserver((snapshot) => {
				$progress = snapshot.bytesTransferred * (100 / snapshot.totalBytes);
			});
		}

		return () => {
			unsubscribe?.();
		};
	});

	const dispatch = createEventDispatcher();
</script>

<div class="attachement relative rounded overflow-hidden">
	<button
		class=" absolute inset-0 justify-center items-center"
		on:click={() => {
			dispatch("dismiss");
		}}
	>
		<svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M6 18L18 6M6 6l12 12"
			/>
		</svg>
	</button>
	<img {src} alt={file.name} />
	<progress max="100" value={$progress} />
</div>

<style>
	div.attachement {
		height: 48px;
		width: 48px;
	}
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	button {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: none;
		background-color: rgba(0, 0, 0, 0.4);
		transition: display 0.3s;
		z-index: 2;
	}
	button svg {
		stroke: rgb(247, 247, 247);
	}
	.attachement:hover button {
		display: flex;
		transition: display 0.3s;
	}
	progress {
		width: 100%;
		height: 100%;
		opacity: 0.4;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
	}
	progress::-webkit-progress-value {
		background-color: black;
	}
</style>
