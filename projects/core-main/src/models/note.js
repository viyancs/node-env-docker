import Model from "./model";
import { getFirestore, collection, doc } from "firebase/firestore";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import Ref from "./Ref";
import User from "./user";

const Props = {
    body: "body",
    authorId: "authorId",
    name: "name",
    image: "image"
}

export default class Note extends Model {
    constructor(
        taskId,
        props,
        ref = null,
    ) {
        super({ ...{ body: "", authorId: null, name: "", image: "", createdAt: +new Date() }, ...props }, ref, `tasks/${taskId}/notes`);

        this.author = this.props.authorId ? new Ref(doc(this.firestore, 'users', this.props.authorId), User.fromFirestore) : null
    }

    get body() {
        return this.props[Props.body]
    }
    set body(val) {
        this.props[Props.body] = val
    }
    setBody(val) {
        this.body = val
        return this
    }

    get name() {
        return this.props[Props.name]
    }
    set name(val) {
        this.props[Props.name] = val
    }
    setName(val) {
        this.name = val
    }

    get authorId() {
        return this.props[Props.authorId]
    }
    set authorId(val) {
        this.props[Props.authorId] = val
        this.author = new Ref(doc(this.firestore, 'users', this.props.authorId), User.fromFirestore)
    }
    setAuthorId(val) {
        this.authorId = val
        return this
    }

    get image() {
        return this.props[Props.image]
    }

    /**
    * @param {File} file 
    * @param {*} storage 
    * @description Attach a file for the current message
    */
    setImage(file, storage = getStorage()) {
        const ext = file.name.slice(file.name.lastIndexOf('.'), file.name.length)
        const fileRef = ref(storage, `tasks/${this.ref.parent.parent.id}/notes/${this.id}${ext}`)
        const uploadTask = uploadBytesResumable(fileRef, file)

        // @ts-ignore

        const promise = uploadTask.then(async res => {
            this.props.image = await getDownloadURL(res.ref)
            return res
        })

        // @ts-ignore
        promise.observe = (callback) => uploadTask.on('state_changed', callback)
        // @ts-ignore
        promise.remove = () => this.deleteImage(fileRef)

        return promise
    }

    deleteImage(storage = getStorage()) {
        const storageRef = ref(storage, this.image)
        return deleteObject(storageRef).then(() => {
            this.props.image = null
        })
    }


    static fromFirestore(snapshot) {
        return new Note(snapshot.ref.parent.parent.id, { ...snapshot.data() }, snapshot.ref);
    }

    static getCollection(taskId, firestoreInstance = getFirestore()) {
        return collection(firestoreInstance, `tasks/${taskId}/notes`)
    }

}
