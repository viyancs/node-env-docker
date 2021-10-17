import { doc } from ".pnpm/@firebase+firestore@3.0.2_@firebase+app@0.7.0/node_modules/@firebase/firestore";
import Artist from "./artist";
import Model from "./model";
import Ref from "./Ref";

const Props = {
    title: "title",
    location: 'location',
    link: 'link'
}

export default class Event extends Model {

    constructor(props, ref) {
        super(props, ref, 'events')
        this.artist = new Ref(doc(this.firestore, this.props.artistId), Artist.fromFirestore)
    }

    get title() { return this.props[Props.title] }
    set title(val) {
        this.props[Props.title] = val
    }

    get location() { return this.props[Props.location] }
    set location(val) {
        this.props[Props.location] = val
    }

    get link() { return this.props[Props.link] }
    set link(val) {
        this.props[Props.link] = val
    }

    get createdAt() { return this.props.createdAt }
    get modifiedAt() { return this.props.modifiedAt }

    static fromFirestore(snapshot) {
        return new Event(snapshot.data(), snapshot.ref)
    }
}

