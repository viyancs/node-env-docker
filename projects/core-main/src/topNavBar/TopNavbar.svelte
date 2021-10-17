<script>
  import { format } from 'date-fns'
  import { Dropdown, DropdownItem, Avatar } from '../components'
  import { signOut } from 'firebase/auth'
  import { createEventDispatcher, onMount } from 'svelte'
  import { getStore } from '../auth/fireStore'
  import NotificationButton from './NotificationButton.svelte'
  import { orderBy } from 'firebase/firestore'

  const auth = getStore().auth

  const profile = getStore().profile

  const dispatch = createEventDispatcher()

  let notifications = []

  onMount(() => {
    const audio = new Audio('/static/media/chat__detect_event.mp3')

    const notificationsWatcherUnsubscriber = $profile.notifications.watch(array => {
      const isEmpty = notifications.length === 0
      const areIdentical = notifications.length === array.length
      notifications = array

      if (!isEmpty && !areIdentical && notifications.some(d => !d.seen)) audio.play()
    }, orderBy('createdAt', 'desc'))

    return () => {
      notificationsWatcherUnsubscriber()
    }
  })
</script>

<div
  class="navbar-wrapper fixed pr-24 w-full border-b border-gray-300 -ml-12 pl-12 pr-14 draggable"
>
  <nav class="navbar py-2 px-0 flex justify-between items-center w-full">
    <div class="pull-left">
      <div class="wheather-wrapper flex">
        <img src="/static/images/wheather.svg" alt="" />
        <div class="wheather-content ml-2">
          <h3 class="text-gray-700 text-sm mb-2">
            {format(new Date(), 'EEEE, MMMM dd, yyyy')}
          </h3>
          <p class="text-gray-500 text-xs m-0">70°F / Sunny</p>
        </div>
      </div>
    </div>

    <div class="pull-right flex items-center space-x-2 not-draggable">
      <NotificationButton {notifications} />

      <div class="profile-wrapper flex space-x-2 items-center">
        <Dropdown transparent>
          <DropdownItem
            on:click={() => {
              signOut(auth)
                .then(res => {
                  console.log('signed out successfully')
                })
                .catch(err => {
                  console.log(err)
                })
            }}>Logout</DropdownItem
          >
        </Dropdown>

        <div
          class="user-info flex items-center cursor-pointer"
          on:click={() => {
            dispatch('profileClicked')
          }}
        >
          <div class="user-content mr-2 mt-2">
            <h3 class="text-gray-700 text-sm mb-2">
              {$profile.displayName}
            </h3>
            <p class="text-xs text-gray-500 m-0">{$profile.role ?? ''}</p>
          </div>

          <Avatar user={$profile} width="48px" radius="50%" />
        </div>
      </div>
    </div>
  </nav>
</div>

<style lang="scss">
  .navbar-wrapper {
    width: 100vw;
  }
  .avatar {
    border-radius: 50%;
  }

  .draggable {
    -webkit-app-region: drag;
  }

  .not-draggable {
    -webkit-app-region: no-drag;
  }

  .user-content {
    width: max-content;
  }
</style>
