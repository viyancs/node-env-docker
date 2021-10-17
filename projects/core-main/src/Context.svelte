<script context="module">
	export const KEY = "specta";

	export const get = () => getContext(KEY);
</script>

<script>
	import { getContext, setContext } from "svelte";

	export let value;

	setContext(KEY, value);
</script>

<slot />
