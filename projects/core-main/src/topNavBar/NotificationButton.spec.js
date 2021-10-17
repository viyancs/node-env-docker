// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom'
import { render, cleanup } from '@testing-library/svelte'
import NotificationButton from './NotificationButton.svelte'

describe('TopNavbar', () => {
    beforeEach(cleanup)
    test('render', () => {
        const { container } = render(NotificationButton)
        const button = container.querySelector('.Notification-button')

        expect(button).toBeInTheDocument()
    })
})
