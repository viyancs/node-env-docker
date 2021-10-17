import {
    doc,
    collection,
    query,
    getFirestore,
    getDocs,
    getDoc,
    onSnapshot,
} from "firebase/firestore";

export default class Collection {
    constructor(path, converter, firestore = getFirestore()) {
        this.ref = collection(firestore, path);
        this.q = query(this.ref)
        this.converter = converter;
    }

    query(...queryConstraints) {
        this.q = query(this.q, ...queryConstraints)
        return this
    }

    getDocs(...queryConstraints) {
        return getDocs(query(this.q, ...queryConstraints)).then(snapshot => snapshot.docs.map(this.converter));
    }

    getDoc(id, firestore = getFirestore()) {
        return getDoc(doc(firestore, `${this.ref.path}/${id}`)).then(this.converter)
    }

    watch(callback, ...queryConstraints) {
        return onSnapshot(query(this.q, ...queryConstraints), (snapshot) => {
            callback?.(snapshot.docs.map(this.converter))
        });
    }

    doc(documentPath) {

    }

    add(data) {

    }

    isEqual(other) {

    }

    withConverter(converter) {

    }
}

export class Cache {

    constructor() {
        this.pool = new Map()
    }

    get(id) {
        return this.pool.get(id)
    }
    set(model) {
        this.pool.set(model.id, model)
    }

    clear() {
        this.pool.clear()
    }
}
