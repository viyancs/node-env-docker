<script>
	import { get } from "./Menu.svelte";

	export let img;
	export let key;

	const selectedItem = get();

	if (!$selectedItem) $selectedItem = key;

	$: active = $selectedItem === key;
</script>

<li>
	<!-- svelte-ignore a11y-missing-attribute -->
	<a
		class:active
		on:click|preventDefault={() => ($selectedItem = key)}
		on:click|preventDefault
	>
		<img src={img} alt="menu-icon" />
		<slot />
	</a>
</li>

<style lang="scss">
	@import "../../style/vars";

	li a {
		padding: 10px 15px;
		display: flex;
		color: $text-grey-color;
		font-size: 0.875rem;
		width: 100%;
		border-left: 4px solid transparent;

		img {
			margin-right: 10px;
			width: 20px;
			height: 20px;
			object-fit: contain;
		}

		&:hover {
			background: #f4f9fc;
			border-color: $primary-color;
			text-decoration: none;
		}
	}

	.active {
		background: #f4f9fc;
		border-color: $primary-color;
		text-decoration: none;
	}
</style>
