// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom'
import { render, cleanup } from '@testing-library/svelte'
import Sent from './Sent.svelte'

beforeEach(cleanup)

describe('Sent Message', () => {
    test('render', () => {
        const { container } = render(Sent, {
            message: {
                body: "test",
                timestamp: Date.now(),
                attachements: [],
                user: {
                    get: () => Promise.resolve({ firstName: "Tester", lastName: "T", fullName: "Tester T" })
                }
            }
        })
        const message = container.querySelector('.chat.send')

        expect(message).toBeInTheDocument()
    })

})