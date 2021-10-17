import { initializeApp } from "firebase/app"
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import { connectStorageEmulator, getStorage } from 'firebase/storage'
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions'

export default (config) => {
    const app = initializeApp(config)
    connectAuthEmulator(getAuth(app), 'http://localhost:9099')
    connectFirestoreEmulator(getFirestore(app), 'localhost', 8080)
    connectStorageEmulator(getStorage(app), 'localhost', 0)
    connectFunctionsEmulator(getFunctions(app), 'localhost', 5001)

    return app
}
