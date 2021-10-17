import sq3 from 'sqlite3';
import { formatDistance, parseISO, subMilliseconds, subMinutes } from 'date-fns';

const DB_NAME = 'specta.db';

export const ACTIVE_USER_ID = 1;
export const CHAT_USER = 2;

/**
 * @type {sq3.Database}
 */
export let db;

const DB = function (path = '', callback = () => {}) {
	const sq = new sq3.Database(path, callback);
	let allUsers;
	let allArtists;

	if (!db) {
		db = async function () {
			allUsers = await db.getUsers();
			allArtists = await db.getArtists();

			return db;
		};

		db.close = (callback = () => {}) => {
			sq.close(callack);
		};

		db.all = (statement = '', variables = {}) => {
			return new Promise((resolve, reject) => {
				sq.serialize(() => {
					sq.all(statement, variables, (err, rows) => {
						if (err) {
							reject(err);
						} else {
							resolve(rows);
						}
					});
				});
			});
		};

		db.users = () => allUsers;

		db.artists = () => allArtists;

		db.getUser = (id) => {
			return new Promise((resolve, reject) => {
				sq.serialize(() => {
					sq.all(`SELECT * FROM users WHERE id = ${id}`, (err, rows) => {
						if (err) {
							reject(err);
						} else {
							resolve(rows[0]);
						}
					});
				});
			});
		};

		db.getUsers = () => {
			return new Promise((resolve, reject) => {
				sq.serialize(() => {
					sq.all('SELECT * FROM users', (err, rows) => {
						if (err) {
							reject(err);
						} else {
							resolve(rows);
						}
					});
				});
			});
		};

		db.getArtists = () => {
			return new Promise((resolve, reject) => {
				sq.serialize(() => {
					sq.all('SELECT * FROM `artists`', (err, rows) => {
						if (err) {
							reject(err);
						} else {
							resolve(rows);
						}
					});
				});
			});
		};

		db.getTeam = () => {
			return new Promise((resolve, reject) => {
				sq.serialize(() => {
					sq.all('SELECT * FROM `artists`', (err, rows) => {
						if (err) {
							reject(err);
						} else {
							resolve(rows);
						}
					});
				});
			});
		};

		db.getMail = () => {
			function formatMail(mail) {
				const isUser = mail.sender.length < 3;
				mail['is_user'] = isUser;

				if (isUser) {
					mail['timeago'] = formatDistance(subMilliseconds(mail.timestamp, 3), new Date(), {
						addSuffix: true
					});
				}
				return mail;
			}

			return new Promise((resolve, reject) => {
				sq.serialize(() => {
					sq.all(
						`SELECT 
						m.id as id, m.subject as subject, m.body as body, m.timestamp as timestamp, 
						rec.id as rec_id, rec.first as rec_first, rec.last as rec_last, rec.role as rec_role, rec.avatar as rec_avatar,
						m.sender as sen_id,sen.first as sen_first, sen.last as sen_last, sen.role as sen_role, sen.avatar as sen_avatar 
						FROM 
						mail m LEFT OUTER JOIN users rec ON m.recipient = rec.id LEFT JOIN users sen ON m.sender = sen.id
						ORDER BY timestamp DESC`,
						(err, rows) => {
							if (err) {
								reject(err);
							} else {
								resolve(
									rows.map(
										({
											id,
											subject,
											body,
											timestamp,
											sen_id,
											sen_first,
											sen_last,
											sen_role,
											sen_avatar,
											rec_id,
											rec_first,
											rec_last,
											rec_role,
											rec_avatar
										}) => {
											const t = parseISO(timestamp);
											return {
												id,
												subject,
												body,
												timestamp: t,
												timeago: formatDistance(subMilliseconds(t, 3000), new Date(), {
													addSuffix: true
												}),
												isUser: isNaN(+sen_first),
												sender: {
													id: sen_id,
													first: sen_first,
													last: sen_last,
													role: sen_role,
													avatar: sen_avatar
												},
												recipient: {
													id: rec_id,
													first: rec_first,
													last: rec_last,
													role: rec_role,
													avatar: rec_avatar
												}
											};
										}
									)
								);
							}
						}
					);
				});
			});
		};

		db.getEvents = () => {
			return new Promise((resolve, reject) => {
				sq.serialize(() => {
					sq.all('SELECT * FROM `events` ORDER BY timestamp', (err, rows) => {
						if (err) {
							reject(err);
						} else {
							resolve(rows);
						}
					});
				});
			});
		};

		db.getArtistsEvents = () => {
			return new Promise((resolve, reject) => {
				sq.serialize(() => {
					sq.all(
						`SELECT artist_events.id as id, datetime, venue, location, name|| ' @ ' ||venue as title , timestamp, artist_id, name as artist_name FROM artist_events, artists WHERE artist_events.artist_id = artists.id`,
						(err, rows) => {
							if (err) {
								reject(err);
							} else {
								rows.map((event) => {
									event.artist = {
										id: event.artist_id,
										name: event.artist_name
									};
									return event;
								});
								resolve(rows);
							}
						}
					);
				});
			});
		};

		db.getChatByUser = (sender, recipient) => {
			return new Promise((resolve, reject) => {
				sq.serialize(() => {
					sq.all(
						`SELECT * FROM chat WHERE
					(recipient = ${recipient} AND sender = ${sender}) OR
					(recipient = ${sender} AND sender = ${recipient})
					ORDER BY timestamp DESC LIMIT 100`,
						(err, rows) => {
							if (err) {
								reject(err);
							} else {
								resolve(rows.reverse());
							}
						}
					);
				});
			});
		};

		db.getTasks = () => {
			return new Promise((resolve, reject) => {
				sq.serialize(() => {
					sq.all('SELECT * FROM `tasks` ORDER BY due', (err, rows) => {
						if (err) {
							reject(err);
						} else {
							resolve(rows);
						}
					});
				});
			});
		};

		db.getTasksUsers = () => {
			return new Promise((resolve, reject) => {
				sq.serialize(() => {
					sq.all('SELECT * FROM `tasks_users`', (err, rows) => {
						if (err) {
							reject(err);
						} else {
							resolve(rows);
						}
					});
				});
			});
		};

		// Get each task along with the clients related to it
		db.getTasksAndUsers = () => {
			return new Promise((resolve, reject) => {
				sq.serialize(() => {
					sq.all(
						'SELECT * FROM tasks, tasks_users, users WHERE tasks.id = tasks_users.task_id AND tasks_users.user_id = users.id',
						(err, rows) => {
							if (err) {
								reject(err);
							} else {
								const _ = rows.reduce(
									(
										acc,
										{
											task_id,
											title,
											due,
											dt_str,
											complete,
											is_team,
											user_id,
											first,
											last,
											role,
											avatar
										}
									) => {
										if (acc[task_id]) {
											acc[task_id].users.push({
												id: user_id,
												first,
												last,
												role,
												avatar
											});
										} else {
											acc[task_id] = {
												id: task_id,
												title,
												due,
												dt_str,
												complete,
												is_team,
												users: [
													{
														id: user_id,
														first,
														last,
														role,
														avatar
													}
												]
											};
										}

										return acc;
									},
									{}
								);
								resolve(Object.values(_));
							}
						}
					);
				});
			});
		};

		db.getTaskTypes = async () => {
			const tasksAndUsers = await db.getTasksAndUsers();

			const [daily, team] = tasksAndUsers.reduce(
				(acc, task) => {
					const [dailyTasks, teamTasks] = acc;
					if (!task.is_team) {
						dailyTasks.push(task);
					} else {
						teamTasks.push(task);
					}

					return acc;
				},
				[[], []]
			);

			return { daily, team };
		};
	}

	return db;
};

export default DB;
