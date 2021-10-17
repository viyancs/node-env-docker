<script>
  import { onMount } from 'svelte'
  export let name = ''
  export let title = ''
  export let subtitle = ''
  let _class = ''
  export { _class as class }
  export let componentName
  export let movePointerDown
  export let getFocusElement
  export let inFocus
</script>

<div
  class="panel p-2 flex flex-col {[name, _class].filter(Boolean).join(' ')}"
  class:inFocus
  id={componentName}
  on:dblclick|stopPropagation={e => {
    if (inFocus) {
      getFocusElement(e)
    }
  }}
>
  <div class="panel-header" class:inFocus>
    <div
      class="panel-title"
      on:dblclick|stopPropagation={e => getFocusElement(e)}
      on:pointerdown={movePointerDown}
    >
      <h3 class="draggable">
        {#if inFocus}
          <img src="./images/focusMode.png" class="w-4" id="inFocus" alt="" />
        {/if}
        {title}
        <span> {subtitle}</span>
      </h3>
    </div>
    <div class="panel-action">
      <img src="/static/images/edit-icon.svg" alt="" />
      <slot name="action" />
    </div>
  </div>

  <slot />
</div>

<style lang="scss">
  #inFocus {
    display: inline;
    user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -o-user-select: none;
  }

  @import '../style/vars';
  img.avatar {
    display: block;
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
    border: 2px solid lightgray;
  }
  .panel {
    // margin: 10px 40px;
    flex: 1;
    overflow-y: 0;
    //min-height: 400px;
    height: 100%;
    // margin: 1vh 20px 0.5vh 20px;
    padding: 0;
    margin: 0;
    // padding: 0 10px;
    width: 100%;
    //min-width: 600px;
    max-height: fit-content;
    &.hidden {
      display: none;
      animation: animatebottom 200ms;
    }
    &.inFocus {
      background: white;
      border-radius: 0.5rem;
    }
  }
  .panel-header {
    display: flex;
    border-bottom: 2px solid #ced2d4;
    justify-content: space-between;
    float: left;
    width: 100%;

    .panel-action {
      font-family: 'proxima-nova';
      font-size: 0.6rem;
      display: flex;
      align-items: center;
      color: $primary-color;
      a:link,
      a:visited {
        color: #7838a2;
      }
      img {
        margin-right: 5px;
      }
    }
    .panel-title {
      h3 {
        margin: 0;
        color: #454545;
        font-size: 20px;
        border-bottom: 2px solid $primary-color;
        margin-bottom: -2px;
        cursor: move;
      }
      span {
        font-size: 0.875rem;
      }
    }
  }
  .panel-header :global(a) {
    font-family: 'proxima-nova';
    font-size: 0.6rem;
    display: flex;
    align-items: center;
    color: $primary-color;
    :global(a:link),
    :global(a:visited) {
      color: #7838a2;
    }
    :global(img) {
      margin-right: 5px;
    }
  }
</style>
