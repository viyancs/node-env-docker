// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom'
import { render, cleanup } from '@testing-library/svelte'
import RoomComponent from './Room.svelte'

describe('Room', () => {
    beforeEach(cleanup)

    test('render', () => {
        const room = {
            lastMessage: {
                get: () => Promise.resolve({})
            },
            targets: () => Promise.resolve([]),
            watch: (callback) => {
                callback({ lastMessage: { get: () => Promise.resolve({ timestamp: Date.now() }) } })
                return () => { }
            },
            messages: {
                watch: (callback) => {
                    callback([])
                    return () => { }
                }
            },
            setUsers:()=>{}

        }
        // const user = User.newDraft({firstName:"tester", lastName:"one", email:"tester.one@specta.com", role:"CEO", orgId:"1", })
        const { container } = render(RoomComponent, { room, currentUser: { ref: {} } })
        const message = container.querySelector('.room')

        expect(message).toBeInTheDocument()
    })
})
