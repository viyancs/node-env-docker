// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom'
import { render, fireEvent, cleanup } from '@testing-library/svelte'
import AccordianBoxItem from './AccordianBoxItem.svelte'

beforeEach(cleanup)

describe('Bottom sidebar', () => {
    test('render', () => {
        const { container } = render(AccordianBoxItem)
        const panel = container.querySelector('.box-accordian-item')

        expect(panel).toBeInTheDocument()
    })

})