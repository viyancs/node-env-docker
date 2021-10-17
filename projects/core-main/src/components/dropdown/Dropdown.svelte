<script context="module">
  export const KEY = Symbol()
</script>

<script>
  import { setContext } from 'svelte'
  import { writable } from 'svelte/store'

  let hidden = true

  export let transparent = false

  export let value

  export let label = ''

  const items = writable({})

  $: value = $items.selected
  $: text = $items[$items.selected]

  $: if (value) {
    hidden = true
  }

  setContext(KEY, items)
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<div
  class="Dropdown relative inline-block text-left w-full dropdown"
  data-testid="dropdown"
>
  <div
    class="flex items-center rounded-md border border-gray-300 shadow-sm py-2 px-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 relative cursor-pointer"
    class:bg-transparent={transparent}
    class:shadow-none={transparent}
    class:border-0={transparent}
    on:click={() => {
      hidden = !hidden
    }}
  >
    <p class="m-0">{text ? text : label}</p>
    <button
      type="button"
      class="trigger inline-flex justify-center items-center space-x-2 absolute right-0 top-0 bottom-0"
      aria-expanded="true"
      aria-haspopup="true"
      data-testid="button"
    >
      <slot name="button" />
      <!-- Heroicon name: solid/chevron-down -->
      <slot name="icon">
        <svg
          class="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </slot>
    </button>
  </div>

  <!--
      Dropdown menu, show/hide based on menu state.
  
      Entering: "transition ease-out duration-100"
        From: "transform opacity-0 scale-95"
        To: "transform opacity-100 scale-100"
      Leaving: "transition ease-in duration-75"
        From: "transform opacity-100 scale-100"
        To: "transform opacity-0 scale-95"
    -->
  {#if !hidden}
    <div
      class="Menu origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none w-full z-10"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabindex="-1"
      data-testid="menu"
      style="width: max-content;"
    >
      <div class="py-1" role="none">
        <slot />
      </div>
    </div>
  {/if}
</div>
