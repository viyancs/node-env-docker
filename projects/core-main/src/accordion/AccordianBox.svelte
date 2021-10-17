<script>
</script>

<div class="acordian-body left-sidebar-accordian box-accordian">
	<div class="box-accordian-listing">
		<slot><!-- optional fallback --></slot>
	</div>
</div>

<style lang="scss">
	@import '../style/vars';

	.box-accordian-listing {
		filter: drop-shadow(0px 11px 14px rgba(0, 0, 0, 0.07));
		margin-top: 20px;
		// max-height: 150px;
		overflow-x: auto;
		padding: 0 10px;
	}
</style>
