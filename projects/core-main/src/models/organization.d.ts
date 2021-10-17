import type { DocumentReference, DocumentSnapshot } from "firebase/firestore";
import type Model from "./model";

type OrganizationProps = {
	name?: string;
};

export default class Organization extends Model<OrganizationProps> {
	constructor(props?: OrganizationProps, ref?: DocumentReference);
	get name(): name;

	static fromFirestore(snapshot: DocumentSnapshot): Organization;
}
