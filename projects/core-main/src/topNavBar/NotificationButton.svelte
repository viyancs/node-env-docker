<script>
  import { Dropdown, DropdownItem } from '../components'
  import { format } from 'date-fns'

  /**
   * @type { import('../models').Notification[] }
   */
  export let notifications = []

  $: unseened = notifications.filter(d => !d.seen)
</script>

<svelte:head>
  <title
    >{unseened.length
      ? `You have (${unseened.length}) notification${unseened.length > 1 ? 's' : ''}`
      : ''}</title
  >
</svelte:head>

<div class="Notification-button">
  <Dropdown transparent>
    <div slot="icon" class="relative">
      <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
      </svg>
      <div class="chip bg-red-700 text-white">
        <span>{notifications.filter(d => !d.seen).length}</span>
      </div>
    </div>

    {#each notifications as notification (notification.id)}
      <DropdownItem
        class={notification.seen ? 'bg-white' : 'bg-purple-300'}
        on:click={() => {
          notification.seen = true
          notification.save()
        }}
      >
        <h3>{notification.body}</h3>
        <span>{format(notification.createdAt, 'MM EEEE hh:mm:ss')}</span>
      </DropdownItem>
    {/each}
  </Dropdown>
</div>

<style>
  div.chip {
    height: 16px;
    width: 16px;
    font-size: 8pt;
    line-height: 13px;
    border-radius: 1em;
    padding: 2px;
    position: absolute;
    top: 0px;
    left: 0px;
    transform: translate(-16%, -16%);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .Notification-button :global(.Dropdown .Menu) {
    height: 80vh;
    width: auto;
    overflow: overlay;
  }
</style>
