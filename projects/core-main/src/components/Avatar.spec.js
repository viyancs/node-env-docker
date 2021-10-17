// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom'
import { render, cleanup } from '@testing-library/svelte'
import Avatar from './Avatar.svelte'


beforeEach(cleanup)


describe('PanelMail', () => {
    test('render the component', () => {
        const { container, getByText } = render(Avatar, {
            user: {
                firstName: "Tester",
                lastName: "One"
            }
        })
        const avatar = container.querySelector('.avatar')

        expect(avatar).toBeInTheDocument()
        expect(getByText("T")).toBeInTheDocument()
        expect(getByText("O")).toBeInTheDocument()
    })

})

