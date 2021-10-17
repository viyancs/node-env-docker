<script>
	import { differenceInMinutes } from "date-fns";
	import { orderBy } from "firebase/firestore";
	import { createEventDispatcher, onDestroy, onMount } from "svelte";
	import { Avatar } from "../../components";
	import { store } from "../../auth/fireStore";
	import TypingIndicator from "../../components/chat/TypingIndicator.svelte";

	const profile = store.profile;
	/**
	 * @type {import('../../models').User}
	 */
	export let currentUser;
	export let active = false;

	/**
	 * @type { import('../../models').Room }
	 */
	export let room;

	/**
	 * @type { import('../../models').Message }
	 */
	let lastMessage;

	const dispatch = createEventDispatcher();

	/**
	 * @type { import('../../models').User[] }
	 */
	let users = [];
	let currentMessages = []
	onMount(() => {
		room.targets(currentUser).then(async (members) => {
			users = await Promise.all(members.map((d) => d.user.get()));
			room.setUsers(users)
		});

		const lastMessageWatcherUnsubscriber = room.watch(async (instance) => {
			lastMessage = await instance.lastMessage.get();
		});

		let unsubscribeOnMessage = room.messages.watch((messages) => {
			
			
			

			dispatch("message", messages);
		}, orderBy("timestamp", "desc"));

		
		return () => {
			lastMessageWatcherUnsubscriber();
			unsubscribeOnMessage();
		};
	});

	let typingMembers=[];
	$: onTypingWatcherUnsubscriber = room?.onTyping($profile, (members) => {
		typingMembers = members;
	});


	let now = +new Date();
	const interval = setInterval(() => (now = +new Date()), 1000 * 60);

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<div
	class="room p-2 border-b-2 border-gray-100 cursor-pointer"
	class:active
	on:click
>
	<div class="avatar-wrapper">
		{#each users as user}
			<Avatar {user} radius="50%" />
		{/each}
	</div>

	<div class="room-name ">
		{#each users as user}
			<h3 class="text-gray-500 mb-2">{user.fullName}</h3>
		{/each}
	</div>
	<span class="room-last-active text-gray-400 m-0">
		{#if typingMembers.length}
			<TypingIndicator/>
		{:else}
			{#if lastMessage?.timestamp}
				{differenceInMinutes(now, lastMessage.timestamp)} min
			{:else}
				start conversation
			{/if}
		{/if}
	</span>
</div>

<style lang="scss">
	@import "../../style/vars";

	.room {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-columns: auto 1fr;
		column-gap: 8px;
		&:hover {
			background-color: $primary-color;
			// cursor: pointer;
		}

		&:hover * {
			color: $white-color;
		}
		&.active {
			background-color: rgba($color: #6e319c, $alpha: 0.2);
		}
	}

	.avatar-wrapper {
		grid-column-start: 1;
		grid-column-end: 2;

		grid-row-start: 1;
		grid-row-end: 3;

		width:40px; 
		height: 40px;
	}
	.room-name {
	}
	.room-name h3 {
		font-size: 13px;
	}

	.room-last-active {
		font-size: 11px;
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
