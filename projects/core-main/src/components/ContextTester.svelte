<script>
	import { setContext } from "svelte";

	export let key;
	export let value;

	setContext(key, value);

	export let component;
</script>

<svelte:component this={component.default} {...component?.props ?? {}} />
