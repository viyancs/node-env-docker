<script>
	import { Signup } from '@specta-app/core/auth';
	import { goto } from '$app/navigation';
</script>

<Signup
	on:success={() => {
		goto('/');
	}}
	on:error={({ detail }) => {
		console.error(detail);
	}}
	on:backToLogin={() => {
		goto('/');
	}}
/>
