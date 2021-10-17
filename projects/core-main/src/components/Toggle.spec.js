// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom'
import { render, fireEvent, cleanup } from '@testing-library/svelte'
import Toggle from './Toggle.svelte'

beforeEach(cleanup)

describe('Toggle', () => {
    test('render', () => {
        const { container } = render(Toggle)

        expect(container.querySelector('.Toggle')).toBeInTheDocument()
    })
    test('render the checked trigger component', () => {
        const { container } = render(Toggle, { checked: true })

        expect(container.querySelector('.Toggle input[type="checkbox"]')).toBeInTheDocument()
    })

    test('disabled Toggle', async () => {
        const { container } = render(Toggle, { disabled: true })

        expect(container.querySelector('.Toggle input[disabled]')).toBeInTheDocument()
    })
    test('on click', async () => {
        const { container } = render(Toggle)
        const checkbox = container.querySelector('.Toggle input[type="checkbox"]')

        await fireEvent.click(checkbox)

        // @ts-ignore
        expect(checkbox.checked).toBe(true)
    })
})

