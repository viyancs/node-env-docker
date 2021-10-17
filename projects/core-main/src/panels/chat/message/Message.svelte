<script>
	import Recieved from "./Recieved.svelte";
	import Sent from "./Sent.svelte";
	import { store } from "../../../auth/fireStore";

	const currentUserId = $store.uid;

	/**
	 * @type {import('../../../models').Message}
	 */
	export let message;
	/**
	 * @type {string}
	 */
	export let avatar;

	const components = {
		true: Sent,
		false: Recieved,
	};
</script>

<svelte:component
	this={components[message.userId === currentUserId]}
	{message}
	{avatar}
/>
