import { where, query, collection, getFirestore, orderBy, limit, limitToLast } from 'firebase/firestore'
export class Query {
    constructor(path, converter, firestore = getFirestore()) {
        this.ref = collection(firestore, path);
        this.query = query(this.ref)
        this.converter = converter;
    }

    where(
        fieldPath,
        opStr,
        value
    ) {
        this.query = query(this.query, where(fieldPath, opStr, value))
        return this
    }

    orderBy(
        fieldPath,
        directionStr
    ) {
        this.query = query(this.query, orderBy(fieldPath, directionStr))
        return this
    }

    limit(number) {
        this.query = query(this.query, limit(number))
        return this
    }

    limitToLast(limit) {
        this.query = query(this.query, limitToLast(limit))
        return this
    }

    startAt(...args) {

    }

    startAfter(...args) {

    }

    endBefore(...args) {

    }


    endAt(...args) {

    }

    isEqual(other) {

        return true
    }

    get(options) {

    };

    onSnapshot(...args) {

    };

    withConverter(converter) {

    }

}