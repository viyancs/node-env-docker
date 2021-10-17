import DB from '$lib/database';
import path from 'path';

const ACTIVE_USER_ID = 1;
const CHAT_USER = 2;

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ params }) {
	const db = await DB(path.resolve('specta.db'), (err) => {
		console.log('Connected successfully to specta db...');
	})();

	// console.log(await db.getTasksAndUsers())

	const recipient = 2;

	const { daily, team } = await db.getTaskTypes();
	return {
		body: {
			users: db.users(),
			artists: db.artists(),
			userId: ACTIVE_USER_ID,
			user: db.users().find((d) => d.id === ACTIVE_USER_ID),
			artistEvents: await db.getArtistsEvents(),
			tasksAndUsers: await db.getTasksAndUsers(),
			events: await db.getEvents(),
			chatMessages: await db.getChatByUser(ACTIVE_USER_ID, recipient),
			chatUser: db.users().find((d) => d.id === CHAT_USER),
			mails: await db.getMail(),
			now: new Date(),
			dailyTasks: daily,
			teamTasks: team
		}
	};
}
