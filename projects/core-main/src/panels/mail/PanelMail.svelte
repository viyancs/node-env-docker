<script>
	import { MailItem } from "../../components";
	import { get } from "../../Context.svelte";
	import PanelBase from "../PanelBase.svelte";
	import PanelInner from "../PanelInner.svelte";
	import {ShouldDisplay}  from "../../components";
	
	export let inFocus
	export let getFocusElement
	export let movePointerDown
	let componentName = "PanelMail"
	const context = get();

	$: mails = $context?.mails ?? [];
</script>

<ShouldDisplay name={componentName}>
	<PanelBase
		name="mail"
		title="Mail"
		subtitle={`(${mails.length} unread)`}
		class="mail"
		{getFocusElement}
		{inFocus}
		{componentName}
		{movePointerDown}
	>
			<div slot="action" class="cursor-pointer font-bold">New Message</div>

			<PanelInner>
				{#each mails as mail}
					<MailItem {mail} />
				{/each}
			</PanelInner>
	</PanelBase>
</ShouldDisplay>


<style lang="scss">
</style>
