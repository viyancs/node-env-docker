import {
	DocumentSnapshot,
	QueryConstraint,
	Unsubscribe,
} from "firebase/firestore";
import type Model from "./model";

class CollectionGroup<T> {
	constructor(
		path: string,
		converter: (snapshot: DocumentSnapshot) => T,
		firestore?: FirebaseApp
	);

	getDocs(...queryConstraints: QueryConstraint[]): Promise<T[]>;

	watch(
		callback: (objects: T[]) => void,
		...queryConstraints: QueryConstraint[]
	): Unsubscribe;
}

export default class Collection<T> {
	constructor(
		path: string,
		converter: (snapshot: DocumentSnapshot) => T,
		firestore?: FirebaseApp
	);

	query(...queryConstraints: QueryConstraint[]) : this

	getDocs(...queryConstraints: QueryConstraint[]): Promise<T[]>;

	getDoc(id: string, firestore?: Firestore): Promise<T>;

	watch(
		callback: (objects: T[]) => void,
		...queryConstraints: QueryConstraint[]
	): Unsubscribe;

	doc(documentPath?: string): DocumentReference<T>;

	/**
	 * Add a new document to this collection with the specified data, assigning
	 * it a document ID automatically.
	 *
	 * @param data An Object containing the data for the new document.
	 * @return A Promise resolved with a `DocumentReference` pointing to the
	 * newly created document after it has been written to the backend.
	 */
	add(data: T): Promise<DocumentReference<T>>;

	/**
	 * Returns true if this `CollectionReference` is equal to the provided one.
	 *
	 * @param other The `CollectionReference` to compare against.
	 * @return true if this `CollectionReference` is equal to the provided one.
	 */
	isEqual(other: CollectionReference<T>): boolean;

	/**
	 * Applies a custom data converter to this CollectionReference, allowing you
	 * to use your own custom model objects with Firestore. When you call add()
	 * on the returned CollectionReference instance, the provided converter will
	 * convert between Firestore data and your custom type U.
	 *
	 * Passing in `null` as the converter parameter removes the current
	 * converter.
	 *
	 * @param converter Converts objects to and from Firestore. Passing in
	 * `null` removes the current converter.
	 * @return A CollectionReference<U> that uses the provided converter.
	 */
	withConverter(converter: null): CollectionReference<DocumentData>;
	/**
	 * Applies a custom data converter to this CollectionReference, allowing you
	 * to use your own custom model objects with Firestore. When you call add()
	 * on the returned CollectionReference instance, the provided converter will
	 * convert between Firestore data and your custom type U.
	 *
	 * Passing in `null` as the converter parameter removes the current
	 * converter.
	 *
	 * @param converter Converts objects to and from Firestore. Passing in
	 * `null` removes the current converter.
	 * @return A CollectionReference<U> that uses the provided converter.
	 */
	withConverter<U>(
		converter: FirestoreDataConverter<U>
	): CollectionReference<U>;
}

export class Cache<T extends Model> {
	constructor();

	get(id: string): T;
	set(model: T);
	clear();
}
