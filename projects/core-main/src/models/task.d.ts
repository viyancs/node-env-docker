import {
	doc,
	getFirestore,
	Timestamp,
	serverTimestamp,
	DocumentSnapshot,
	DocumentReference,
} from "firebase/firestore";
import User from "./user";
import Collection from "./Collection";
import Model from "./model";
import Ref from "./Ref";
import type Note, { NoteProps } from "./note";

type TaskProps = {
	title: string;
	complete?: boolean;
	isTeam?: boolean;
	assigneesIds?: string[];
	dueDate?: Date;
};

export default class Task extends Model<TaskProps> {
	title: string;
	complete: bbolean;
	isTeam: boolean;
	assigneesIds: readonly string[];
	dueDate: Date;

	assignees: readonly Collection<Assignee>;
	notes: readonly Collection<Notes>;
	createdAt: readonly Date;
	modifiedAt: readonly Date;

	constructor(props: TaskProps, ref?: DocumentReference);

	newNote(
		authorId: string,
		props?: Omit<NoteProps, "authorId">
	): Note;
}

type AssigneeProps = {
	firstName: string;
	lastName: string;
};

class Assignee extends Model<AssigneeProps> {
	name: string;
	user: readonly Ref<User>;

	constructor(
		taskId: string,
		userId: string,
		props: AssigneeProps,
		ref?: DocumentReference
	);

	static fromUser(taskId: string, user: User): this;

	static fromFirestore(snapshot: DocumentSnapshot): this;
}
