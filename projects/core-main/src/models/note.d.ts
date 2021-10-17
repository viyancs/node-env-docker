import Model from "./model";
import { getFirestore, collection, doc } from "firebase/firestore";
import {
	deleteObject,
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import Ref from "./Ref";
import User from "./user";

export type NoteProps = {
	body?: string;
	name?: string;
	authorId?: string;
	image?: string;
};

export default class Note extends Model<NoteProps> {
	body: string;
	name: string;
	authorId: string;
	image: readonly string;
	author: readonly Ref<User>;

	constructor(
		taskId: string,
		props: NoteProps,
		ref?: DocumentReference<DocumentData>
	);

	setBody(val: string): this;

	setName(val: string): this;

	setAuthorId(val: string): this;

	setImage(
		file: File,
		storage: FirebaseStorage
	): UploadTask & {
		observe: (callback: () => void) => ReturnType<UploadTask["on"]>;
		remove: () => Promise<void>;
	};

	deleteImage(storage?: FirebaseStorage): Promise<void>;

	static fromFirestore(snapshot: DocumentSnapshot<DocumentData>): this;

	static getCollection(
		taskId: string,
		firestoreInstance: Firestore
	): CollectionReference<DocumentData>;
}
