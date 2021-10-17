import { doc, serverTimestamp } from "firebase/firestore";
import { User } from ".";
import Collection from "./Collection";
import Model from "./model";
import Note from "./note";
import Ref from "./Ref";

const Props = {
    title: "title",
    complete: "complete",
    isTeam: "isTeam",
    assigneesIds: "assigneesIds",
    dueDate: "dueDate"
}

export default class Task extends Model {
    constructor(props, ref) {
        super({ complete: false, isTeam: false, assigneesIds: [], dueDate: undefined, ...props }, ref, "tasks");
        this.assignees = new Collection(
            `tasks/${this.id}/assignees`,
            Assignee.fromFirestore
        );

        this.notes = new Collection(`tasks/${this.id}/notes`, Note.fromFirestore)
    }

    get title() {
        return this.props.title;
    }
    set title(val) {
        this.props.title = val;
    }

    get complete() {
        return this.props.complete;
    }
    set complete(val) {
        this.props.complete = val;
    }

    get isTeam() {
        return this.props.isTeam;
    }
    set isTeam(val) {
        this.props.isTeam = val;
    }

    get assigneesIds() {
        return this.props.assigneesIds;
    }

    get dueDate() {
        return this.props.dueDate;
    }
    set dueDate(val) {
        this.props.dueDate = val
    }

    get createdAt() {
        return this.props.createdAt;
    }
    get modifiedAt() {
        return this.props.modifiedAt;
    }

    save(options) {
        this.props.modifiedAt = serverTimestamp()
        return super.save(options)
    }

    newNote(authorId, props = {}) {
        return new Note(this.id, { ...props, authorId })
    }
}

class Assignee extends Model {
    constructor(taskId, userId, props, ref) {
        super(props, ref, `tasks/${taskId}`);
        this.user = new Ref(doc(this.firestore, `users/${userId}`), User.fromFirestore)
    }

    get name() {
        return this.props.name
    }
    set name(val) {
        this.props.name = val
    }

    static fromUser(taskId, user) {
        return new Assignee(taskId, user.id, { firstName: user.firstName, lastName: user.lastName })
    }

    static fromFirestore(snapshot) {
        const data = snapshot.data()
        return new Assignee(snapshot.parent.parent.id, data.userId, snapshot.data(), snapshot.ref);
    }
}
