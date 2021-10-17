<script>
	import PrimaryBadge from './PrimaryBadge.svelte';

	export let mail;
</script>

<div class="panel-item flex justify-between items-center mb-2 border-b border-gray-100">
	<div class="panel-content flex justify-start items-center content-around w-full">
		{#if mail.isUser}
			<img src="/static/avatars/{mail.sender.avatar}" alt="img-avatar" class="avatar  mr-4" />
			<h3 class="sender text-gray-700 text-md m-0 pb-2">
				{mail.sender.first}
				{mail.sender.last}
			</h3>
		{:else}
			<div
				class="sender-initials uppercase text-center text-4xl flex justify-center items-center mr-4"
			>
				<span>{mail.sender.id[1]}</span>
			</div>
			<h3 class="sender p-0 ">{mail.sender.id}</h3>
		{/if}
		<div class="inner-content ml-2 w-full h-full self-start">
			<PrimaryBadge subject={mail.subject} timeago={mail.timeago} />
			<p class="text-gray-400 text-sm m-0">{mail.body}</p>
		</div>
	</div>
	<button class="icon-btn float-right flex mt-2">
		<img src="/static/images/dots-menu.svg" alt="" />
	</button>
</div>

<style lang="scss">
	.panel-item {
		.panel-content {
			h3.sender {
				padding: 0;
				width: 40%;
				max-width: 250px;
				overflow-x: hidden;
			}

			p {
				font-family: 'proxima-nova';
			}

			.primary-badge {
				background: #f4ebf5;
				color: #7838a2;
				font-size: 6pt;
				word-break: break-all;
			}

			img {
				width: 40px;
				height: 40px;
			}
		}
	}
	.sender-initials {
		width: 40px;
		height: 40px;
		min-width: 40px;
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
</style>
