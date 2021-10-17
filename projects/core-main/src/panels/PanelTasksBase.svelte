<script>
  import PanelBase from './PanelBase.svelte'

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

<PanelBase
  {getFocusElement}
  {inFocus}
  {componentName}
  {movePointerDown}
  {name}
  {title}
  {subtitle}
  class={_class}
>
  <slot name="action" slot="action">New Task</slot>
  <slot />
</PanelBase>

<style lang="scss">
  .panel-content.task {
    display: grid !important;
    grid-template-columns: 0.5fr 4fr 2fr 0.5fr;
    justify-items: start;
    align-items: center;
    height: 50px;
  }

  .custom-checkbox {
    position: relative;

    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }

    .checkmark {
      position: absolute;
      top: 0;
      left: 0;
      height: 16px;
      width: 16px;
      border-radius: 20px;
      background-color: #ced2d4;

      &::after {
        left: 9px;
        top: 5px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
      }
    }

    &:hover input ~ .checkmark {
      background-color: #ccc;
    }

    input:checked ~ .checkmark {
      background-color: #31d253;
    }

    &:after {
      content: '';
      position: absolute;
      display: none;
    }

    input:checked ~ .checkmark:after {
      display: block;
    }
  }

  .task-assign-wrapper {
    position: relative;

    .task-assign-inner {
      position: relative;
      width: 100%;

      img {
        position: absolute;
        z-index: 3;
        height: 80%;
        right: 0;
        top: -10px;
      }

      img:nth-child(1) {
        right: 15px;
        z-index: 2;
      }

      img:nth-child(2) {
        right: 35px;
        z-index: 0;
      }
    }
  }
  .task-content {
    line-height: 100%;
  }

  .task-title {
    font-size: 1rem;
  }

  .task-due {
    font-size: 0.5rem;
  }
</style>
