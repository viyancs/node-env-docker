<script>
	import { get } from "../../Context.svelte";
	import { CustomAccordion } from "../../accordion";

	const context = get();

	$: users = $context.users;
	$: user_id = $context.user_id;

</script>

<CustomAccordion id="rightSidebarTeam" title={`Team (${users.length})`}>
	<div class="team-wrapper dd-cont">
		{#each users ?? [] as { id, role, avatar, first, last }}
			{#if id != user_id}
				<div class="team-list draggable">
					<img src="/static/avatars/{avatar}" class="avatar" />
					<div class="team-content">
						<h3>{first} {last}</h3>
						<p>{role}</p>
					</div>
				</div>
			{/if}
		{/each}
	</div>
</CustomAccordion>

<style lang="scss">
	.team-wrapper {
		height: 40vh;
		overflow: auto;
	}

	.team-wrapper .team-list {
		display: flex;
		padding: 10px 0;
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

	.team-wrapper .team-list .team-content {
		margin-left: 10px;
	}

	.team-wrapper .team-list .team-content h3 {
		font-size: 0.875rem;
		margin: 0 0 5px 0;
	}

	.team-wrapper .team-list .team-content p {
		color: #a5a5a5;
		opacity: 0.81;
		font-size: 0.75rem;
		margin: 0;
	}
</style>
