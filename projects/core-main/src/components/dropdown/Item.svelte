<script>
	import { KEY } from "./Dropdown.svelte";
	import { getContext } from "svelte";

	let _class = "";
	export { _class as class };

	export let value;
	export let text = value;

	const items = getContext(KEY);

	$items[value] = text;
</script>

<a
	href="#"
	class="Dropdown-Item {_class} text-gray-700 block px-4 py-2 text-sm"
	role="menuitem"
	tabindex="-1"
	id="menu-item-0"
	on:click|preventDefault={() => {
		$items.selected = value;
	}}
	on:click|preventDefault
>
	<slot />
</a>
