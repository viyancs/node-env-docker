<script context="module">
	const key = {};

	export const get = () => getContext(key);
</script>

<script>
	import { getContext, setContext } from "svelte";
	import { writable } from "svelte/store";

	setContext(key, writable(""));

	let _class = "";

	export { _class as class };
</script>

<ul class="{_class} menu-items">
	<slot />
</ul>

<style lang="scss">
	.menu-items {
		list-style: none;
		padding: 0;
	}
</style>
