<script>
  import { format } from 'date-fns'
  import { onMount } from 'svelte'
  import { CalendarModal } from '../../modals'
  import Toggle from '../Toggle.svelte'
  import { store } from '../../auth/fireStore'
  import HoursBars from './HoursBars.svelte'
  import { readable } from 'svelte/store'
  export const now = readable(new Date(), function start(set) {
    const interval = setInterval(() => {
      set(new Date())
    }, 1000)

    return function stop() {
      clearInterval(interval)
    }
  })

  const profile = store.profile

  let user = $profile
  let settings = user.settings
  const formatDate = settings.amPmDateFormat
    ? 'hh:mm aa, MMM dd, yyyy'
    : 'HH:mm aa, MMM dd, yyyy'

  export let url = '/events.json'
  export let right = 0
  export let isCalendarModalOpen = false

  onMount(() => {
    const handler = e => {
      if (e.key === 'ArrowDown' && e.shiftKey) {
        isCalendarModalOpen = !isCalendarModalOpen
      }
    }

    document.addEventListener('keyup', handler)

    return () => document.removeEventListener('keyup', handler)
  })
</script>

<div
  class="bottom-calendar-wrapper  pr-24 w-screen fixed flex  z-10 bg-white py-2 border-t-2 border-gray-100 shadow-sm -ml-4"
  style={`margin-right: calc(${225 - right}px * 0.8)`}
>
  <Toggle
    bind:open={isCalendarModalOpen}
    top
    x={-50}
    y={1}
    style="border-width: 1px 1px 0 1px;"
  />

  <div class="date-wrapper bg-white pt-2 pb-2 pl-2 z-20">
    <h3 class="text-gray-500 m-0">Today's agenda</h3>
    <p class="text-gray-300 mt-0.5 mb-0.25 mx-0">
      {format($now, formatDate)}
    </p>
  </div>
  <div class="calendar-wrapper relative flex px-8 overflow-y-hidden">
    <HoursBars
      {now}
      start={$profile.settings.startwork}
      end={$profile.settings.endwork}
    />
    <div class="event-box out-box overflow-y-hidden z-20">
      <h3>Monday Catchup</h3>
      <p>09:00 - 10:30 (ended)</p>
    </div>
    <div class="event-box orange-box overflow-y-hidden z-20">
      <h3>Check in with Andre</h3>
      <p>11:00 - 11:30</p>
    </div>
    <div class="event-box green-box overflow-y-hidden z-20">
      <h3>Lunch with Anita</h3>
      <p>2:00 - 4:00</p>
    </div>

    <button class="icon-btn add-event absolute border-none bg-transparent p-0 z-20">
      <img src="/static/images/add-btn.svg" alt="" />
    </button>
  </div>
</div>
<CalendarModal bind:isOpen={isCalendarModalOpen} {url} />

<style lang="scss">
  :global(.hide-bottom-bar) {
    .bottom-calendar-wrapper {
      height: 10px;
      transition: 50ms;

      .date-wrapper {
        display: none;
      }

      .calendar-wrapper {
        display: none;
      }
    }
  }

  .bottom-calendar-wrapper {
    // display: flex;
    // position: relative;
    // position: sticky;
    bottom: 0;
    // margin-left: -1em;
    // padding: 10px 0;
    // border-top: 1px solid #eaeaea
  }

  .current-time-line {
    position: relative;
    height: 65px;
    width: 2px;
    background-color: purple;
    bottom: 0px;
    left: 40%;
    z-index: 1110;
  }

  .calendar-toggle {
    // position: absolute;
    right: 0;
    // background: white;
    // z-index: 99;
    margin: auto;
    height: 30px;
    // border-radius: 16px;
    // display: flex;
    top: -15px;
    left: 0;
    width: 60px;
    // justify-content: center;
  }

  .bottom-calendar-wrapper .date-wrapper {
    // background: #fff;
    left: 240px;
    right: 220px;
    width: 20%;
    /* padding-top: 15px;
		padding-bottom: 15px;
		padding-left: 15px; */

    h3 {
      // color: #454545;
      font-size: 1.1rem;
      // margin: 0;
    }

    p {
      // margin: 4px 0 2px 0;
      font-size: 0.875rem;
      // color: #a5a5a5;
    }
  }

  .calendar-wrapper {
    width: 80%;
    display: flex;

    /*background: url(../images/line.svg);*/
    background-repeat: no-repeat;
    background-position: left bottom;
    /* padding-left: 20px;
		overflow-y: hidden; */

    .event-box {
      height: 60px;
      // overflow-y: hidden;
    }

    .out-box {
      width: 150px;
      background: #fcfcfc;
      box-shadow: 0px 1px 3px rgb(0 0 0 / 8%);
      border-radius: 8px;
      margin-right: 15px;
      padding: 8px 15px;
      height: 52px;
      margin-top: 10px;

      h3 {
        font-size: 0.875rem;
        color: #3b3b3b;
        margin: 0;
      }
      p {
        margin: -5px 0 0;
        padding: 0;
        color: #a5a5a5;
        font-size: 0.75rem;
      }
    }
    .orange-box {
      background: linear-gradient(270deg, #f9b12a 0%, #fd8524 100%);
      box-shadow: 0px 1px 3px rgb(0 0 0 / 8%);
      border-radius: 8px;
      margin-right: 15px;
      padding: 8px 15px;
      height: 52px;
      margin-top: 10px;
      h3 {
        color: #fff;
        font-size: 0.875rem;
      }
      p {
        font-size: 0.75rem;
        color: #fff;
        margin: 0;
      }
    }
    .green-box {
      background: linear-gradient(270deg, #8ec52e 0%, #1dc251 100%);
      box-shadow: 0px 1px 3px rgb(0 0 0 / 8%);
      border-radius: 8px;
      margin-left: 100px;
      margin-right: 15px;
      padding: 8px 15px;
      height: 52px;
      margin-top: 10px;

      h3 {
        font-size: 0.875rem;
        color: #fff;
      }

      p {
        font-size: 0.75rem;
        color: #fff;
        margin: 0;
      }
    }
  }

  .icon-btn.add-event {
    // position: absolute;
    top: 35px;
    right: 40px;
  }

  .icon-btn {
    /* border: none;
		box-shadow: none;
		background: transparent;
		padding: 0; */
  }
</style>
