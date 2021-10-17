// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom'
import { render, cleanup } from '@testing-library/svelte'
import { get } from 'svelte/store'
import PanelChat from './PanelChat.svelte'
import { store } from '../../auth/fireStore'

jest.mock('../../auth/fireStore.js', () => {
    const svelteStores = jest.requireActual('svelte/store')

    const authStore = svelteStores.writable({

    })
    const store = {
        subscribe: authStore.subscribe,
        auth: jest.fn(),
        profile: svelteStores.writable({
            rooms: {
                watch: (callback, ...args) => {
                    callback([{
                        messages: {
                            watch: (callback) => {
                                callback([])
                                return () => { }
                            }
                        }
                    }])
                    return () => { }
                }
            },
            targets: (user) => Promise.resolve([]),
            displayName: "Specta T.",
            lastName: "Tester",
            firstName: "Specta",
        })
    }
    return {
        getStore: () => store,
        store
    }
})


describe('PanelChat', () => {
    beforeEach(cleanup)

    test('auth', () => {
        expect(get(store)).toBeTruthy()
    })

    test('render', () => {
        const { container } = render(PanelChat)
        const message = container.querySelector('.chat')

        expect(message).toBeInTheDocument()
    })
})
