// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom'
import { render, cleanup } from '@testing-library/svelte'
import Attachements from './Attachements.svelte'

describe('Attachements', () => {
    beforeEach(cleanup)

    test('render', () => {
        const { container } = render(Attachements)
        const panel = container.querySelector('.attachements')

        expect(panel).toBeInTheDocument()
    })

})