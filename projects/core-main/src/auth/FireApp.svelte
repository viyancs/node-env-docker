<script context="module">
	import authStore, { store } from "./fireStore";

	const key = "fireContext";

	export const get = () => getContext(key);

	const config = {
		// @ts-ignore
		apiKey: API_KEY,
		// @ts-ignore
		authDomain: AUTH_DOMAIN,
		// @ts-ignore
		projectId: PROJECT_ID,
		// @ts-ignore
		storageBucket: STORAGE_BUCKET,
		// @ts-ignore
		messagingSenderId: MESSAGING_SENDER_ID,
		// @ts-ignore
		appId: APP_ID,
		// @ts-ignore
		measurementId: MEASUREMENT_ID,
	};

	/**
	 * @type {import('firebase/app').FirebaseApp}
	 */
	let app;

	/**
	 * @type {import('firebase/auth').Auth}
	 */
	let auth;

	authStore(config);
</script>

<script>
	import { Square } from "svelte-loading-spinners";

	import { getContext, onMount, setContext, tick } from "svelte";
	import { writable } from "svelte/store";

	/**
	 * @type {Promise<import('firebase/auth').User>}
	 */
	let authStateChangedPromise;

	const context = writable({});
	setContext(key, context);

	onMount(() => {
		$context.auth = store.auth;

		authStateChangedPromise = new Promise((resolve, reject) => {
			store.auth.onAuthStateChanged(
				(user) => {
					resolve(user);
				},
				(err) => {
					reject(err);
				}
			);
		});
	});
</script>

{#await tick() then value}
	{#await authStateChangedPromise}
		<div
			class="w-screen h-screen flex justify-center items-center absolute insets-0"
		>
			<Square size="60" color="#7C3AED" unit="px" duration="1s" />
		</div>
	{:then value}
		<slot auth={store.auth} />
	{:catch error}
		<slot name="catch" />
	{/await}
{/await}
