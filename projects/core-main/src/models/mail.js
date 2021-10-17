import { User } from ".";
import Model from "./model";
import Ref from "./Ref";

const Props = {
    subject: "subject",
    body: 'body',
}

export default class Mail extends Model {

    constructor(props, ref) {
        super(props, ref, 'mails')
        this.sender = new Ref(this.props.senderRef, User.fromFirestore)
        this.recipient = new Ref(this.props.recipientRef, User.fromFirestore)
    }

    get subject() { return this.props[Props.subject] }
    set subject(val) {
        this.props[Props.subject] = val
    }
    setSubject(val) {
        this.subject = val
        return this
    }

    get body() { return this.props[Props.body] }
    set body(val) {
        this.props[Props.body] = val
    }
    setBody(val) {
        this.body = val
        return this
    }

    get createdAt() { return this.props.createdAt }
    get modifiedAt() { return this.props.modifiedAt }
}
