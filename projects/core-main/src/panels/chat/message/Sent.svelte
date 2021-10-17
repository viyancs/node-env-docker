<script>
  import { format } from 'date-fns'
  import CalendarDetail from '../CalendarDetail.svelte'
  import UrlParser from './UrlParser.svelte'
  import { Avatar } from '../../../components'
  /**
   * @type {import('../../../models').Message}
   */
  export let message
  export let avatar

  const userPromise = message.user.get()
</script>

<div class="chat send">
  <div class="chat-inner">
    <div
      class="chat-box rounded-tl-xl rounded-tr-xl rounded-bl-xl rounded-br-none border border-purple-400 p-2 flex flex-col space-y-2"
    >
      <div class="attachements">
        {#each Object.values(message.attachements) as attachement}
          <div class="attachement">
            <div class="downloadBtn">
              <a
                href={attachement.downloadURL}
                download={attachement.name}
                crossorigin="anonymous"
                target="_blank"
              >
                <img src="./images/download.png" alt="download" />
              </a>
            </div>
            <a
              href={attachement.downloadURL}
              target="_blank"
              class="attachementLink flex-1"
            >
              <img src={attachement.downloadURL} alt={attachement.name} />
            </a>
          </div>
        {/each}
      </div>
      <UrlParser value={message.body} let:value>
        <p class="m-0 text-gray-500">
          {#each value as span, i}
            {#if i % 2 !== 0}
              <a href={!span.includes('http') ? `//${span}` : span}>{span}</a>
            {:else}
              {span}
            {/if}
          {/each}
        </p>
      </UrlParser>
      {#if message?.event?.validated}
        <CalendarDetail message={message.body} on:click={e => {}} />
      {/if}
    </div>
    <div class="avatar-wrapper">
      {#await userPromise then user}
        <Avatar {user} radius="50%" />
      {/await}
    </div>
    <p class="date-time mt-2 text-right text-gray-400">
      {format(message.timestamp, 'dd MMM hh:mm:ss')}
    </p>
  </div>
</div>

<style lang="scss">
  @import '../../../style/vars';

  .chat.send {
    max-width: 50%;
    justify-self: flex-end;
    align-self: flex-end;
    .chat-inner {
      display: grid;
      grid-template-columns: 1fr auto;
      grid-template-rows: auto;
      grid-auto-flow: row;
      column-gap: 5px;
      justify-items: flex-end;

      .chat-box {
        width: fit-content;
        background: linear-gradient(90deg, #6e319c 6.04%, #942d93 100%);

        p {
          font-size: 12px;
          color: $white-color;
        }
      }

      .date-time {
        font-size: 11px;
      }
    }
  }
  .avatar-wrapper {
    width: 40px;
    height: 40px;
  }
  img.avatar {
    display: block;
    width: 40px;
    height: 40px;
    -o-object-fit: cover;
    object-fit: cover;
    border-radius: 50%;
    border: 2px solid lightgray;
  }
  .chat img.avatar.big {
    display: inline-block;
  }

  .attachements {
    display: flex;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 8px;
    width: 100%;
  }
  .attachementLink {
    max-height: 16vh;
  }
  .attachement {
    max-height: 16vh;
    position: relative;
    width: 100%;
    &:hover > .downloadBtn {
      opacity: 1;
    }
    .downloadBtn {
      position: absolute;
      top: 3px;
      right: 3px;
      background: #f6f6f6;
      padding: 5px 10px;
      border-radius: 5px;
      box-shadow: 0px 0px 5px rgb(0 0 0 / 25%);
      opacity: 0;
      &:hover {
        background: #e3e3e3;
      }
      img {
        width: 15px;
      }
    }
  }
  .attachementLink > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 6px;
  }
</style>
