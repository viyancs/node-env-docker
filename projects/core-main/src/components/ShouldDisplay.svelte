<script>
	import { store } from "../auth/fireStore";
	import {onDestroy} from "svelte"

	export let name;

	const profile = store.profile;
	let shouldDisplay
	let  unsubscribe = $profile.settings?.subscribe(v=>{
		shouldDisplay = v.display[name]
	},()=>{})
	
	onDestroy(()=>{
		unsubscribe()
	})
</script>

{#if shouldDisplay}
	<slot />
{:else}
	<slot name="false" />
{/if}

