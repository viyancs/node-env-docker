// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom'
import { render, cleanup } from '@testing-library/svelte'
import Bottom from './Bottom.svelte'

beforeAll(() => {
    
})

describe('Bottom sidebar', () => {
    beforeEach(cleanup)
    global.fetch = jest.fn((url, options) => Promise.resolve({ json: () => Promise.resolve([]) }))
    test('render', () => {
        const { container } = render(Bottom)
        const panel = container.querySelector('.bottom-calendar-wrapper')

        expect(panel).toBeInTheDocument()
    })

})