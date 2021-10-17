<script>
	import { store } from "./fireStore";

	export let onDeny = () => {};

	$: if (!$store) {
		onDeny?.();
	}
</script>

{#if $store}
	<slot />
{/if}
