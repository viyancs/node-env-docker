<div class="box-accordian-item">
	<slot />
</div>

<style lang="scss">
	@import '../style/vars';

	.box-accordian-item {
		display: flex;
		background: #fcfcfc;
		padding: 8px 10px;

		:global(.item-icon) {
			width: 20%;
			text-align: right;
		}

		:global(.accordian-item-icon) {
			width: 18px;
			height: 18px;
			padding-left: 4px;
		}

		:global(.item) {
			width: 80%;
			display: flex;
			align-items: center;
			font-family: "proxima-nova";
			font-size: 0.875rem;
		}

		:global(.item img) {
			margin-right: 10px;
		}

		&:nth-child(1) {
			border-radius: 8px 8px 0px 0px;
		}

		&:last-child {
			border-radius: 0px 0px 8px 8px;
		}
	}
</style>
