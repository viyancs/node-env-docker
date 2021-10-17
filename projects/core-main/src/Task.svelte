<script>
	import PanelItem from './panels/PanelItem.svelte';

	export let task;
</script>

<PanelItem class="task dd-cont dropzone">
	<label class="custom-checkbox mr-3 gr-1 relative">
		<input type="checkbox" name="task-{task.id}" checked={task.complete == '1'} />
		<span class="checkmark cursor-pointer" />
	</label>

	<div class="panel-list-inner-content task-content gr-2">
		<div class="task-title">{task.title}</div>
		<p class="task-due">Due: {task.dt_str}</p>
	</div>

	<slot />

	<svelte:fragment slot="button">
		<button class="icon-btn gr-4 float-right flex mt-2">
			<img src="/static/images/dots-menu.svg" alt="" />
		</button>
	</svelte:fragment>
</PanelItem>

<style lang="scss">
	.custom-checkbox input {
		position: absolute;
		opacity: 0;
		cursor: pointer;
		height: 0;
		width: 0;
	}

	.custom-checkbox input:checked ~ .checkmark {
		background-color: #31d253;
	}
	.custom-checkbox .checkmark {
		position: absolute;
		top: 50%;
		left: 0;
		transform: translate(0, -50%);
		height: 16px;
		width: 16px;
		border-radius: 20px;
		background-color: #ced2d4;
	}

	.task-content {
		line-height: 100%;
	}

	.task-title {
		font-size: 1rem;
	}

	.task-due {
		color: #a5a5a5;
		font-size: 0.875rem;
		font-family: 'proxima-nova';
		margin: 0;
	}

	.icon-btn {
		border: none;
		box-shadow: none;
		background: transparent;
		padding: 0;
	}
	img {
		vertical-align: middle;
		border-style: none;
	}
</style>
