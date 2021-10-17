import Model from "./model";
import {
	getFirestore,
	collection,
	DocumentReference,
	CollectionReference,
	DocumentSnapshot,
} from "firebase/firestore";

const entity = "notifications";

type NotificationProps = {
	body?: string;
	seen?: boolean;
	createdAt?: number;
};

export default class Notification extends Model<NotificationProps> {
    body: string
    seen: boolean
    createdAt: readonly number
	userId: readonly string;

	constructor(
		userId,
		props: NotificationProps,
		ref?: DocumentReference,
	);

	async save(): Promise<void>;

	static fromFirestore(snapshot: DocumentSnapshot): Notification;

	static newDraft(
		userId: string,
		props?: NotificationProps,
		firestore?: Firestore
	): Notification;

	static getCollection(firestoreInstance, ...pathSegments): CollectionReference;
}
