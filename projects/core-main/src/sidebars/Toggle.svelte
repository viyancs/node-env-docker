<script>
	export let open = false;
	export let right = false;
	export let left = false;
	export let top = false;

	export let x = 0;
	export let y = 0;

	export let r = 0;

	let _class = '';
	export { _class as class };
	export let style = '';
</script>

<div
	class="toggle absolute bg-white z-20 rounded flex justify-center  border-gray-200 m-auto {_class}"
	class:right
	class:left
	class:top
	class:hidden={!open}
	style={`transform:translate(${x}%, ${y}%); ${style}`}
>
	<button class="icon-btn p-0 m-0 w-full h-full" on:click={() => (open = !open)} on:click>
		<img src="/static/images/chevron-up.svg" style={`transform:rotate(${r}deg)`} alt="" />
	</button>
</div>

<style>
	.toggle {
		/* width: 60px; */
		border-width: 0.1rem;
	}
	.toggle.hidden {
		border-width: 0;
		box-shadow: none !important;
		display: flex !important;
	}
	.toggle.right {
		left: 100%;
		top: 50%;
		transform: translateX(-50%);
		border-left-width: 0;
		width: 2vw;
		height: 10vh;
	}
	.toggle.left {
		right: 100%;
		top: 50%;
		transform: translateX(-50%);
		width: 60px;
		border-right-width: 0;
		width: 2vw;
		height: 10vh;
	}
	.toggle.top {
		bottom: 100%;
		left: 50%;
		transform: translateX(-50%);
		width: 60px;
		border-bottom-width: 0;
		width: 10vh;
		height: 2vw;
	}
</style>
