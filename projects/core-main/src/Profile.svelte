<script>
  import { store } from './auth/fireStore'
  import { createEventDispatcher } from 'svelte'
  import { Avatar } from './components'
  import EditAvatarButton from './EditAvatarButton.svelte'
  import { getDownloadURL } from 'firebase/storage'
  import { Toggle, WorkTimePicker } from './components'

  const profile = store.profile

  let user = $profile
  let settings = user.settings
  settings.ics = settings.ics || []

  const dispatch = createEventDispatcher()

  const closeOnKeyDown = e => {
    if (e.keyCode == 27) {
      user = user.discard()
      dispatch('close')
    }
  }
  document.addEventListener('keyup', closeOnKeyDown)
  const handleSubmit = () => {
    function isValidURL(string) {
      const res = string.match(
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
      )
      return res !== null
    }
    const text = newIcInput.value
    if (!text) {
      return
    }
    if (!isValidURL(text)) {
      newIcInput.value = ''
      return
    }
    if (settings.ics && settings.ics.includes(text)) {
      newIcInput.value = ''
      return
    }
    settings.ics = [...settings.ics, text]
    newIcInput.value = ''
  }

  const deleteIc = ic => {
    settings.ics = settings.ics.filter(item => item != ic)
  }
  let newIcInput
</script>

<div class="w-full h-full" style="max-height: 100%;overflow: hidden;">
  <div class="profile-grid pl-0 pr-4 py-4" style="overflow-y: scroll;max-height: 100%;">
    <div class="bg-white p-4 rounded shadow-sm border border-gray-50 avatar-card">
      <div class="flex flex-col mb-2 relative">
        <Avatar
          {user}
          width="100%"
          height="196px"
          radius="16px"
          class="bg-purple-700 text-white rounded-md"
        />
        <EditAvatarButton
          on:input={e => {
            // @ts-ignore
            const file = e.currentTarget?.files?.[0]
            if (file) {
              user.uploadFile(file).then(async res => {
                user.avatar = await getDownloadURL(res.ref)
                user.save()
              })
            }
          }}
        />

        <div class="font-bold text-center py-2">
          {`${user.firstName} ${user.lastName}`}
        </div>
      </div>
      <div class="flex justify-between py-2">
        <div>Status</div>
        <div>Active</div>
      </div>
      <div class="flex justify-between py-2">
        <div>Member since</div>
        <div>June 2021</div>
      </div>
      <div class="flex justify-between py-2">
        <div>Organization</div>
        <div>
          {#await user?.org.get() then org}
            {org?.name || ""}
          {/await}
        </div>
      </div>
    </div>

    <div
      class="flex flex-col bg-white justify-between p-4 rounded shadow-sm border border-gray-50 h-full info-card"
    >
      <div>
        <form
          class="grid grid-cols-2 grid-flow-row-dense overflow-visible"
          on:submit|preventDefault={() => {}}
        >
          <div
            class="col-start-1 col-end-3 font-bold border-b-2 border-gray-100 title flex items-center space-x-4 pb-2"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span class="text-bold">About</span>
          </div>
          <div class="py-2">
            <div class="">First name</div>
            <input
              class="p-2 border border-gray-50 rounded w-full"
              type="text"
              bind:value={user.firstName}
            />
          </div>
          <div class="py-2">
            <div class="">Last name</div>
            <input
              class="p-2 border border-gray-50 rounded w-full"
              type="text"
              bind:value={user.lastName}
            />
          </div>
          <div class="py-2">
            <div class="">Birthday</div>
            <input
              class="p-2 border border-gray-50 rounded w-full"
              type="date"
              value={user.birthdayAsNumber}
              on:input={e => {
                user.birthday = e.currentTarget.valueAsDate
              }}
            />
          </div>
          <div />
          <div class="col-start-1 col-end-3 font-bold mt-4 border-b-2 border-gray-100">
            Contact
          </div>
          <div class="py-2">
            <div class="">Address</div>
            <input
              class="p-2 border border-gray-50 rounded w-full"
              type="text"
              bind:value={user.address}
            />
          </div>
          <div class="py-2">
            <div class="">E-mail</div>
            <input
              class="p-2 border border-gray-50 rounded w-full"
              type="email"
              value={user.email}
              readonly
            />
          </div>
          <div class="py-2">
            <div class="">Phone number</div>
            <input
              class="p-2 border border-gray-50 rounded w-full"
              type="tel"
              bind:value={user.phoneNumber}
            />
          </div>
        </form>
      </div>
      <div class="flex justify-end space-x-2">
        <button
          class="bg-gray-500 text-white rounded px-4 py-2 hover:bg-gray-400"
          on:click={() => {
            user = user.discard()
            dispatch('close')
          }}
        >
          Close
        </button>
        <button
          class="bg-green-500 text-white rounded px-4 py-2 hover:bg-green-400"
          on:click={() => {
            user.save()
            dispatch('save')
          }}
        >
          Save
        </button>
      </div>
    </div>

    <div
      class="flex flex-col col-start-1 col-end-3 p-4 bg-white shadow-sm border border-gray-50 rounded overflow-hidden border-b border-gray-200"
    >
      <div class="flex space-x-2 items-center ">
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <span class="font-bold">Settings</span>
      </div>

      <div class="flex space-x-8 p-2 pt-4">
        <span class="font-bold">Demo widgets</span>

        <Toggle
          bind:checked={settings.showLiveDemo}
          on:change={e => {}}
        />
      </div>

      <div class="flex space-x-8 p-2 pt-4">
        <span class="font-bold">Desktop Notifications</span>
        <Toggle
          bind:checked={settings.desktopNotifications}
          on:change={e => {
            console.log(settings)
          }}
        />
      </div>

      <div class="flex space-x-8 p-2 pt-4">
        <span class="font-bold">Time Format</span>
        <Toggle
			left={'24 hour'}
			right={'12 hour'}
          bind:checked={settings.amPmDateFormat}
          on:change={e => {
            console.log(settings)
          }}
        />
      </div>

      <div class="flex space-x-8 p-2 pt-4 items-center">
        <div class="font-bold">Agenda Range:</div>
        <WorkTimePicker bind:lower={settings.startwork} bind:upper={settings.endwork} />
      </div>

      <div
        id="#ical"
        class="col-start-1 col-end-3 font-bold mt-4 border-b-2 border-gray-100 font-bold"
      >
        Calendar Settings
      </div>
      <div class="py-2">
        <div class="">iCalendars</div>
        {#each settings.ics as ic}
          <div class="ic-input-container my-1">
            <input
              class="block mr-3  p-2 border border-gray-50 rounded w-full"
              type="text"
              value={ic}
              disabled
            />
            <button
              on:click|stopPropagation={() => {
                deleteIc(ic)
              }}
              type="submit"
              class="block rounded px-6 text-center shadow-sm bg-red-500 text-white"
            >
              Delete
            </button>
          </div>
        {/each}
        <form on:submit|preventDefault={handleSubmit} class="ic-input-container my-1">
          <input
            bind:this={newIcInput}
            class="block mr-3 p-2 border border-gray-50 rounded w-full"
            placeholder="ICS link"
            type="text"
          />
          <button
            type="submit"
            class="block rounded px-6 text-center shadow-sm bg-green-500 text-white"
          >
            Add
          </button>
        </form>
      </div>

      <div class="p-2 flex justify-end">
        <button
          class="bg-green-500 text-white rounded px-4 py-2 hover:bg-green-400"
          on:click={() => {
            for (let el of Object.keys(settings.display)) {
              settings.display[el] = settings.showLiveDemo
            }
            settings.store.set(settings)

            settings.save()
          }}>Save</button
        >
      </div>
    </div>
  </div>
</div>

<style>
  .profile-grid {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-auto-flow: row;
    column-gap: 1em;
    row-gap: 1em;
  }
  .avatar-card {
    grid-column-start: 1;
    grid-column-end: 2;
    width: 350px;
  }
  form {
    grid-auto-flow: row;
    grid-template-rows: auto;
    grid-auto-rows: auto;
    height: auto;
  }

  .ic-input-container {
    width: 50%;
    display: grid;
    grid-template-columns: auto 6.25rem;
    column-gap: 1em;
  }
</style>
