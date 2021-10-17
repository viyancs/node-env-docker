import type { DocumentReference } from ".pnpm/@firebase+firestore@3.0.2_@firebase+app@0.7.0/node_modules/@firebase/firestore";
import { User } from ".";
import Model from "./model";
import Ref from "./Ref";

type MailProps = {
	subject: string;
	body: string;
};

export default class Mail extends Model<MailProps> {
	subject: string;
	body: string;
	createdAt: readonly Date;
	modifiedAt: readonly Date;

	constructor(props: MailProps, ref?: DocumentReference);

	setSubject(val: string): this;

	setBody(val: string): this;
}
