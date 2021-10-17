import type { DocumentReference, DocumentSnapshot } from "firebase/firestore";
import type Artist from "./artist";
import Model from "./model";
import type Ref from "./Ref";

type EventProps = {
	title: string;
	location: string;
	link: string;
};

export default class Event extends Model<EventProps> {
	title: string;
	location: string;
	link: string;
	artist: readonly Ref<Artist>;
	createdAt: readonly Date;
	modifiedAt: readonly Date;

	constructor(props: EventProps, ref?: DocumentReference);

	static fromFirestore(snapshot: DocumentSnapshot): this;
}
