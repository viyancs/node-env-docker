// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom'
import { render, cleanup } from '@testing-library/svelte'
import Message from './Recieved.svelte'

describe('Recieved Message', () => {
    beforeEach(cleanup)

    test('render', () => {
        const { container } = render(Message, {
            message: {
                body: "test",
                timestamp: Date.now(),
                attachements: [],
                user: {
                    get: () => Promise.resolve({ firstName: "Tester", lastName: "T", fullName: "Tester T" })
                }
            }
        })
        const message = container.querySelector('.chat.recieve')

        // expect(message).toBeInTheDocument()
        expect(message).toBeInTheDocument()
    })

})