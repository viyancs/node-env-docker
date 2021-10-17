<script>
  import { createEventDispatcher } from 'svelte'
  import { parse } from 'sherlockjs'
  import AttachementButton from './AttachementButton.svelte'
  import Attachements from './message/Attachements.svelte'
  import Attachment from './message/Attachment.svelte'
  import { writable } from 'svelte/store'
  import ThreeDotsAnimation from '../../components/chat/ThreeDotsAnimation.svelte'
  import { uploading } from './store'
  const dispatch = createEventDispatcher()

  /**
   * @type {import('../../models').RoomMember[]}
   */

  /**
   * @type {import('../../models').Message}
   */
  export let message
  export let messageFactory = (body = '') => undefined

  /**
   * @type {Array<[File, ReturnType<import('../../models').Message['uploadFile']>]>}
   */
  export let files = []

  // to stop from switching room
  $: if (files) {
    checkUploadedFiles()
  }
  //wait for all uploading files to be uploaded
  const checkUploadedFiles = async () => {
    let allUploaded = false
    if (files.length > 0) {
      $uploading = true
      for (let file of files) {
        let promise
        promise = await file[1]
        promise?.state == 'success' ? (allUploaded = true) : (allUploaded = false)
      }
      if (allUploaded) $uploading = false
    }
    return allUploaded
  }

  // guard to not sending other messages while uploading
  let sendingMessage = false
  const sendMSG = async () => {
    if (sendingMessage) return

    if ($uploading) {
      sendingMessage = true
      let allUploaded = await checkUploadedFiles()
      if (allUploaded) {
        dispatch('send', message)
        message = messageFactory()
        files = []
        $uploading = false
        sendingMessage = false
      }
    } else {
      dispatch('send', message)
      message = messageFactory()
      files = []
    }
  }

  const enterKeyUp = async ({ key }) => {
    if (key === 'Enter') {
      if (!emptyMessage) {
        await sendMSG()
      }
    }
  }

  const pasteImage = e => {
    const items = (e.clipboardData || e.originalEvent.clipboardData).items
    let blob = null
    if (items[0].type.indexOf('image') === 0) {
      blob = items[0].getAsFile()
    }
    if (blob) {
      const newFiles = [[blob, message.uploadFile(blob)]]
      files = files.concat(newFiles)
    }
  }

  /**
   *
   * @param msg {string}
   */
  function parseDate(msg) {
    const sherlocked = parse(msg)

    const { eventTitle, startDate, endDate, isAllDay } = sherlocked

    // Basic properties
    // var title = sherlocked.eventTitle; // 'Homework 5 due'
    // var startDate = sherlocked.startDate; // Date object pointing to next monday at 3pm
    // var endDate = sherlocked.endDate; // null in this case, since no duration was given
    // var isAllDay = sherlocked.isAllDay; // false, since a time is included with the event

    if (startDate) sherlocked.startDate = startDate.getTime()
    if (endDate) sherlocked.endDate = endDate.getTime()

    sherlocked.validated = startDate !== null

    return sherlocked
  }

  let isTyping = false

  $: emptyMessage = !message?.body.trim().length
</script>

<div
  class="chat-footer flex justify-center items-center p-2 border-t-2 border-gray-100 bg-gray-100"
>
  <div class="flex flex-col w-full bg-white rounded-md">
    <div class="flex-1 flex items-center">
      <button class="">
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
      <AttachementButton
        on:change={e => {
          const newFiles = Array.from(e.currentTarget.files).map(file => [
            file,
            message.uploadFile(file)
          ])
          files = files.concat(newFiles)
        }}
      />
      <div class="relative flex-1">
        <input
          type="text"
          class=""
          placeholder="Type Message"
          bind:value={message.body}
          on:keyup={({ key }) => enterKeyUp({ key })}
          on:keypress={() => {
            if (!isTyping) {
              dispatch('startTyping')
              isTyping = true
            }
          }}
          on:keyup={() => {
            dispatch('endTyping')
            isTyping = false
          }}
          on:paste={e => pasteImage(e)}
        />
        <div class="absolute right-0 top-0 bottom-0 flex justify-center items-center">
          {#if $uploading}
            <div class="threeDots items-center flex">
              <ThreeDotsAnimation text="Image(s) uploading" />
            </div>
          {/if}
        </div>
      </div>
      <button
        class="btn send-message"
        disabled={emptyMessage && files.length === 0}
        on:click={() => {
          sendMSG()
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0.486998 5.13263L0.402186 5.16798C-0.136569 5.43131 -0.141314 6.22878 0.431884 6.48354L6.7209 9.27834L9.51644 15.5681C9.78393 16.1699 10.6498 16.1346 10.8674 15.5129L15.9525 0.983971C15.9604 0.962901 15.9673 0.941538 15.9731 0.919959C16.0488 0.647366 15.9587 0.384503 15.7814 0.21006C15.7828 0.211478 15.7842 0.212905 15.7857 0.214337M0.486998 5.13263L15.016 0.0474854L0.486998 5.13263ZM15.016 0.0474854C14.9216 0.0828148 14.8331 0.138432 14.7572 0.214337L12.505 2.46655L2.69797 5.899L7.11108 7.86046L6.75791 8.21362L6.69742 8.28213C6.4756 8.56741 6.49577 8.97991 6.75791 9.24205C7.04191 9.52604 7.50235 9.52604 7.78635 9.24205L8.13949 8.88891L10.1003 13.3013L13.5319 3.49649"
            fill={emptyMessage ? '#808080' : '#6e319c'}
          />
        </svg>
      </button>
    </div>
    <Attachements>
      {#each files as [file, { observe, remove }], i (file)}
        <Attachment
          {file}
          uploadObserver={observe}
          on:dismiss={() => {
            remove().then(() => {
              files = files.filter((d, ii) => i !== ii)
            })
          }}
        />
      {/each}
    </Attachements>
  </div>
</div>

<style lang="scss">
  @import '../../style/vars';

  .chat-footer {
    .icon-btn {
      width: 10%;
      outline: none;
    }
  }

  input[type='text'] {
    width: 100%;
    outline: none;
    font-size: 12pt;
    border: none;
    box-shadow: none;
  }
  .btn {
    cursor: pointer;
    top: 2px;
    right: 4px;
    bottom: 0;
    height: 45px;
    border-radius: 30px;
    width: 45px;
    // background: linear-gradient(90deg, #6e319c 6.04%, #942d93 100%);

    .send-message:disabled {
      background: #808080;
    }
  }
</style>
