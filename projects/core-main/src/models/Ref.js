import { getDoc, onSnapshot } from 'firebase/firestore'

export default class Ref {

    constructor(ref, converter) {
        this.ref = ref

        if (converter) {
            this.converter = converter
        } else {
            this.converter = (snapshot) => snapshot.data()
        }
    }

    get() {
        if (!this.ref) console.warn('reference is null or undefined')
        if (!this.converter) console.warn('Ref converter is null or undefined')

        if (this.ref) {
            return getDoc(this.ref).then(this.converter)
        }

        return undefined
    }

    watch(callback) {
        if (!this.converter) console.warn('Ref converter is null or undefined')

        return onSnapshot(this.ref, snapshot => callback?.(this.converter(snapshot)))
    }
}
