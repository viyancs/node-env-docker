import Model from "./model";
import { getFirestore, collection } from "firebase/firestore";
const entity = "notifications"

export default class Notification extends Model {
    constructor(
        userId,
        props,
        ref = null,
    ) {
        super(props, ref, `users/${userId}/notifications`);
        this.props = { ...{ body: "", seen: false, createdAt: +new Date() }, ...props }
    }

    get body() {
        return this.props.body
    }
    set body(val) {
        this.props.body = val
    }

    get seen() {
        return this.props.seen
    }
    set seen(val) {
        this.props.seen = val
    }

    get createdAt() {
        return this.props.createdAt
    }

    get userId() {
        return this.ref?.parent?.parent?.id
    }

    static fromFirestore(snapshot) {
        return new Notification(snapshot.ref.parent.parent.id, { ...snapshot.data() }, snapshot.ref);
    }

    static newDraft(userId, props = {}, firestore = getFirestore()) {
        return new Notification(userId, props ?? {})
    }

    static getCollection(firestoreInstance, ...pathSegments) {
        return collection(firestoreInstance ?? getFirestore(), entity, ...pathSegments)
    }

}
