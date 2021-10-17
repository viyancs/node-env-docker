<script>
  import { store } from '../../auth/fireStore'
  import MessageComponent from './message'
  import Footer from './Footer.svelte'
  import Header from './Header.svelte'
  import { createEventDispatcher, onDestroy, onMount } from 'svelte'
  import { Notification } from '../../models'
  import { where } from 'firebase/firestore'
  import { writable } from 'svelte/store'
  import TypingIndicator from '../../components/chat/TypingIndicator.svelte'
  /**
   * @type {import('../../models').Room}
   */
  export let room
  /**
   * @type {import('../../models').Message[]}
   */

  export let messages
  //scroll down on new message ( notification ) as receiver of message
  let oldMsgLength = 0
  $: if (messages) {
    if (messages.length > oldMsgLength) {
      try {
        document.querySelector('.messages').scrollTo(0, 0)
        oldMsgLength = messages.length
      } catch (error) {}
    }
  }

  const profile = store.profile
  const message = writable(room.newMessage($profile.id))

  $: $message = room.newMessage($profile.id)
  let sendMSG = false

  let files = []
  /**
   * @type {HTMLAudioElement}
   */
  let audio

  const dispatch = createEventDispatcher()

  /**
   * @type {HTMLElement}
   */
  let chatDiv

  async function send({ detail }) {
    console.log(detail)
    // Check if the wether the room is a firestore object or not
    if (room.draft) {
      // Save room object to firestore
      await room.save()
    }

    // Mark all unseen notifications as seen
    currentMember.user.get().then(user => {
      user.notifications.getDocs(where('seen', '==', false)).then(notifications => {
        notifications.forEach(notification => {
          notification.seen = true
          notification.save()
        })
      })
    })

    // Create a Message in the current room
    room.send(detail).then(message => {
      // notify the other members of the room
      room.targets($profile).then(members => {
        // Iterate over other members of the room
        members
          .filter(d => d.notifiable)
          .forEach(member => {
            // Create a notification of a member
            // Save the drafted notification
            Notification.newDraft(member.id, {
              body: `${$profile.firstName}: ${message.body.substr(
                0,
                10
              )}`
            }).save()
          })
      })

      // Dispatch send event
      dispatch('send')
    })
  }

  let showDropzone = false

  /**
   * @type {import('../../models').RoomMember}
   */
  let currentMember
  $: room?.currentMember($store.uid).then(member => {
    currentMember = member
  })

  /**
   * @type {import('../../models').RoomMember[]}
   */
  let typingMembers = []

  let onTypingWatcherUnsubscriber = room?.onTyping($profile, members => {
    typingMembers = members
  })

  /**
   * @type {Record<string, import('../../models').User>}
   */
  let members = {}
  $: room.members.getDocs().then(async d => {
    members = await (
      await Promise.all(d.map(d => d.user.get()))
    ).reduce((acc, curr) => ((acc[curr.id] = curr), acc), {})
  })

  onDestroy(() => {
    onTypingWatcherUnsubscriber()
  })

  export function changeRoom(newRoom) {
    //onTypingWatcherUnsubscriber;
    room = newRoom
  }

  // timer for typing indicator to delay updating firestore
  let timer,
    timeoutVal = 500
</script>

<div
  class="contents"
  on:focusin={e => {
    currentMember.notifiable = false
    currentMember.save()
  }}
  on:focusout={() => {
    currentMember.notifiable = true
    currentMember.save()
  }}
>
  <Header {room} user={$profile} />
  <div
    class="flex flex-col overflow-hidden relative"
    on:dragenter={e => {
      e.preventDefault()
      showDropzone = true
    }}
    on:focus={() => {
      console.log('focus in - 2')
    }}
  >
    {#if showDropzone}
      <div
        class="absolute inset-0 bg-gray-900 bg-opacity-40 z-20"
        on:dragleave={e => {
          e.preventDefault()
          showDropzone = false
        }}
        on:dragover={e => e.preventDefault()}
        on:drop={e => {
          e.preventDefault()
          showDropzone = false
          const newFiles = Array.from(e.dataTransfer.files).map(file => [
            file,
            $message.uploadFile(file)
          ])
          files = files.concat(newFiles)
        }}
      />
    {/if}
    <div
      class="messages flex flex-col-reverse overflow-y-scroll p-2 pt-0 w-full h-full overflow-y-auto"
      bind:this={chatDiv}
      on:drop|preventDefault={() => {}}
    >
      {#if room}
        {#each messages ?? [] as message (message.id)}
          <MessageComponent {message} avatar={members?.[message.userId]?.avatar} />
        {/each}
      {/if}
    </div>
    <div class="typingIndicatorWrapper h-10 mb-2" style="margin-left:3.1rem">
      {#if typingMembers.length}
        <TypingIndicator />
      {/if}
    </div>

    <Footer
      messageFactory={(body = '') => room.newMessage($profile.id, body)}
      bind:message={$message}
      bind:files
      on:send={send}
      on:startTyping={() => {
        clearTimeout(timer)
        currentMember.typing = true
        currentMember.save()

        // Mark all unseen notidications as seen
        currentMember.user.get().then(user => {
          user.notifications.getDocs(where('seen', '==', false)).then(notifications => {
            notifications.forEach(notification => {
              notification.seen = true
              notification.save()
            })
          })
        })
      }}
      on:endTyping={() => {
        clearTimeout(timer)
        //delay updating firestore onkeyup
        timer = setTimeout(() => {
          currentMember.typing = false
          currentMember.save()
        }, timeoutVal)
      }}
    />
  </div>
</div>
