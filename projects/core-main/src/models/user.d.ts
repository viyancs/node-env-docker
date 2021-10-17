import type Model from "./model";
import type Notification from "./notification";
import type Room from "./room";
import type Organization from "./organization";
import type {
	getFirestore,
	doc,
	collection,
	DocumentReference,
	DocumentData,
	DocumentSnapshot,
	Firestore,
	CollectionReference,
} from "firebase/firestore";
import type {
	FirebaseStorage,
	StorageReference,
	UploadTask,
} from "firebase/storage";
import type { Unsubscribe } from "firebase/auth";
import type { FirebaseApp } from "firebase/app";
import type Ref from "./Ref";
import type Collection from "./Collection";

type UserProps = {
	avatar: string;
	email: string;
	firstName: string;
	lastName: string;
	birthday: number;
	address: string;
	phoneNumber: string;
	orgId: string;
	orgRef: DocumentReference;
	role: string;
	settings: Record<string, any>;
};

export default class User extends Model<UserProps> {
	avatar: string;
	email: readonly string;
	firstName: string;
	lastName: string;
	birthday: Date;
	birthdayAsNumber: readonly number;
	address: string;
	phoneNumber: string;
	role: string;
	fullName: readonly string
	displayName: readonly string
	activeOrgd: readonly string

	org: Ref<Organization>;
	notifications: readonly Collection<Notification>;
	rooms: readonly Collection<Room>;
	fullName: readonly string;
	displayName: readonly string;

	settings: Settings;

	constructor(props: UserProps, ref?: DocumentReference, draft?: boolean);

	uploadFile(
		file: File,
		storage?: FirebaseStorage
	): UploadTask & {
		observe: (callback: () => void) => ReturnType<UploadTask["on"]>;
		remove: () => Promise<void>;
	};

	deleteFile(ref: StorageReference, storage?: FirebaseStorage): Promise<void>;

	static fromFirestore(obj: DocumentSnapshot<DocumentData>): User;

	static getCollection(
		firestoreInstance: Firestore,
		...pathSegments: string[]
	): CollectionReference<DocumentData>;
	static newDraft(props: UserProps): User;
}

type Counter = {
	get: (...queryConstraints: QueryConstraint[]) => Promise<number>;
	watch: (
		callback: (size: number) => void,
		...queryConstraints: QueryConstraint[]
	) => Unsubscribe;
};

type Display = {
	[key: string]: boolean
}
type Sizes = {
	[key: string]: map
}


class Settings {
	showLiveDemo: boolean;
	amPmDateFormat: boolean;
	endwork: string;
	startwork: string;
	display : Display;
	store : any;
	sizes : Sizes
	desktopNotifications: boolean
	amPmDateFormat: boolean;
	endwork: string;
	startwork: string;
	ics: string[];
	subscribe : any

	constructor(data: Record<string, any>);

	save(): Promise<void>;
}
