<script>
	import { Collapse } from 'sveltestrap';

	export let title = '';
	export let style = '';
	export let isOpen = true;
</script>

<div class="custom-accordian" {style}>
	<button class="accordian-btn" type="button" on:click={() => (isOpen = !isOpen)} on:click>
		<img src="/static/images/chevron-up.svg" alt="icon" />
		{title}
	</button>
	<Collapse {isOpen}>
		<slot />
	</Collapse>
</div>

<style lang="scss">
	@import '../style/vars';

	.accordian-btn {
		background: transparent;
		border: none;
		color: $text-grey-color;
		font-size: 1rem;
		outline: none;
		cursor: pointer;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		white-space: nowrap;

		img {
			margin-right: 10px;
			transition: 50;
			transform: rotate(180deg);
		}

		&.collapsed img {
			transform: rotate(0deg);
			transition: 50;
		}
	}

	.custom-accordian {
		padding: 15px 10px;
	}

	.custom-accordian :global(.box-accordian-listing) {
		filter: drop-shadow(0px 11px 14px rgba(0, 0, 0, 0.07));
		margin-top: 20px;
		// max-height: 150px;
		overflow-x: auto;
		padding: 0 10px;
	}
	.custom-accordian :global(.box-accordian-item) {
		display: flex;
		background: #fcfcfc;
		padding: 8px 10px;
		min-width: 144px;
	}
	.custom-accordian :global(.box-accordian-item .item-icon) {
		width: 20%;
		text-align: right;
	}
	.custom-accordian :global(.box-accordian-item .accordian-item-icon) {
		width: 18px;
		height: 18px;
		padding-left: 4px;
	}
	.custom-accordian :global(.box-accordian-item .item) {
		flex: 1;
		font-family: 'proxima-nova';
		font-size: 0.875rem;
		text-overflow: ellipsis;
		line-height: 1.2em;
		max-height: 2.4em;
		word-break: break-word;
		overflow: hidden;
	}
	.custom-accordian :global(.box-accordian-item .item img) {
		margin-right: 10px;
	}
	.custom-accordian :global(.box-accordian-item:nth-child(1)) {
		border-radius: 8px 8px 0px 0px;
	}
	.custom-accordian :global(.box-accordian-item:last-child) {
		border-radius: 0px 0px 8px 8px;
	}
</style>
