<script>
	import { getContext, onMount } from "svelte";
	import { get } from "../Context.svelte";
	import { Input, Modal, ModalBody, Button, Form, Col, Row } from "sveltestrap";
	import { MailItem } from "../components";

	const context = get();

	$: mails = $context.mails;

	export let isOpen = false;

	let recipient = "";
	let subject = "";
	let body = "";

	onMount(() => {
		const upHandler = (e) => {
			if (e.key === "m" && e.shiftKey) {
				isOpen = !isOpen;
			}
		};

		document.addEventListener("keyup", upHandler);

		return () => document.removeEventListener("keyup", upHandler);
	});
</script>

<Modal {isOpen} toggle={() => (isOpen = !isOpen)}>
	<ModalBody>
		<div class="flex space-x-2">
			<div class="flex flex-col flex-1">
				<div class="mail-modal-rec-list">
					<div
						class="panel-inner-wrapper p-2 float-left rounded shadow-sm border border-gray-50 overflow-y-auto"
					>
						<div class="mail-wrapper">
							{#each mails as mail}
								<MailItem {mail} />
							{/each}
						</div>
					</div>
				</div>
			</div>
			<div class="flex flex-col flex-1 space-y-2">
				<h3 class="py-2 font-bold">New Message</h3>

				<Form class="flex flex-col flex-1 space-y-2">
					<Input
						type="text"
						class="userIcon"
						placeholder="Recipients"
						bind:value={recipient}
					/>
					<Input
						type="text"
						class=""
						placeholder="Subject"
						bind:value={subject}
					/>
					<Input class="flex-1" type="textarea" name="text" bind:value={body} />
				</Form>
				<div class="flex space-x-2">
					<Button color="primary">Send</Button>
					<Button color="secondary">Save draft</Button>
				</div>
			</div>
		</div>
	</ModalBody>
</Modal>

<style lang="scss">
	.mail-modal-rec-list .panel-inner-wrapper {
		margin: 0;
		background: rgba(255, 255, 255, 0.5);
		box-shadow: 0px 12px 54px rgb(0 0 0 / 10%);
	}
	.panel-inner-wrapper :global(img.avatar),
	.panel-inner-wrapper :global(.sender-initials) {
		width: 50px;
		height: 50px;
		margin: auto 2% auto 0;
	}

	.modal-header {
		border: none;
		padding: 0;

		h5 {
			color: #454545;
			font-size: 1.1rem;
			margin: 0 0 15px 0;
		}
	}

	.calendar-wrapper {
		width: 80%;
		display: flex;
	}

	.videocall-modal {
		width: 529px;
		.modal-content {
			padding: 0;
		}
	}

	.bottom-calendar-wrapper {
		display: flex;
		position: relative;
		z-index: 99999;
		background: #fff;
		position: fixed;
		bottom: 0;
		left: 240px;
		right: 220px;
		padding: 10px 0;

		.date-wrapper {
			background: #fff;
			left: 240px;
			right: 220px;
			width: 20%;
			padding-top: 15px;
			padding-bottom: 15px;
			padding-left: 15px;

			h3 {
				color: #454545;
				font-size: 1.1rem;
				margin: 0;
			}

			p {
				margin: 4px 0 2px 0;
				font-size: 0.875rem;
				color: #a5a5a5;
			}
		}
	}

	.mail-modal-rec-list .panel-inner-wrapper .mail-wrapper {
		max-height: 600px;
	}

	/***********************************************************/
</style>
