import { where } from "firebase/firestore";
import Collection from "./Collection";
import Event from "./event";
import Model from "./model";

const ArtistProps = {
	name: "name",
};

export default class Artist extends Model<ArtistProps> {
	name: string;
	events: readonly Collection<Event>;
	createdAt: readonly Date;
	modifiedAt: readonly Date;

	constructor(props: ArtistProps, ref?: DocumentReference);

	static fromFirestore(snapshot: DocumentReference): this;
}
