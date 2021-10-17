import { writable } from 'svelte/store'
import { getAuth } from 'firebase/auth'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { User } from '../models'
import init from '../config/firebase'
import { getFunctions, httpsCallable } from "firebase/functions";
import { tick } from 'svelte'

const fireStore = (app) => {
  /**
   * @type {import('svelte/store').Writable<import('firebase/auth').User>}
   */
  const store = writable()
  const { set, subscribe } = store
  /**
   * @type {import('svelte/store').Writable<User>}
   */
  let profile = writable()
  let activeOrgId

  const auth = getAuth(app)
  const db = getFirestore(app)

  const prepareUserData = httpsCallable(
    getFunctions(),
    "prepareUserData"
  );

  const stateChanged = new Promise((resolve, reject) => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        await tick()
        if (typeof(Storage) !== "undefined") {
          if (!activeOrgId) {
            activeOrgId = localStorage.getItem('activeOrg')
          } else {
            localStorage.setItem('activeOrg', activeOrgId)
          }
        }
        await prepareUserData({ orgId: activeOrgId, uid: user.uid })
        const snapshot = await getDoc(doc(db, 'users', user.uid))
        profile.set(User.fromFirestore(snapshot))
        resolve(user)
      } else {
        if (typeof(Storage) !== "undefined") {
          localStorage.setItem('activeOrg', undefined)
        }
      }
      set(user)
    }, err => {
      reject(err)
    })
  })

  return {
    subscribe,
    auth,
    app,
    db,
    stateChanged,
    profile: {
      subscribe: profile.subscribe
    },
    setActiveOrgId: (id) => activeOrgId = id
  }
}

export let store

export const getStore = () => store

export default (config = {}) => {
  const app = init(config)
  store = fireStore(app)
  return store
}
