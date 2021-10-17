<script>
  import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'
  import { Square } from 'svelte-loading-spinners'
  import { createEventDispatcher } from 'svelte'
  import { store } from './fireStore'
  import { Dropdown, DropdownItem } from '../components'
  import { collection, getDocs, getFirestore } from 'firebase/firestore'
  import { onDestroy } from 'svelte'

  let email = ''
  let password = ''
  let rememberMe = false
  /* spinner element reference should be supplied by the app using the package*/
  export let spinner = undefined

  export let auth = store.auth

  export let onLogin = _ => {}

  const forgetPassword = () => {}

  let orgId

  let signInPromise

  const dispatch = createEventDispatcher()

  let error
  let currentUser = null

  let btnIsDisabled = false
  let defaultBtnText = 'Sign in'
  let btnText = defaultBtnText

  const storeUnsubscribe = store.subscribe(v => {
    currentUser = v
    console.log({ currentUser })
    /* undefined means we don't know user is logged or not yet */
    /* null no user is logged in (we verified with firebase) */
    /* else (object) a user is logged in*/
    if (v === undefined) {
      return
    }
    if (v === null) {
      /* user is not logged in, show login page (remove global spinner)*/
      if (spinner) {
        spinner.remove()
      }

      return
    }

    /* we have a logged in user do a timeout then remove the global spinner*/
    setTimeout(() => {
      if (spinner) {
        spinner.remove()
      }
    }, 2000)
    onLogin(v)
  })

  onDestroy(() => {
    storeUnsubscribe?.()
  })

  const roomsPromise = getDocs(collection(getFirestore(), 'orgs'))

  $: currentUser = $store

  $: console.log(currentUser)

  $: if (currentUser) {
    onLogin(currentUser)
  }

  $: console.log(orgId)
  $: if (orgId) {
    resetErrorState()
  }
  function resetErrorState() {
    if (error) {
      error = undefined
      btnIsDisabled = false
    }
  }
</script>

{#if currentUser == null}
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative draggable"
  >
    <div class="max-w-md w-full space-y-8">
      <div class="flex flex-col items-center">
        <img class="mx-auto h-16 w-auto" src="/images/icon.svg" alt="Specta" />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          <a
            href="#"
            class="font-medium text-indigo-600 hover:text-indigo-500"
            on:click|preventDefault={() => dispatch('signup')}
          >
            create an account
          </a>
        </p>
      </div>
      <form
        class="mt-8 space-y-6 not-draggable"
        on:submit|preventDefault={() => {
          btnIsDisabled = true
          btnText = 'Loading...'
          // signInPromise = signInWithEmailAndPassword(auth, email, password);
          console.log(orgId)

          if (!orgId) {
            btnText = defaultBtnText
            error = 'Please Select an Organisation'
            return
          }
          store.setActiveOrgId(orgId)
          signInPromise = signInWithEmailAndPassword(getAuth(), email, password)

          signInPromise.catch(err => {
            btnText = defaultBtnText
            error = err
          })
        }}
      >
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
              id="email-address"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              bind:value={email}
              on:keypress={resetErrorState}
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
              on:keypress={resetErrorState}
            />
          </div>
        </div>

        <div>
          <Dropdown bind:value={orgId} label="Select an organization">
            {#await roomsPromise then snapshot}
              {#each snapshot.docs as doc}
                <DropdownItem value={doc.id} text={doc.data().name}
                  >{doc.data().name}</DropdownItem
                >
              {/each}
            {/await}
          </Dropdown>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              bind:checked={rememberMe}
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <div class="text-sm">
            <a
              href="#"
              class="font-medium text-indigo-600 hover:text-indigo-500"
              on:click|preventDefault={forgetPassword}
            >
              Forgot your password?
            </a>
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
          {#if error}
            <div class="error">{error}</div>
          {/if}
        </div>
      </form>
    </div>

    {#if signInPromise}
      {#await signInPromise}
        <div class="absolute spinner center">
          <Square size="60" color="#7C3AED" unit="px" duration="1s" />
        </div>
      {/await}
    {/if}
  </div>
{/if}

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
