<script>
	import { CustomAccordion } from "../../accordion";
	import Events from "../../Events.svelte";
	import ArtistEvents from "../../ArtistEvents.svelte";
	import { Icon, TabContent, TabPane } from "sveltestrap";
</script>

<CustomAccordion id="updates" title="Updates">
	<TabContent>
		<Events />
		<ArtistEvents />
	</TabContent>
</CustomAccordion>
