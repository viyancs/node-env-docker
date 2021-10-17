import type {
	DocumentData,
	DocumentSnapshot,
	QueryDocumentSnapshot,
	Firestore,
	DocumentReference,
	Unsubscribe,
} from "firebase/firestore";
import type Model from "./model";
import type Message from "./message";
import type User from "./user";
import type Ref from "./Ref";
import type Collection from "./Collection";
import type { Writable } from "svelte/store";

type RoomProps = {
	orgId: string;
	modifiedAt?: Date;
	lastMessageRef?: DocumentReference;
};

type StoreProps = RoomProps & {
	lastMessage: Ref<Message>;
};
export default class Room extends Model<RoomProps> {
	lastMessage: readonly Ref<Message>;
	messages: Collection<Message>;
	members: Collection<Member>;
	store: Writable<StoreProps>;
	name: readonly string;
	orgId: readonly string;
	modifiedAt: readonly number;

	constructor(props: RoomProps, ref?: DocumentReference, draft?: boolean);

	set setUsers(users): void;
	async save(firestoreInstance?: Firestore): Promise<void>;

	newMessage(senderId: string, body?: string): Message;

	send(message: Message): Promise<Message>;

	watch(callback: (room?: Room) => void): Unsubscribe;

	onTyping(
		currentUser: User,
		callback: (members: Member[]) => void
	): Unsubscribe;

	targets(currentUser: User): Promise<Member[]>;

	currentMember(id: string): Promise<Member>;

	getCollection(): CollectionReference<DocumentData>;

	static fromFirestore(snapshot: DocumentSnapshot<DocumentData>): Room;
	static fromFirestore(snapshot: QueryDocumentSnapshot<DocumentData>): Room;
	static newDraft(props: RoomProps): Room;
}

type MemberProps = {
	typing?: boolean;
	notifiable?: boolean;
	userRef?: DocumentReference;
};

export class Member extends Model<MemberProps> {
	user?: Ref<User>;
	nickName: string;
	notifiable: boolean;
	typing: boolean;

	constructor(roomId?: string, props: MemberProps, ref?: DocumentReference);

	save(): Promise<void>;

	subscribe(run, invalidate);

	update(updater);

	watch(callback: (object?: Member) => void): Unsubscribe;

	static fromFirestore(snapshot: DocumentSnapshot): this;
}
