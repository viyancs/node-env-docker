// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom'
import { render, fireEvent, cleanup } from '@testing-library/svelte'
import { writable } from 'svelte/store'
import CustomAccordian from './CustomAccordian.svelte'

beforeEach(cleanup)

describe('Bottom sidebar', () => {
    test('render', () => {
        const { container } = render(CustomAccordian)
        const panel = container.querySelector('.custom-accordian')

        expect(panel).toBeInTheDocument()
    })

})