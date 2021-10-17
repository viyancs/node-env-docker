<script>
	import { getContext, setContext } from 'svelte';
	import { writable } from 'svelte/store';

	import { Bottom, TopNavbar, IndexApp } from '@specta-app/core';
	import { goto } from '$app/navigation';

	const sides = getContext('sides');

	let marginLeft = 0;

	const calendarEvent = writable(undefined);

	setContext('index', calendarEvent);

	const rightValue = getContext('index:right-value');

	$: if ($sides.bottom) {
		$sides.left = false;
		$sides.right = false;
	}
</script>

<div
	class="scrollable-content-wrapper pr-4 mt-20 overflow-y-auto h-screen"
	style="margin-left: -{marginLeft * 54}vw;"
>
	<IndexApp />
</div>

<Bottom bind:isCalendarModalOpen={$sides.bottom} right={$rightValue * 225} />
