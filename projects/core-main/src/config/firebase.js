import prodFirebase from './firebase.prod'
import devFirebase from './firebase.dev'

export const getConfigs = () => ({
    // @ts-ignore
    apiKey: API_KEY,
    // @ts-ignore
    authDomain: AUTH_DOMAIN,
    // @ts-ignore
    projectId: PROJECT_ID,
    // @ts-ignore
    storageBucket: STORAGE_BUCKET,
    // @ts-ignore
    messagingSenderId: MESSAGING_SENDER_ID,
    // @ts-ignore
    appId: APP_ID,
    // @ts-ignore
    measurementId: MEASUREMENT_ID,
})

export default (config) => {
    if (NODE_ENV === 'development') {
        return devFirebase(config)
    }

    return prodFirebase(config)
}
