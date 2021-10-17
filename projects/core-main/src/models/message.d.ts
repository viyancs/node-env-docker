import type {
	DocumentData,
	DocumentReference,
	DocumentSnapshot,
	Firestore,
	Unsubscribe,
} from "firebase/firestore";
import type {
	FirebaseStorage,
	StorageReference,
	UploadTask,
	UploadTaskSnapshot,
} from "firebase/storage";
import type { Unsubscribe, Subscribe } from "firebase/util";
import type Model from "./model";
import type Ref from "./Ref";
import type User from "./user";

type MessageProps = {
	body?: string;
	roomId?: string;
	userId?: string;
	attachements?: Attachements;
	timestamp?: Date;
};

type Attachement = {
	name: string;
	downloadURL: string;
};

export default class Message extends Model<MessageProps> {
	body: string;
	seen: boolean;
	userId: readonly string;
	timestamp: readonly number;
	attachemnts: readonly Record<string, Attachement>;
	user: Ref<User>;

	constructor(
		roomId: string,
		props: MessageProps,
		ref?: DocumentReference<DocumentData>
	);

	async save(firestoreInstance?: Firestore): Promise<void>;

	uploadFile(
		file: File,
		storage?: FirebaseStorage
	): UploadTask & {
		observe: (callback: () => void) => ReturnType<UploadTask["on"]>;
		remove: () => Promise<void>;
	};

	deleteFile(ref: StorageReference, storage?: FirebaseStorage): Promise<void>;

	static getCollection(
		roomId: string,
		firestore?: Firestore
	): CollectionReference<DocumentData>;

	static fromFirestore(snapshot: DocumentSnapshot<DocumentData>): Message;

	static newDraft(roomId: string, props?: MessageProps): Message;
}
