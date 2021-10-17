<script>
	import { Profile } from '@specta-app/core';
	import { goto } from '$app/navigation';
</script>

<Profile
	on:close={() => {
		goto('/app');
	}}
/>
