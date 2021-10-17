import Model from "./model";
import Message from "./message";
import {
	getFirestore,
	doc,
	collection,
	onSnapshot,
	where,
	documentId
} from "firebase/firestore";
import User from "./user";
import { writable } from 'svelte/store'
import Ref from "./Ref";
import Collection from './Collection'

const entity = "rooms";

export default class Room extends Model {
	constructor(
		props,
		ref = null,
	) {
		super(props, ref, "rooms");
		this.props = props
		this.lastMessage = new Ref(props.lastMessageRef, Message.fromFirestore);
		this.messages = new Collection(`rooms/${this.id}/messages`, Message.fromFirestore)
		this.members = new Collection(`rooms/${this.id}/members`, Member.fromFirestore)
		this.store = writable(this.props);
	}

	get name() {
		return this.props.name
	}

	get orgId() {
		return this.props.orgId
	}
	get modifiedAt() {
		return this.props.modifiedAt
	}
	setUsers(users) {
		this.users = users
	}

	newMessage(senderId, body = "", firestore = getFirestore()) {
		return Message.newDraft(this.id, { body, userId: senderId })
	}

	send(message) {
		message.props.timestamp = Date.now()
		return (
			message
				// write document to firestore
				.save()
				.then(async () => {
					this.props.modifiedAt = +new Date();
					this.props.lastMessageRef = message.ref
					this.save({ merge: true })
					await this.notify(message.userId)

					return message;
				})
		);
	}

	async notify(senderId, firestore = getFirestore()) {

	}

	watch(callback) {
		return onSnapshot(this.ref, (snapshot) => {
			const data = snapshot.data()
			this.props = { ...this.props, ...data }
			this.lastMessage.ref = this.props.lastMessageRef
			this.store.set(this.props)
			callback?.(this)
		});
	}

	onTyping(currentUser, callback) {
		return this.members.watch(callback, where('typing', '==', true), where(documentId(), '!=', currentUser.id))
	}

	targets(currentUser) {
		return this.members.getDocs(where(documentId(), '!=', currentUser.id))
	}

	currentMember(id) {
		return this.members.getDoc(id)
	}

	getCollection() {
		return this.ref.parent
	}

	static fromFirestore(snapshot) {
		// @ts-ignore
		return new Room({ ...snapshot.data() }, snapshot.ref);
	}

	static getCollection(firestoreInstance, ...pathSegments) {
		return collection(
			firestoreInstance ?? getFirestore(),
			entity,
			...pathSegments
		);
	}

	static newDraft(props) {
		return new Room(props, null)
	}
}


export class Member extends Model {

	constructor(roomId, props, ref) {
		super(props, ref, `rooms/${roomId}/members`)
		this.props = props
		// this.user = new Ref(props.userRef, User.fromFirestore)
		this.user = new Ref(doc(this.firestore, 'users', this.id), User.fromFirestore)
		this.store = writable(this.props)
	}

	get nickName() {
		return this.props.nickName
	}
	set nickName(val) {
		this.props.nickName = val
	}

	get notifiable() {
		return this.props.notifiable
	}
	set notifiable(val) {
		this.props.notifiable = val
		this.store.update(status => {
			status.notifiable = val
			return status
		})
	}

	get typing() {
		return this.props.typing
	}
	set typing(val) {
		this.props.typing = val
		this.store.update(status => {
			status.typing = val
			return status
		})
	}

	watch(callback) {
		return onSnapshot(this.ref, snapshot => {
			this.props = { ...this.props, ...snapshot.data() }

			callback?.(this)
		})
	}



	subscribe(run, invalidate) {
		return this.store.subscribe(run, invalidate)
	}
	update(updater) {
		return this.store.update(updater)
	}

	static fromFirestore(snapshot) {
		// @ts-ignore
		return new Member(snapshot.ref.parent.parent.id, { ...snapshot.data() }, snapshot.ref);
	}
}
