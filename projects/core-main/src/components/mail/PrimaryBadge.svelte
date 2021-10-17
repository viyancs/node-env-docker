<script>
	export let subject;
	export let timeago;
</script>

<h3 class="flex space-x-2">
	{subject} <span class="primary-badge rounded-full p-1 ml-2 my-auto">{timeago}</span>
</h3>

<style lang="scss">
	.primary-badge {
		background: #f4ebf5;
		color: #7838a2;
		font-size: 6pt;
		word-break: break-all;
	}
</style>
