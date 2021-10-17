<script>
	import { Menu, MenuItem } from "../components";

	let _class;
	export { _class as class };
</script>

<Menu class={_class}>
	<MenuItem img="/static/images/dashboard-icon.svg" key="dash"
		>Dashboard</MenuItem
	>
	<MenuItem img="/static/images/mail-icon.svg" key="mail">Mail</MenuItem>
	<MenuItem img="/static/images/calendar-icon.svg" key="calendar"
		>Calendar</MenuItem
	>
	<MenuItem img="/static/images/speaker-icon.svg" key="artists"
		>Artists</MenuItem
	>
	<MenuItem img="/static/images/team-icon.svg" key="team">Team</MenuItem>
	<MenuItem img="/static/images/contacts-icon.svg" key="contacts"
		>Contacts</MenuItem
	>
</Menu>

<style>
</style>
