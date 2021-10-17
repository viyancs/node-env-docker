<script>
	import { spring } from "svelte/motion";
	import { onMount } from "svelte";
	import SideBarMainNav from "../SideBarMainNav.svelte";
	import Recent from "./Recent.svelte";
	import Store from "./Store.svelte";
	import Notes from "./Notes.svelte";
	import Toggle from "./Toggle.svelte";
	import {ShouldDisplay}  from "../../components";

	export let isOpen = false;
	export let marginLeft = 0;

	const tween = spring(0, { stiffness: 0.07, damping: 0.7 });

	$: if (isOpen) {
		$tween = 1;
	} else {
		$tween = 0;
	}

	const marginLeftSpring = spring(marginLeft, {
		stiffness: 0.05,
		damping: 0.7,
	});
	$: marginLeft = $marginLeftSpring;

	onMount(() => {
		const rightHandler = (e) => {
			if (e.key === "ArrowLeft" && e.shiftKey) {
				isOpen = !isOpen;
			}
		};
		const upHandler = (e) => {
			if (e.key === "ArrowUp" && e.shiftKey) {
				isOpen = !isOpen;
			}
		};

		document.addEventListener("keyup", rightHandler);
		document.addEventListener("keyup", upHandler);

		return () => {
			document.removeEventListener("keyup", rightHandler);
			document.removeEventListener("keyup", upHandler);
		};
	});
</script>

<aside
	class="left-sidebar app-sidebar widget-notes h-screen relative flex flex-col shadow-md z-10"
	style="width:{$tween * 240}px"
	class:hide={!isOpen}
>
	<div class="inner w-full h-full relative flex">
		<div class="content">
			<div class="logo-wrapper visible">
				<img src="/static/images/specta-logo.png" />
			</div>

			<slot>
				<SideBarMainNav class="visible" />
			</slot>

			<div class="custom-accordian-wrapper">
				<ShouldDisplay name="WidgetLeftNotes">
					<Notes />
				</ShouldDisplay>
				<ShouldDisplay name="WidgetLeftRecent">
					<Recent />
				</ShouldDisplay>
				<ShouldDisplay name="WidgetLeftStore">
					<Store
						on:teamClicked={() => {
							$marginLeftSpring = 1 - $marginLeftSpring;
						}}
					/>
				</ShouldDisplay>
			</div>
		</div>
		<div class="flex justify-center items-center">
			<Toggle bind:open={isOpen} r={90 - $tween * 180} />
		</div>
	</div>
</aside>

<style lang="scss">
	@import "../../style/vars";

	.inner {
	}
	.content {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		flex: 1;

		:global(.accordion-item) {
			padding: 15px 10px;
			outline: none;
			border: none;
		}
		:global(.accordion-item button) {
			box-shadow: none;
		}
		:global(.accordion-button:not(.collapsed)) {
			background-color: transparent;
		}
	}

	aside.left-sidebar {
		// width: 240px;
		min-width: 60px;
		max-width: 240px;
		flex: 0 0 auto;
		background: $white-color;

		.logo-wrapper {
			float: left;
			width: 100%;
			text-align: center;
			padding-top: 30px;
			padding-bottom: 30px;
			transition: all 0.3s;
		}

		&.hide {
			.logo-wrapper {
				padding-left: 12px;
			}

			.inner .content > *:not(.visible) {
				display: none;
			}
		}
	}

	aside.hide :global(.menu-items li a) {
		font-size: 0px;
	}
</style>
