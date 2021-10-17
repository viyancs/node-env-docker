<script>
  import RoomComponent from './Room.svelte'
  import PanelBase from '../PanelBase.svelte'
  import Chat from './Chat.svelte'
  import { TabContent, TabPane } from 'sveltestrap'
  import { getStore } from '../../auth/fireStore'
  import { onMount } from 'svelte'
  import { writable } from 'svelte/store'
  import { MessageNotification } from '../../models/MessageNotification'
  import { uploading } from './store'
  const authUser = getStore()
  const profile = authUser.profile

  export let inFocus
  export let getFocusElement
  export let movePointerDown
  let componentName = 'PanelChat'

  /**
   * @type {import('../../models').Room[]}
   * @description Set contains all users having rooms - List of all rooms
   */
  let rooms = []
  let roomsUsers = []
  let filteredRooms = []
  let users = []
  let firstload = true
  /**
   * @type {import('../../models').Room}
   * @description The active room object
   */
  let activeRoom
  $: console.log(activeRoom)
  const messages = writable({})

  onMount(() => {
    const roomsWatcherUnsubscriber = $profile.rooms.watch(array => {
      rooms = array.sort((a, b) => +b.modifiedAt - +a.modifiedAt)
      if (!activeRoom) activeRoom = array[0]
      filteredRooms = rooms
      if (firstload) {
        // users + rooms
        roomsUsers = []
        for (let room of rooms) {
          let template
          room.targets($profile).then(async members => {
            users = await Promise.all(members.map(d => d.user.get()))
            roomsUsers = [...roomsUsers, { [room.id]: { users } }]
          })
        }
        firstload = false
      } else {
        searchFilter()
      }
    })
    const unSubscribeMessages = messages.subscribe(v => {
      const roomsxMessages = Object.fromEntries(
        rooms.map(item => {
          return [item.id, { ...item, messages: v[item.id] || [] }]
        })
      )

      MessageNotification.newMessages(roomsxMessages)
    })

    return () => {
      roomsWatcherUnsubscriber?.()
      unSubscribeMessages?.()
    }
  })

  const searchFilter = () => {
    filteredRooms = rooms.filter(
      room =>
        roomsUsers.filter(
          el =>
            (el[room.id]?.users.filter(
              user =>
                user.fullName.toUpperCase().indexOf(filterByName.toUpperCase()) !== -1
            )).length > 0
        ).length > 0
    )
    console.log(filteredRooms)
  }

  let filterByName = ''
  // to prevent switching to other room while uploading attachements
  let switchActiveRoom = false
  uploading.subscribe(v => {
    console.log(v)
    switchActiveRoom = v
  })
</script>

<PanelBase
  {getFocusElement}
  {componentName}
  {inFocus}
  {movePointerDown}
  class="chat wholecol"
  title="Chat"
  subtitle="(0 Unread)"
>
  <svelte:fragment slot="action">
    <div slot="action" class="cursor-pointer font-bold">New Message</div>
  </svelte:fragment>

  <div class="tabs h-full">
    <TabContent class="h-full">
      <TabPane tabId="team" active>
        <span slot="tab">Team</span>
        <div
          class="chat-main-wrapper  shadow-sm rounded-md border overflow-hidden bg-white mt-2"
        >
          <aside class="left-wrapper">
            <div class="searchWrapper w-full relative">
              <img
                src="/static/images/search.svg"
                alt="search"
                class="absolute right-4 top-3	 w-4"
              />
              <input
                class="w-full border-none text-sm"
                placeholder="Search"
                type="text"
                on:keyup={searchFilter}
                bind:value={filterByName}
              />
            </div>

            {#each filteredRooms as room (room.id)}
              <RoomComponent
                currentUser={$profile}
                active={activeRoom.id === room.id}
                {room}
                on:message={evt => {
                  //messages[room.id] = evt.detail;
                  $messages = {
                    ...$messages,
                    [room.id]: evt.detail
                  }
                }}
                on:click={() => {
                  if (!switchActiveRoom) {
                    activeRoom = room
                  }
                }}
              />
            {/each}
          </aside>

          <div class="right-wrapper">
            <!--unmount the chat -> subscribe -->
            {#each rooms as room (room.id)}
              {#if $authUser && activeRoom}
                {#if activeRoom.id == room.id}
                  <Chat
                    {room}
                    messages={$messages[activeRoom?.id]}
                    on:send={() => {
                      rooms = rooms.sort((a, b) => +b.modifiedAt - +a.modifiedAt)
                    }}
                  />
                {/if}
              {/if}
            {/each}
          </div>
        </div>
      </TabPane>
      <TabPane tabId="clients">
        <span slot="tab">Clients</span>
      </TabPane>
    </TabContent>
  </div>
</PanelBase>

<style lang="scss">
  @import '../../style/vars';

  :global(.panel.chat) {
    flex: 1.5 0 100% !important;
    //width: 700px !important;
  }

  :global(.chat > .panel-header) {
    margin: 0 0 20px 0 !important;
  }

  .chat-main-wrapper {
    display: flex;
    height: 100%;

    .messages-wrapper {
      width: 100%;
      height: 100%;
      overflow-y: auto;
    }

    .left-wrapper {
      border-right: 1px solid #ced2d4;
      overflow-y: auto;
      width: 100%;
      min-width: 200px;
      max-width: 250px;
      flex: 1;
      .searchWrapper {
        img {
          filter: invert(52%) sepia(4%) saturate(1320%) hue-rotate(183deg) brightness(92%)
            contrast(83%);
        }
      }
    }

    .right-wrapper {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 50px 1fr auto;
      gap: 0px 2px;
      grid-template-areas:
        '.'
        '.'
        '.';
      flex: 3;
    }
  }

  .tabs :global(ul > li > a) {
    color: #d0d0d0;
    font-size: 0.875rem;
    padding: 2px 10px;
    border-top: none !important;
    border-radius: 0 !important;
    border-right: none !important;
    border-left: none !important;
    border-bottom: 2px solid transpaernt !important;
  }
  .tabs :global(ul > li > a.active) {
    color: $text-grey-color !important;
    border-bottom: 2px solid $primary-color !important;
  }
  .tabs :global(ul.nav.nav-tabs) {
    width: 100%;
  }
  .tabs :global(ul.nav.nav-tabs .nav-link.active) {
    background-color: transparent;
  }
  .tabs :global(div.tab-pane) {
    height: 88%;
  }
  .tabs {
    overflow: auto;
  }
</style>
