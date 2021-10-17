// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom'
import { render, cleanup } from '@testing-library/svelte'
import Footer from './Footer.svelte'

describe('PanelChat Footer', () => {
    beforeEach(cleanup)
    test('render', () => {
        const { container } = render(Footer, {message: {body:""}})
        const message = container.querySelector('.chat-footer')

        expect(message).toBeInTheDocument()
    })
})