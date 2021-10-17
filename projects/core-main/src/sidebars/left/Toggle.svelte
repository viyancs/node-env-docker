<script>
	export let open = false;
	export let r = 0;
</script>

<button
	class="icon-btn p-0 m-0 w-full h-full"
	on:click={() => (open = !open)}
	on:click
>
	<img
		src="/static/images/chevron-up.svg"
		style={`transform:rotate(${r}deg)`}
		alt=""
	/>
</button>
