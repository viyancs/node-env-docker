<script>
	import { get } from "../Context.svelte";
	import PanelDailyTasks from "./task/PanelDailyTasks.svelte";
	import Task from "../Task.svelte";
	import { Avatar } from "../components";
	import PanelInner from "./PanelInner.svelte";
	export let movePointerDown
	export let getFocusElement
	export let inFocus

	const context = get();

	$: teamTasks = $context?.teamTasks ?? [];
</script>
<PanelDailyTasks
{inFocus}
{getFocusElement}
{movePointerDown}
componentName = "PanelTeamTask"
name="team-tasks" title="Team Tasks" subtitle="(2/5)">
	<svelte:fragment slot="action">
		<div slot="action" class="cursor-pointer font-bold">New Task</div>
	</svelte:fragment>
	
	<PanelInner>
		{#each teamTasks as task}
			<Task {task}>
				<div class="task-assign-wrapper gr-3">
					<div class="task-assign-inner">
						{#each task.users as user}
							<Avatar src="/static/avatars/{user.avatar}" alt="img-avatar" />
						{/each}
					</div>
				</div>
			</Task>
		{/each}
	</PanelInner>
</PanelDailyTasks>
