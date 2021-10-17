<script>
  import Task from '../../Task.svelte'
  import PanelInner from '../PanelInner.svelte'
  import PanelTasksBase from '../PanelTasksBase.svelte'
  import { get } from '../../Context.svelte'
  import { ShouldDisplay } from '../../components'

  let _class = ''
  export let movePointerDown
  export let getFocusElement
  export let componentName = 'PanelDailyTasks'
  export let inFocus
  export let title = 'Daily Tasks'
  export { _class as class }

  const context = get()
  $: dailyTasks = $context.dailyTasks
  $: tasksRemaining = $context.dailyTasks.length
  $: subtitle = $context.dailyTasks.length || '(0)'
</script>

<ShouldDisplay name={componentName}>
  <PanelTasksBase
    {getFocusElement}
    {inFocus}
    {componentName}
    {movePointerDown}
    class="tasks-daily {_class} flex-1"
    name="tasks-daily"
    {title}
    {subtitle}
  >
    <svelte:fragment slot="action"
      ><div slot="action" class="cursor-pointer font-bold">New Task</div></svelte:fragment
    >
    <slot>
      <PanelInner>
        {#each dailyTasks as task}
          <Task {task} />
        {/each}
      </PanelInner>
    </slot>
  </PanelTasksBase>
</ShouldDisplay>
