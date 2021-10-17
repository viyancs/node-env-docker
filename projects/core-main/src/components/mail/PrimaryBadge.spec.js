// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom'
import { render, fireEvent, cleanup } from '@testing-library/svelte'
import PrimaryBadge from './PrimaryBadge.svelte'

beforeEach(cleanup)

describe('PrimaryBadge', () => {
    test('render the trigger component', () => {
        const { container } = render(PrimaryBadge)

        expect(container.querySelector('.primary-badge')).toBeInTheDocument()
    })
})

