// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom'
import { render, cleanup } from '@testing-library/svelte'
import Left from './Left.svelte'

// Moch auth store module
jest.mock('../../auth/fireStore', () => {
    const store = jest.requireActual('svelte/store')

    return {
        store: {
            profile: store.writable({
                settings: {
                    display: {}
                }
            })
        }
    }
})

describe('PanelTasksBase', () => {
    beforeEach(cleanup)
    test('render', () => {
        const { container } = render(Left)
        const panel = container.querySelector('.left-sidebar')

        expect(panel).toBeInTheDocument()
    })

})
