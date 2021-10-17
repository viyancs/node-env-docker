<script>
	import { Calendar } from "@fullcalendar/core";
	import ICAL from 'ical'
	import timeGridPlugin from "@fullcalendar/timegrid";
	//import * as iCalendarPlugin from '@fullcalendar/icalendar'
	//import iCalendarPlugin from '@fullcalendar/icalendar'
	import listPlugin from "@fullcalendar/list";
	import dayGridPlugin from "@fullcalendar/daygrid";
	import {writable} from 'svelte/store'
	import {onMount} from 'svelte'
	import { goto } from '$app/navigation';
	import {store} from '../auth/fireStore'
	import { getFunctions, httpsCallable } from "firebase/functions";
	export let hide = writable("")

	/* reverse proxy to retrive iCal */
	const functions = getFunctions();
	const proxyLink = httpsCallable(functions, 'proxyLink');


	const profile = store.profile;
	/*global calendar value */
	let calendar
	/*ref to calendar DOM element */
	let calendarEl



	onMount(async () => {

		calendar = new Calendar(calendarEl, {
			plugins: [dayGridPlugin,timeGridPlugin, listPlugin ],
			initialView: "dayGridMonth",
			//initialView: 'timeGridWeek',
			headerToolbar: {
				left: "prev,next today",
				center: "title",
				right: "dayGridMonth,timeGridWeek,listDay settings",
			},
			aspectRatio: 2.25,
			height: 700,
			// width: "100%",
			// weekends: false,
			handleWindowResize: true,
			// minTime: "07:30:00",
			// maxTime: "22:00:00",
			// updateSize: true,
			duration: { days: 5 },
			slotEventOverlap: true,
			nowIndicator: true,
			displayEventTime: false,
			displayEventEnd: false,
			titleFormat: { year: "numeric", month: "long" },
			dayHeaders: false,
			themeSystem: "minty",
			customButtons: {
				settings: {
					text: "Settings",

					click: function () {
						goto("/app/profile#ical")
						return;
					},
				},
			},
			// dayCellContent: { html: `${dayCellContent.dayNumberText}` },
			buttonText: {
				month: "Month",
				week: "Week",
				day: "Day",
				today: "Today",
			},
		});
		/* retrieve all ics files async*/
		let userIcs = $profile.settings.ics;
		if (userIcs) {
			let promises = $profile.settings.ics.map((link) => proxyLink({link}))
			/* see if data resolved or failed, if failed filter entry */
			let ics =  (await Promise.allSettled(promises)).map((resp) => {
				if (resp.status != "fulfilled") {
					console.error("unfullfiled ICS get request")
					return undefined
				}
				return resp.value.data
			}).filter((item) => item != undefined)
			/* convert raw ICS data to objects*/
			const eventsc = ics.map((item) => load_ics(item)).flat()
			calendar.removeAllEventSources();
			calendar.addEventSource(eventsc);
		}
		calendar.render()


		const unsubscribeHide = hide.subscribe((v) => {
			/* we subscribe wether the calendar is hidden or not */
			/* if it becomes unhidden we check if the view is dayGridMOnth*/
			/* DayGridMonth has an issue with displaying as initialView */
			/* if view is DayGridMonth we change to it again and render again*/
			if (v == "") {
				setTimeout(() => {
					if (calendar?.view?.type == 'dayGridMonth') {
						calendar.changeView("dayGridMonth")
						calendar.render()
					}
				}, 800)
			}
		})

		return () => {
			unsubscribeHide?.()
		}

	})
	/* function to convert ICS raw data
	into javascript object to be fed to fullCalendar */
	function load_ics(ics_data) {

		const mapping = {
			dtstart: "start",
			dtend: "end",
			summary: "title",
		};
		const parsed = ICAL.parseICS(ics_data);
		console.log(parsed)
		const ev = Object.values(parsed).map((obj) => {
			return Object.entries(obj).reduce((acc, [original_key, value]) => {
				const key = original_key in mapping ? mapping[original_key] : original_key;
				acc[key] = value
				return acc
			}, {})
		})
		return ev
	}

</script>

<div bind:this={calendarEl} class="calendar-wrapper"  />
