import { add, addDays, format, set, sub, subDays } from 'date-fns';

const eventTitles = [
	'Universal Music NL - Release plan overview',
	'LG Brand Deal - Deal Points',
	'Chico',
	'THG x Propeller',
	'TJ x Matt Call',
	'City Nation',
	'Board Meeting - Lunch - Phil, Ky, Cory, TJ',
	'Sony Music A&R Session - Taylor',
	'Republic Records Call',
	'THG x Astèr Connect',
	'TGH x Zen Habitats',
	'Emzotic & Taylor',
	'Specta Call',
	'Gym',
	'Live Nation China x IQIYI - TV Pitch Meeting',
	'Soho House Meeting(s)',
	'THG x Cam',
	'The Next Level show format script',
	'Kona Rose Jackson',
	'American Moves',
	'PR Emails Rosie Single Release',
	'CAA x Pulse Films',
	'Taylor A&R Block'
];

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ params }) {
	console.log(new Date());
	return {
		body: events()
	};
}

function events() {
	const timeFormat = 'yyyy-MM-dd HH:mm:ss';
	const events = [];
	// now = datetime.now().replace(day=1, hour=8, minute=0) - timedelta(days=5)
	let now = sub(set(new Date(), { date: 1, hours: 8, minutes: 0 }), { days: 5 });

	for (let i = 0; i < 80; i++) {
		now = addDays(now, 1);
		if ([6, 0].includes(now.getDay())) {
			continue;
		}
		const eventsToCreate = Math.trunc(Math.random() * 4 + 1);

		let start, end;
		for (let j = 0; j < eventsToCreate; j++) {
			start = set(now, { hours: 8, minutes: 0 });
			const duration = [30, 60, 90, 120][Math.trunc(Math.random() * 3)];
			end = add(start, {
				minutes: duration
			});
			events.push({
				title: eventTitles[Math.trunc(Math.random() * (eventTitles.length - 1))],
				start: format(start, timeFormat),
				end: format(end, timeFormat)
			});
			start = end;
		}
	}

	return events;
}
