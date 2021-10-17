// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom'
import { render, cleanup } from '@testing-library/svelte'
import Header from './Header.svelte'


describe('Panel chat Header', () => {
    beforeEach(cleanup)
    test('render', () => {
        const { container } = render(Header, {
            room: {
                targets: (user) => Promise.resolve([])
            }, user: {}
        })
        const message = container.querySelector('.chat-header')

        expect(message).toBeInTheDocument()
    })
})
