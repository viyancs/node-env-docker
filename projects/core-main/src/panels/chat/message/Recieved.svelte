<script>
  import { format } from 'date-fns'
  import UrlParser from './UrlParser.svelte'
  import { Avatar } from '../../../components'

  /**
   * @type {import('../../../models').Message}
   */
  export let message
  export let avatar

  const userPromise = message.user.get()
</script>

<div class="chat recieve">
  <div class="chat-inner">
    <div class="avatar-wrapper">
      {#await userPromise then user}
        <Avatar {user} radius="50%" />
      {/await}
    </div>

    <div
      class="chat-box rounded-tl-xl rounded-tr-xl rounded-bl-none rounded-br-xl border border-gray-200 p-2 bg-gray-100 flex flex-col space-y-2"
    >
      <div class="attachements">
        {#each Object.values(message.attachements) as attachement}
          <div class="attachement">
            <div class="downloadBtn">
              <a
                href={attachement.downloadURL}
                download={attachement.name}
                crossorigin="anonymous"
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
    </div>

    <p class="date-time text-gray-400 mt-2 col-span-2">
      {format(message.timestamp, 'dd MMM hh:mm:ss')}
    </p>
  </div>
</div>

<style lang="scss">
  @import '../../../style/vars';

  .chat.recieve {
    max-width: 50%;
    .chat-inner {
      display: grid;
      grid-template-columns: auto 1fr;
      grid-template-rows: auto;
      grid-auto-flow: row;
      column-gap: 5px;

      .chat-box {
        width: fit-content;

        p {
          font-size: 12px;
        }
      }

      .date-time {
        grid-column-start: 2;
        font-size: 11px;
      }
    }
  }
  .avatar-wrapper {
    width: 40px;
    height: 40px;
  }
  .chat img.avatar {
    display: flex;
    align-self: flex-end;
    &.big {
      display: inline-block;
    }
  }

  .chat .calendar-icon {
    margin-right: 20px;
  }

  .chat img.avatar.big {
    display: inline-block;
  }
  .chat img.avatar {
    display: flex;
    align-self: flex-end;
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
