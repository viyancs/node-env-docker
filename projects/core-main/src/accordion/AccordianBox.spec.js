// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom'
import { render, fireEvent, cleanup } from '@testing-library/svelte'
import { writable } from 'svelte/store'
import AccordianBox from './AccordianBox.svelte'

beforeEach(cleanup)

describe('Bottom sidebar', () => {
    test('render the component', () => {
        const { container } = render(AccordianBox)
        const panel = container.querySelector('.acordian-body')

        expect(panel).toBeInTheDocument()
    })

})