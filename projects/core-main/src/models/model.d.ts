import {
	DocumentData,
	DocumentSnapshot,
	DocumentReference,
	SetOptions,
	CollectionReference,
	Firestore,
} from "firebase/firestore";

type KeysOf<T> = {
	[k in keyof T]: T[k] extends any ? k : never;
}[keyof T];

export default class Model<T = Record<string, any>> {
	readonly firestore: Firestore;
	ref: DocumentReference<DocumentData>;
	draft: boolean;
	protected props: T;
	protected changedProps: Set<KeysOf<T>>;

	constructor(
		props: T,
		ref?: DocumentReference<DocumentData> = null,
		path?: string
	);

	get id(): string;

	/**
	 * @description Discard changes made before save
	 */
	discard(): this;

	toJson(): T;

	getCollection(): CollectionReference;

	setFirestore(firestore: Firestore): this;

	save(options?: SetOptions): Promise<void>;

	static abstract fromFirestore(snapshot: DocumentSnapshot<DocumentData>);
}
