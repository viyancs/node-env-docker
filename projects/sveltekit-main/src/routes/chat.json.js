import { v4 as uuid } from 'uuid';
import { format, set } from 'date-fns';
import { db, ACTIVE_USER_ID } from '../lib/database';

const dateFormat = 'yyyy-MM-dd HH:mm:ss';
const targetFormat = 'EEE MMMM dd, hh:mm aa';
/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function post({ params, body }) {
	let { message, event } = JSON.parse(body);

	if (event) {
		event = JSON.parse(event);
	}
	if (event && event['validated']) {
		event['eventTitle'] = event['eventTitle'].replace('?', '').trim();
		event['id'] = uuid();
		/**
		 * @type {Date}
		 */
		let startDate = new Date(event['startDate']);
		if (startDate.getHours() === 0 && startDate.getMinutes() === 0) {
			startDate = set(startDate, { hours: 12 });
		}
		/**
		 * @type {Date}
		 */
		let endDate = undefined;

		if (event['endDate']) {
			endDate = new Date(event['endDate']);
			if (endDate.getTime() === Date.now()) {
				endDate = set(endDate, { hours: 12 });
			}
		}

		event['start_fmt'] = format(startDate, targetFormat);
		event['end_fmt'] = endDate ? format(endDate, targetFormat) : undefined;
	}
	// datetime.now().strftime("%Y-%m-%dT%X")
	const sent = format(new Date(), 'yyyy-MM-dd p');
	const data = {
		message: message,
		event: event,
		sent: sent,
		user: await db.getUser(ACTIVE_USER_ID),
		invited: await db.users().slice(5, 10)
	};

	let cleanedTitle;

	if (event) {
		cleanedTitle = cleanEventTitle(event['eventTitle']);
	}
	if (data['event']) {
		data['event']['eventTitle'] = cleanedTitle;
	}

	return {
		body: data
	};
}

/**
 *
 * @param {string} title
 * @returns String
 */
function cleanEventTitle(title = '') {
	const actions = ['schedule', 'have', 'plan', 'go', 'organize', 'arrange', 'want', 'wanna'];
	const firstStrips = ['a', 'to', 'the', 'another', ' our'];
	let cleanedTitle = title?.toLowerCase()?.trim() ?? '';

	for (const action in actions) {
		if (cleanedTitle.includes(action)) {
			cleanedTitle = '' + cleanedTitle.split(action).slice(1);
			cleanedTitle = ' ' + cleanedTitle.split(action)[1].trim().split(' ');
			break;
		}
	}
	console.log(1, cleanedTitle);
	console.log('Checking for ', title[0]);
	cleanedTitle = cleanedTitle.split(' ');

	if (firstStrips.includes(cleanedTitle[0])) {
		cleanedTitle = ' ' + cleanedTitle.slice(1);
	} else {
		cleanedTitle = ' ' + cleanedTitle;
	}
	console.log(cleanedTitle);

	const splits = ['okay', "let's", 'should', 'we', 'set up', 'plan', 'schedule', '?', '.'];

	for (const split in splits) {
		cleanedTitle = cleanedTitle.replace(split, '');
	}

	return cleanedTitle.trim();
}
