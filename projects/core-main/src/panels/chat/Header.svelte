<script>
  import { Avatar } from '../../components'
  import { createEventDispatcher } from 'svelte'

  export let room
  export let user
  /**
   * @type {Promise<import('../../models').RoomMember[]>}
   */
  $: targetsPromise = room.targets(user)

  const dispatch = createEventDispatcher()
</script>

<div class="chat-header bg-gray-50 flex justify-between items-center py-0 px-2 ">
  <div class="active-friend flex items-center">
    {#await targetsPromise then targets}
      {#await Promise.all(targets.map(d => d.user.get())) then users}
        {#each users as user}
          <Avatar class=" inline-block" {user} radius="50%" />
          <div class="user-name ml-4 text-base">{user.fullName}</div>
        {/each}
      {/await}
    {/await}
  </div>
  <div class="actions-wrapper ml-2 flex space-x-2">
    <button class="icon-btn" on:click={() => dispatch('call')}>
      <img src="/static/images/call-icons.svg" alt="" />
    </button>
    <button class="icon-btn" on:click={() => dispatch('videoCall')}>
      <img src="/static/images/camera-icon.svg" alt="" />
    </button>
  </div>
</div>

<style lang="scss">
</style>
