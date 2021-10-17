<script>
	import { Avatar } from "./components";

	export let img;
	export let name;
	export let role;
</script>

<div class="team-list draggable">
	<Avatar src={img} alt={name} />
	<div class="team-content">
		<h3>{name}</h3>
		<p>{role}</p>
	</div>
</div>

<style lang="scss">
	.team-list {
		display: flex;
		padding: 10px 0;

		.team-content {
			margin-left: 10px;

			h3 {
				font-size: 0.875rem;
				margin: 0 0 5px 0;
			}

			p {
				color: #a5a5a5;
				opacity: 0.81;
				font-size: 0.75rem;
				margin: 0;
			}
		}
	}
</style>
