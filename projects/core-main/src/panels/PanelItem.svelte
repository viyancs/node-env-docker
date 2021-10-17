<script>
	let _class = '';
	export { _class as class };
</script>

<div class="panel-item flex justify-between mb-2 border-b-2 border-gray-100">
	<div class="panel-content {_class} flex justify-start align-start content-around w-full">
		<slot />
	</div>

	<slot name="button" />
</div>

<style>
	.panel-item :global(.panel-content.task) {
		display: grid !important;
		grid-template-columns: 0.5fr 4fr 2fr 0.5fr;
		justify-items: start;
		align-items: center;
		height: 50px;
	}
</style>
