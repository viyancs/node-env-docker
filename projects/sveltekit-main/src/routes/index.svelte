<script>
	import { Login } from '@specta-app/core/auth';
	import { goto } from '$app/navigation';
	/* reference of spinner element should be on the web app level
		and fed to the package
	*/
	let spinner = document.querySelector('.u-spinner-area-global')
</script>

<Login
	{spinner}
	on:signup={() => {
		goto('/signup');
	}}
	onLogin={(user) => {
		console.log('login:success');
		goto('/app');
	}}
>
	<!-- <Context value={context}>
		<slot />
	</Context> -->
</Login>
