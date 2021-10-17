// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom'
import { render, cleanup } from '@testing-library/svelte'
import PanelBase from './PanelBase.svelte'


const mail = { isUser: true, sender: { first: "", last: "", id: 1 }, subject: "Testing Subject", body: "this is a text body", timeago: "30mn" }

describe('PanelBase', () => {
    beforeEach(cleanup)
    test('render the component', () => {
        const { container } = render(PanelBase)
        const panel = container.querySelector('.panel')

        expect(panel).toBeInTheDocument()
    })
    test('render the component + name', () => {
        const { container } = render(PanelBase, { name: "test" })
        const panel = container.querySelector('.panel.test')

        expect(panel).toBeInTheDocument()
    })
    test('render the component + title', () => {
        const { getByText } = render(PanelBase, { title: "test" })

        expect(getByText('test')).toBeInTheDocument()
    })
    test('render the component + subtitle', () => {
        const { getByText } = render(PanelBase, { subtitle: "test" })

        expect(getByText('test')).toBeInTheDocument()
    })

})

