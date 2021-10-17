import { where } from "firebase/firestore";
import Collection from "./Collection";
import Event from "./event";
import Model from "./model";

const Props = {
    name: 'name'
}

export default class Artist extends Model {

    constructor(props, ref) {
        super(props, ref, 'artists')
        this.events = new Collection('events', Event.fromFirestore).query(where('artistId', '==', this.id))
    }

    get name() { return this.props[Props.name] }
    set name(val) {
        this.props[Props.name] = val
    }

    get createdAt() { return this.props.createdAt }
    get modifiedAt() { return this.props.modifiedAt }

    static fromFirestore(snapshot) {
        return new Artist(snapshot.data(), snapshot.ref)
    }
}
