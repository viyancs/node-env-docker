<script context="module">
	export const key = "index";
</script>

<script>
	import { setContext } from "svelte";
	import { Square } from "svelte-loading-spinners";
	import { writable } from "svelte/store";

	import {
		AddToCalendarModal,
		Bottom,
		Item,
		Menu,
		MailModal,
		TopNavbar,
		Left,
		Right,
		PanelDailyTasks,
		PanelMail,
		PanelChat,
		PanelTeamTask,
		Context,
	} from "@specta/core";
	import { Login, FireApp, Signup } from "@specta/core/auth";

	import SetPromiseResult from "./SetPromiseResult.svelte";
	import NoInternet from "./NoInternet.svelte";

	import { Router, Route, navigate } from "svelte-routing";

	import endpoint from './endpoint'

	let isleftOpen = true;
	let isRightOpen = false;
	let isMailModalOpen = false;
	let isCalendarModalOpen = false;
	let marginLeft = 0;

	const calendarEvent = writable(undefined);

	setContext(key, calendarEvent);

	let rightValue = 1;

	$: if (isCalendarModalOpen) {
		isleftOpen = false;
		isRightOpen = false;
		isMailModalOpen = false;
	}

	let promise;

	console.log(endpoint)
	const indexEndpoint = `${endpoint}/index.json`;
	const eventEndpoint = `${endpoint}/event.json`;
	const chatEndpoint = `${endpoint}/chat.json`;
</script>

<FireApp>
	<Router basepath="/">
		<Route path="/">
			<Login
				on:signup={() => {
					navigate("/signup");
				}}
			>
				{#await (promise = fetch("http://localhost:3000/index.json"))}
					<!-- promise is pending -->
					<div
						class="w-screen h-screen flex justify-center items-center absolute insets-0"
					>
						<Square size="60" color="#7C3AED" unit="px" duration="1s" />
					</div>
				{:then value}
					<!-- promise was fulfilled -->
					<SetPromiseResult result={value} let:context>
						<Context value={context}>
							<div class="layout" style="--main-padding:1em;">
								<Left bind:isOpen={isleftOpen} bind:marginLeft>
									<Menu class="visible">
										<Item img="static/images/dashboard-icon.svg" key="dash"
											>Dashboard</Item
										>
										<Item
											img="static/images/mail-icon.svg"
											key="mail"
											on:click={() => (isMailModalOpen = !isMailModalOpen)}
											>Mail</Item
										>
										<Item
											img="static/images/calendar-icon.svg"
											key="calendar"
											on:click={() => {
												isCalendarModalOpen = !isCalendarModalOpen;
											}}>Calendar</Item
										>
										<Item img="static/images/speaker-icon.svg" key="artists"
											>Artists</Item
										>
										<Item img="static/images/team-icon.svg" key="team"
											>Team</Item
										>
										<Item img="static/images/contacts-icon.svg" key="contacts"
											>Contacts</Item
										>
									</Menu>
								</Left>

								<div class="main-wrapper pl-12">
									<TopNavbar />
									<div
										class="scrollable-content-wrapper pr-12 pt-2 overflow-y-auto h-screen"
										style="margin-left: -{marginLeft * 54}vw;"
									>
										<PanelMail />
										<PanelChat chatUrl="http://localhost:3000/chat.json" />
										<PanelTeamTask />
										<PanelDailyTasks />
									</div>
									<Bottom
										bind:isCalendarModalOpen
										value={(1 - rightValue) * 225}
										url={"http://localhost:3000/events.json"}
									/>
								</div>
							</div>

							<Right bind:isOpen={isRightOpen} bind:value={rightValue} />

							<MailModal bind:isOpen={isMailModalOpen} />

							<AddToCalendarModal message={$calendarEvent} />
						</Context>
					</SetPromiseResult>
				{:catch error}
					<NoInternet
						on:click={() =>
							(promise = fetch("http://localhost:3000/index.json"))}
					/>
				{/await}
			</Login>
		</Route>
		<Route path="/signup">
			<Signup
				on:success={() => {
					navigate("/");
				}}
			/>
		</Route>

		<Route>404</Route>
	</Router>
</FireApp>

<style lang="scss" global>
	@import "./tailwind.css";

	.layout {
		display: flex;
		flex-direction: row;

		.main-wrapper {
			flex: 1;
			margin-right: calc(225px * 0.2);
			// padding-left: 1em;
		}
	}

	.scrollable-content-wrapper {
		display: grid;
		grid-template-columns: auto auto auto;
		column-gap: 1em;
		row-gap: 1em;
		// flex-direction: row;
		justify-content: flex-start;
		align-items: flex-start;
		align-content: flex-start;
		// overflow-y: auto;
		// height: 100vh;
		// padding-top: 1em;
		// padding-right: 1em;

		&::-webkit-scrollbar {
			display: none;
		}
	}
	.col {
		min-width: -webkit-min-content;
		min-width: -moz-min-content;
		min-width: min-content;
		height: 70vh;
		flex-direction: column;
		// margin-right: 40px;
	}

	@font-face {
		font-family: "proxima-nova-S";
		src: url("static/fonts/Proxima-Nova-Soft.ttf");
	}

	@font-face {
		font-family: "proxima-nova-B";
		src: url("static/fonts/ProximaNova-Bold.otf");
	}

	@font-face {
		font-family: "proxima-nova-R";
		src: url("static/fonts/ProximaNova-Regular.otf");
	}

	//***********FONTS ***********************

	html,
	body * {
		font-family: "proxima-nova-R";
		font-size: 100%;
		::-webkit-scrollbar {
			display: none;
		}
	}

	#main-wrapper {
		flex: 1;
		display: flex;
		z-index: 800;
		position: relative;
	}

	.main-wrapper {
		-ms-flex: 1;
		flex: 1;
		-ms-flex-direction: column;
		flex-direction: column;
		display: -ms-flexbox;
		display: flex;
		z-index: 8;
		transition: all 0.05s;
		background-color: #f4f9fc;
		overflow-y: hidden;
		height: 100vh;
		width: 100%;
		// margin-right: 44px;
	}

	.trans-bg {
		width: 115px;
	}

	.trans-bg .nav-link {
		background: transparent !important;
	}

	.calendar-detail {
		margin: 10px 0;

		p {
			margin: 10px 0 !important;

			img {
				margin-right: 5px;
			}
		}

		.btn.btn-outline {
			border-radius: 20px;
			color: #7838a2;
			border: 1px solid #7838a2;
			padding: 2px 13px;
			font-size: 0.75rem;
			background: #fff;
			margin-left: 25px;
		}
	}

	.createEventWrapper {
		> p {
			font-size: 0.875rem;
			width: 100%;
			max-width: 225px;
		}

		input.form-control {
			border: 2px solid #76309a;
			background: transparent;
			margin-bottom: 12px;
			height: 25px;
			width: 100%;
			max-width: 200px;
			border-radius: 20px;
			font-size: 0.875rem;
		}

		.btn.btn-primary {
			background: linear-gradient(90deg, #6e319c 6.04%, #942d93 100%);
			border-radius: 30px;
			padding: 12px 25px;
			font-size: 0.875rem;
			border: none;
		}
	}

	.email-modal .modal-content {
		padding: 10px;
		.modal-checkbox {
			display: inline-block;
			width: 20px;
		}
	}

	.mail-modal-rec-list .panel-inner-wrapper {
		margin: 0;
		background: rgba(255, 255, 255, 0.5);
		box-shadow: 0px 12px 54px rgba(0, 0, 0, 0.1);

		.mail-wrapper {
			max-height: 600px;
		}
	}

	.email-controls-wrapper {
		p {
			color: #454545;
			font-size: 0.875rem;
		}

		.form-control {
			border: 1px solid #d9d9d9;
			background: transparent;
			margin-bottom: 10px;
			height: 30px;
			font-size: 0.875rem;
		}

		textarea.form-control {
			height: 450px;
		}

		input.btn.btn-primary {
			background: linear-gradient(90deg, #6e319c 6.04%, #942d93 100%);
			border: none;
			border-radius: 20px;
			padding: 7px 20px;
			font-size: 0.875rem;
			margin: 20px 0 0 0;
		}
	}

	input.form-control.userIcon {
		background-image: url(../images/person-icon.svg);
		background-repeat: no-repeat;
		padding-left: 25px;
		background-position: left 5px center;
	}

	.scroll-mover-btn {
		&.right {
			position: absolute;
			bottom: 0;
			top: 0;
			background: transparent;
			border: none;
			height: 70px;
			margin: auto;
			right: 230px;
			cursor: pointer;
			transition: 50ms;
			outline: none;
		}

		&.left {
			position: absolute;
			bottom: 0;
			top: 0;
			background: transparent;
			border: none;
			height: 70px;
			margin: auto;
			left: 240px;
			transform: rotate(180deg);
			cursor: pointer;
			transition: 50ms;
			outline: none;
		}
	}

	@media (min-width: 992px) {
		.modal-lg {
			max-width: 1000px;
		}
	}

	.grid {
		display: grid;
		height: 85%;
		grid-auto-flow: column;
		grid-auto-columns: 400px;
		grid-auto-rows: 40%;
		grid-template-rows: 1fr;
		column-gap: 2vw;

		/* This element will overflow scroll and scroll-snap */
		overflow-x: scroll;
		scroll-snap-type: x mandatory;
		scroll-behavior: smooth;
	}

	.modal-backdrop {
		z-index: 1040;
	}

	.animate-bottom {
		position: relative;
		animation: animatebottom 200ms;
	}

	@keyframes animatebottom {
		from {
			bottom: -300px;
			opacity: 0;
		}

		to {
			bottom: 0;
			opacity: 1;
		}
	}

	#main-wrapper > .dropdown-menu {
		z-index: 12;
	}

	/***********************************************************************************/

	:global(.modal-backdrop) {
		z-index: 9999;
	}

	@media (min-width: 992px) {
		:global(.modal-dialog) {
			max-width: 1000px !important;
		}
		:global(.modal-dialog.calendar) {
			max-width: 92vw !important;
		}
	}
</style>
