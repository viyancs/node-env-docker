import Model from "./model";

export default class Organization extends Model {

    constructor(props, ref) {
        super(props, ref, "organizations")
    }
    get name() {
        return this.props.name
    }

    static fromFirestore(snapshot) {
        return new Organization(snapshot.data(), snapshot.ref)
    }

}