<script context="module">
	export const key = 'calendarEvent';

	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch, session, context }) {
		const res = await fetch('/index.json');

		const {
			users = [],
			artists = [],
			userId,
			user,
			artistEvents,
			tasksAndUsers,
			events,
			chatMessages,
			chatUser,
			mails,
			now,
			dailyTasks,
			teamTasks
		} = await res.json();

		return {
			props: {
				users,
				artists,
				userId,
				user,
				artistEvents,
				tasksAndUsers,
				events,
				chatMessages,
				chatUser,
				mails,
				now,
				dailyTasks,
				teamTasks
			}
		};
	}
</script>

<script>
	import { writable } from 'svelte/store';
	import { setContext } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import {
		AddToCalendarModal,
		MenuItem,
		Menu,
		MailModal,
		Left,
		Right,
		Context,
		TopNavbar,
		MessageNotificationOverlay
	} from '@specta-app/core';
	import { Middleware as Guard } from '@specta-app/core/auth';

	let isleftOpen = false;
	let isRightOpen = false;
	let isMailModalOpen = false;
	let isCalendarModalOpen = false;
	let marginLeft = 0;

	const sides = writable({
		left: false,
		right: false,
		bottom: false
	});
	setContext('sides', sides);

	const calendarEvent = writable(undefined);

	setContext('index', calendarEvent);

	let rightValue = writable(1);
	setContext('index:right-value', rightValue);

	$: if (isCalendarModalOpen) {
		isleftOpen = false;
		isRightOpen = false;
		isMailModalOpen = false;
	}

	export let users;
	export let artists;

	export let userId;
	export let user;
	export let artistEvents;
	export let events;
	export let chatMessages;
	export let chatUser;
	export let mails;
	export let now;
	export let dailyTasks;
	export let teamTasks;

	const context = writable({
		users,
		artists,
		userId,
		user,
		artistEvents,
		events,
		chatMessages,
		chatUser,
		mails,
		now,
		dailyTasks,
		teamTasks
	});
	console.log(new Date());
</script>

<Guard
	onDeny={() => {
		console.log('on:deny');
		goto('/');
	}}
>
	<Context value={context}>
		<div class="layout" style="--main-padding:1em;">
			<Left bind:isOpen={isleftOpen} bind:marginLeft>
				<Menu class="visible">
					<MenuItem img="/static/images/dashboard-icon.svg" key="dash" on:click={()=>{
						goto('/app')
					}}>Dashboard</MenuItem>
					<MenuItem
						img="/static/images/mail-icon.svg"
						key="mail"
						on:click={() => (isMailModalOpen = !isMailModalOpen)}>Mail</MenuItem
					>
					<MenuItem
						img="/static/images/calendar-icon.svg"
						key="calendar"
						on:click={() => {
							isCalendarModalOpen = !isCalendarModalOpen;
						}}>Calendar</MenuItem
					>
					<MenuItem img="/static/images/speaker-icon.svg" key="artists">Artists</MenuItem>
					<MenuItem img="/static/images/team-icon.svg" key="team">Team</MenuItem>
					<MenuItem img="/static/images/contacts-icon.svg" key="contacts">Contacts</MenuItem>
				</Menu>
			</Left>

			<div class="main-wrapper pl-4 relative">
				<TopNavbar
					on:profileClicked={() => {
						goto('/app/profile');
					}}
				/>
				<slot />
			</div>
		</div>

		<Right bind:isOpen={isRightOpen} bind:value={$rightValue} />

		<MailModal bind:isOpen={isMailModalOpen} />
		<MessageNotificationOverlay />
		<AddToCalendarModal message={$calendarEvent} />
	</Context>
</Guard>
