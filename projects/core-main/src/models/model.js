import {
    setDoc,
    doc,
    getFirestore
} from "firebase/firestore";
import { v4 as uuid } from "uuid";

export default class Model {
    constructor(props = {}, ref = null, path) {
        this.draft = !ref
        this.ref = ref ? ref : doc(getFirestore(), path, uuid())
        this.firestore = this.ref?.firestore
        this.id = this.ref?.id
        this.props = props
        this.default = { ...props }
    }

    discard() {
        Object.assign(this.props, this.default)
        return this
    }

    toJson() {
        return this.props
    }

    getCollection() {
        return this.ref.parent
    }

    setFirestore(firestore = getFirestore()) {
        this.firestore = firestore
        return this
    }

    save() {
        if (!this.ref) {
            throw new Error('Refence is undefined !')
        }

        return setDoc(this.ref, this.props, { merge: true }).then(() => {
            // set default properties up to date
            this.default = { ...this.default, ...this.props }
            this.draft = false
        });
    }
}
