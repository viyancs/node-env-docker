import {
	getDoc,
	collection,
	DocumentSnapshot,
	DocumentReference,
	Unsubscribe,
	DocumentData,
} from "firebase/firestore";

export default class Ref<T> {
	ref: DocumentReference;
	converter: (snapshot: DocumentSnapshot) => T;

	constructor(
		ref: DocumentReference,
		converter: (snapshot: DocumentSnapshot) => T
	);

	get(): Promise<T>;

	watch(callback: (obj: T) => void): Unsubscribe;
}
