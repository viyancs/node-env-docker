<script>
	import { spring } from "svelte/motion";
	import { onMount } from "svelte";
	import Updates from "./Updates.svelte";
	import Team from "./Team.svelte";
	import Toggle from "../left/Toggle.svelte";
	import { ShouldDisplay } from "../../components";

	export let value = 1;
	const tween = spring(value, { stiffness: 0.07, damping: 0.7 });
	export let isOpen = false;

	$: if (isOpen) {
		$tween = 0;
	} else {
		$tween = 1;
	}

	$: value = $tween;

	onMount(() => {
		const rightHandler = (e) => {
			if (e.key === "ArrowRight" && e.shiftKey) {
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
	class="right-sidebar app-sidebar flex flex-col fixed shadow-md h-full bg-white"
	class:hide={!isOpen}
	style="transform:translateX({$tween * 80}%);"
>
	<div class="inner w-full h-full relative flex">
		<div class="flex justify-center items-center">
			<Toggle bind:open={isOpen} r={$tween * 180 + 90} />
		</div>

		<div class="content flex flex-col overflow-hidden h-screen">
			<ShouldDisplay name="WidgetRightUpdates">
				<Updates />
			</ShouldDisplay>
			<ShouldDisplay name="WidgetRightTeam">
				<Team />
			</ShouldDisplay>
		</div>
	</div>
</aside>

<style lang="scss">
	@import "../../style/vars";

	aside {
		z-index: 2500 !important;
	}

	aside.right-sidebar {
		width: 225px;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		min-width: 225px;
		position: relative;
		-webkit-box-flex: 0;
		-ms-flex: 0 0 225px;
		flex: 0 0 225px;
		transition: all 0.05s;
		position: fixed;
		height: 100vh;
		background: #ffffff;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		flex-direction: column;
		right: 0;
		top: 0;
		bottom: 0;

		&.hide {
			.toggle-wrapper {
				box-shadow: none;
			}
			.inner .content {
				display: none;
			}
		}
	}

	.content :global(ul > li > a) {
		color: #d0d0d0;
		font-size: 0.875rem;
		padding: 2px 10px;
		border-top: none !important;
		border-radius: 0 !important;
		border-right: none !important;
		border-left: none !important;
		border-bottom: 2px solid transpaernt !important;
	}
	.content :global(ul > li > a.active) {
		color: $text-grey-color !important;
		border-bottom: 2px solid $primary-color !important;
	}
</style>
