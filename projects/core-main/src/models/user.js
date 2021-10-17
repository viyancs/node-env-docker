import { getFirestore, collection, where, documentId, doc } from "firebase/firestore";
import { deleteObject, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { writable } from "svelte/store";
import Collection, { Cache } from "./Collection";
import Model from "./model";
import Notification from "./notification";
import Organization from "./organization";
import Ref from "./Ref";
import Room from "./room";

const entity = 'users'

/**
 * @type {Cache<User>}
 */
export const UsersPool = new Cache()

// todo move this to db
let display = {
    PanelMail: false,
    //PanelChat:false,
    PanelTeamTask: false,
    PanelDailyTasks: false,
    WidgetLeftNotes: false,
    WidgetLeftRecent: false,
    WidgetLeftStore: false,
    WidgetRightTeam: false,
    WidgetRightUpdates: false
}
let sizes = {
    "basicMode": {
        "PanelMail": { x: 0, y: 0, w: 3, h: 4, resizable: true, draggable: true, customDragger: true, customResizer: false, fixed: false, max: {}, min: { w: 1, h: 1 } },
        "PanelChat": { x: 3, y: 0, w: 3, h: 4, resizable: true, draggable: true, customDragger: true, customResizer: false, fixed: false, max: {}, min: { w: 1, h: 1 } },
        "PanelTeamTask": { x: 0, y: 4, w: 3, h: 4, resizable: true, draggable: true, customDragger: true, customResizer: false, fixed: false, max: {}, min: { w: 1, h: 1 } },
        "PanelDailyTasks": { x: 3, y: 4, w: 3, h: 4, resizable: true, draggable: true, customDragger: true, customResizer: false, fixed: false, max: {}, min: { w: 1, h: 1 } }
    },
    "focusMode": {
        "PanelMail": { x: 2, y: 3, w: 3, h: 4, resizable: true, draggable: true, customDragger: true, customResizer: false, fixed: false, max: {}, min: { w: 1, h: 1 } },
        "PanelChat": { x: 2, y: 3, w: 3, h: 4, resizable: true, draggable: true, customDragger: true, customResizer: false, fixed: false, max: {}, min: { w: 1, h: 1 } },
        "PanelTeamTask": { x: 2, y: 3, w: 3, h: 4, resizable: true, draggable: true, customDragger: true, customResizer: false, fixed: false, max: {}, min: { w: 1, h: 1 } },
        "PanelDailyTasks": { x: 2, y: 3, w: 3, h: 4, resizable: true, draggable: true, customDragger: true, customResizer: false, fixed: false, max: {}, min: { w: 1, h: 1 } }
    }


}


const defaultSettings = {
  showLiveDemo: false,
  desktopNotifications: false,
  display,
  sizes,
}

export default class User extends Model {
    constructor(
        props,
        ref = null,
    ) {
        super({ ...{ settings: defaultSettings }, ...props }, ref, "users");
        this.org = new Ref(props.orgRef, Organization.fromFirestore)
        this.notifications = new Collection(`users/${this.id}/notifications`, Notification.fromFirestore)
        if (props.activeOrgId) {
            this.rooms = new Collection('rooms', Room.fromFirestore)
                .query(where('orgId', '==', props.activeOrgId))
                .query(where('membersIds', 'array-contains', this.id))
            this.activeOrg = new Ref(doc(this.firestore, 'orgs', props.activeOrgId), Organization.fromFirestore)
        }
        this.memberships = new Collection(`users/${this.id}/memberships`, Membership.fromFirestore)

        this.settings = new Settings(this.props.settings)
        this.settings.save = () => this.save()
        //this.settings.save = () => this.set({ settings: this.props.settings }, { merge: true })
    }

  get avatar() {
    return this.props.avatar
  }
  set avatar(val) {
    this.props.avatar = val
  }

  get email() {
    return this.props.email
  }

  get firstName() {
    return this.props.firstName
  }
  set firstName(val) {
    this.props.firstName = val
  }

  get lastName() {
    return this.props.lastName
  }
  set lastName(val) {
    this.props.lastName = val
  }

  get role() {
    return this.props.role
  }

  get address() {
    return this.props.address
  }
  set address(val) {
    this.props.address = val
  }

  get birthday() {
    return this.props.birthday
  }
  set birthday(val) {
    this.props.birthday = val
  }
  get birthdayAsNumber() {
    return +this.birthday
  }

  get phoneNumber() {
    return this.props.phoneNumber
  }
  set phoneNumber(val) {
    this.props.phoneNumber = val
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`
  }
  get displayName() {
    return `${this.firstName} ${this.lastName[0]}.`
  }

    get activeOrgId() {
        return this.props.activeOrgId
    }

    /**
     *
     * @param {File} file
     * @param {*} storage
     * @description Attach a file for the current message
     */
    uploadFile(file, storage = getStorage()) {
        const fileRef = ref(storage, `users/${this.id}/${file.name}`)
        const uploadTask = uploadBytesResumable(fileRef, file)

    /* uploadTask.then(async res => {
            this.props.avatar = await getDownloadURL(res.ref)
            console.log(this.props)
            this.save()
            return res
        }) */

    // @ts-ignore
    uploadTask.observe = (callback) => uploadTask.on('state_changed', callback)
    // @ts-ignore
    uploadTask.remove = () => this.deleteFile(fileRef)

    return uploadTask
  }

  deleteFile(ref) {
    return deleteObject(ref).then(() => {
      this.props.avatar = null
    })
  }

  static fromFirestore(snapshot) {
    // @ts-ignore
    return new User({ ...snapshot.data() }, snapshot.ref)
  }

  static getCollection(firestoreInstance, ...pathSegments) {
    return collection(
      firestoreInstance ?? getFirestore(),
      entity,
      ...pathSegments,
    )
  }
  static newDraft(props) {
    return new Room(props, null, true)
  }
}

class Settings {

    constructor(data) {
        this.data = data ?? {};
        this.save = undefined;
        this.store = writable(data)
    }
    subscribe(run, invalidate){
        return this.store.subscribe(run, invalidate)
    }
    get display(){
        return this.data.display
    }
    set display(val) {
        this.data.display = val
        this.store.set(this.data)
    }
    get sizes() {
        return this.data.sizes
    }
    set sizes(val) {
        this.data.sizes = val
        this.store.set(this.data)
    }
    get showLiveDemo() {
        return this.data.showLiveDemo
    }
    set showLiveDemo(val) {
        this.data.showLiveDemo = val
        this.store.set(this.data)
    }

    get desktopNotifications() {
        return this.data.desktopNotifications
    }
    set desktopNotifications(val) {
        this.data.desktopNotifications = val
    }

    get amPmDateFormat() {
        return this.data.amPmDateFormat
    }
    set amPmDateFormat(val) {
        this.data.amPmDateFormat = val
    }

    get startwork() {
        return this.data.startwork
    }
    set startwork(val) {
        this.data.startwork = val
    }
    get endwork() {
        return this.data.endwork
    }
    set endwork(val) {
        this.data.endwork = val
    }
    get ics() {
        return this.data.ics
    }
    set ics(val) {
        this.data.ics = val
    }



}

class Membership extends Model {
    constructor(userId, props, ref) {
        super(props, ref, `users/${userId}/members`)
        this.org = new Ref(doc(this.firestore, `orgs/${props.orgId}`), Organization.fromFirestore)
        this.rooms = new Collection(`rooms`, Room.fromFirestore).query(where('orgId', '==', props.orgId))

    }

    get updatedAt() {
        return this.props.updatedAt
    }
    get createdAt() {
        return this.props.createdAt
    }

    static fromFirestore(snapshot) {
        return new Membership(snapshot.id, snapshot.data(), snapshot.ref)
    }
}
