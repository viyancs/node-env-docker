<script>
	import { onMount } from 'svelte';

	import { writable } from 'svelte/store';

	/**
	 * @type Response
	 */
	export let result;

	const context = writable({
		users: [],
		artists: [],
		userId: null,
		user: null,
		artistEvents: [],
		events: [],
		chatMessages: [],
		chatUser: null,
		mails: [],
		now: new Date(),
		dailyTasks: [],
		teamTasks: []
	});

	onMount(async () => {
		const json = await result.json();
		$context.users = json?.users ?? [];
		$context.artists = json?.artists ?? [];
		$context.userId = json?.userId;
		$context.user = json?.user;
		$context.artistEvents = json?.artistEvents ?? [];
		$context.events = json?.events ?? [];
		$context.chatMessages = json?.chatMessages ?? [];
		$context.chatUser = json?.chatUser;
		$context.mails = json?.mails ?? [];
		$context.now = json?.now;
		$context.dailyTasks = json?.dailyTasks ?? [];
		$context.teamTasks = json?.teamTasks ?? [];
	});
</script>

<slot {context} />
