<script>
	import { Square } from "svelte-loading-spinners";
	import { createEventDispatcher } from "svelte";
	import { store } from "./fireStore";
	import { setDoc, doc, getFirestore } from "firebase/firestore";
	import { httpsCallable, getFunctions } from "firebase/functions";

	import { goto } from '$app/navigation';

	let email = "";
	let password = "";
	let firstName = "";
	let lastName = "";

	export let app = store.app;

	const fireStore = getFirestore(app);

	/**
	 * @type{Promise<any>}
	 */
	let signUpPromise;

	const dispatch = createEventDispatcher();

	const createUserWithEmailAndPassword = httpsCallable(
		getFunctions(),
		"signup"
	);

	let error;
	let btnIsDisabled = false;
	let defaultBtnText = "Sign up";
	let btnText = defaultBtnText;
</script>

<div
	class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative draggable"
>
	<div class="max-w-md w-full space-y-8">
		<div class="flex flex-col items-center">
			<img class="mx-auto h-16 w-auto" src="/images/icon.svg" alt="Specta" />
			<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
				Create your account
			</h2>
			<p class="mt-2 text-center text-sm text-gray-600">
				Or
				<a
					href="#"
					class="font-medium text-indigo-600 hover:text-indigo-500"
					on:click|preventDefault={() => dispatch("backToLogin")}
				>
					return to login page
				</a>
			</p>
		</div>
		<form
			class="mt-8 space-y-6 not-draggable"
			on:submit|preventDefault={() => {
				btnIsDisabled = true;
				btnText = "Loading..."

				signUpPromise = createUserWithEmailAndPassword({
					email,
					password,
					firstName,
					lastName,
				})
					.then(() => {
						dispatch("success");
					})
					.catch((err) => {
						error = err;
						dispatch("error", err);
						btnIsDisabled = false;
						btnText = defaultBtnText;
					});
			}}
		>
			<input type="hidden" name="remember" value="true" />
			<div class="rounded-md shadow-sm -space-y-px">
				<div>
					<label for="firstName" class="sr-only">First Name</label>
					<input
						id="firstName"
						type="text"
						autocomplete="firstName"
						required
						class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
						placeholder="first name"
						bind:value={firstName}
					/>
				</div>
				<div>
					<label for="lastName" class="sr-only">Last Name</label>
					<input
						id="lastName"
						type="test"
						autocomplete="lastName"
						required
						class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
						placeholder="last name"
						bind:value={lastName}
					/>
				</div>
				<div>
					<label for="email-address" class="sr-only">Email address</label>
					<input
						id="email-address"
						name="email"
						type="email"
						autocomplete="email"
						required
						class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
						placeholder="Email address"
						bind:value={email}
					/>
				</div>
				<div>
					<label for="password" class="sr-only">Password</label>
					<input
						id="password"
						name="password"
						type="password"
						autocomplete="current-password"
						required
						class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
						placeholder="Password"
						bind:value={password}
					/>
				</div>
			</div>

			<div>
				<button
					disabled={btnIsDisabled}
					type="submit"
					class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white {error
						? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
						: 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'}   focus:outline-none focus:ring-2 focus:ring-offset-2"
				>
					<span class="absolute left-0 inset-y-0 flex items-center pl-3">
						<!-- Heroicon name: solid/lock-closed -->
						<svg
							class="h-5 w-5 {error
								? 'text-red-500  group-hover:text-red-400'
								: 'text-indigo-500  group-hover:text-indigo-400'} "
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
						>
							<path
								fill-rule="evenodd"
								d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
								clip-rule="evenodd"
							/>
						</svg>
					</span>
					{btnText}
				</button>
			</div>
		</form>
	</div>

	{#if signUpPromise}
		{#await signUpPromise}
			<div class="absolute spinner center">
				<Square size="60" color="#7C3AED" unit="px" duration="1s" />
			</div>
		{/await}
	{/if}
</div>

<style>
	.spinner.center {
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.draggable {
		-webkit-app-region: drag;
	}

	.not-draggable {
		-webkit-app-region: no-drag;
	}
</style>
