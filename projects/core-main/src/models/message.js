import Model from "./model";
import { getFirestore, collection, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import Ref from "./Ref";
import User from "./user";
import { Cache } from "./Collection";

const entity = "messages"

/**
 * @type {Cache<Message>}
 */
export const MessagesPool = new Cache()

export default class Message extends Model {
    constructor(
        roomId,
        props = {},
        ref = null,
    ) {
        super(Object.assign({ body: "", userId: undefined, seen: false, attachements: {}, timestamp: +new Date() }, props), ref, `rooms/${roomId}/messages`);
        this.user = new Ref(doc(this.firestore, "users", this.props.userId), User.fromFirestore)
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

    get userId() {
        return this.props.userId
    }

    get timestamp() {
        return this.props.timestamp
    }

    get attachements() {
        return this.props.attachements
    }

    /**
     * 
     * @param {File} file 
     * @param {*} storage 
     * @description Attach a file for the current message
     */
    uploadFile(file, storage = getStorage()) {
        const fileRef = ref(storage, `rooms/${this.ref.parent.parent.id}/${this.id}/${file.name}`)
        const uploadTask = uploadBytesResumable(fileRef, file)

        // @ts-ignore

        const promise = uploadTask.then(async res => {
            this.props.attachements[res.ref.fullPath] = {
                name: res.ref.name,
                downloadURL: await getDownloadURL(res.ref)
            }
            return res
        })

        // @ts-ignore
        promise.observe = (callback) => uploadTask.on('state_changed', callback)
        // @ts-ignore
        promise.remove = () => this.deleteFile(fileRef)

        return promise
    }

    deleteFile(ref) {
        return deleteObject(ref).then(() => {
            delete this.props.attachements[ref.fullPath]
        })
    }

    static getCollection(roomId, firestore = getFirestore()) {
        return collection(firestore, 'rooms', roomId, 'messages')
    }

    static fromFirestore(snapshot) {
        return new Message(snapshot.ref.parent.parent.id, snapshot.data(), snapshot.ref);
    }

    static newDraft(roomId, props = {}) {
        return new Message(roomId, { timestamp: Date.now(), ...props },)
    }
}
