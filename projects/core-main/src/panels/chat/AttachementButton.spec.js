// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom'
import { render, cleanup } from '@testing-library/svelte'
import AttachementButton from './AttachementButton.svelte'


describe('AttachementButton', () => {
    beforeEach(cleanup)
    test('render', () => {
        const { container } = render(AttachementButton)
        const button = container.querySelector('button')
        const path = container.querySelector('path')

        expect(button).toBeInTheDocument()
        expect(path).toBeInTheDocument()
    })

})