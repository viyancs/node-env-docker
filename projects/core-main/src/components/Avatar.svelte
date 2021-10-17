<script>
	/**
	 * @type {import('../models').User}
	 */
	export let user;
	export let width = "40px";
	export let height = width;
	export let radius = "0px";
	export let border = "none";
	export let fontSize = "16pt";
	export let fontWeight = "700";

	let _class = "";
	export { _class as class };
</script>

<div
	class="avatar flex justify-center items-center overflow-hidden {_class}"
	style={`width:${width}; height:${height}; border-radius:${radius}; border:${border}; font-size:${fontSize}; font-weight:${fontWeight}`}
>
	{#if user && !user?.avatar}
		{#each [user.firstName?.[0] ?? "", user.lastName?.[0] ?? ""] as letter}
			<span>{letter.toLocaleUpperCase()}</span>
		{/each}
	{:else}
		<img src={user?.avatar} alt={user?.fullName} />
	{/if}
</div>

<style>
	img {
		-o-object-fit: cover;
		object-fit: cover;
		width: 100%;
		height: 100%;
	}
	span {
	}
</style>
