// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom'
import { render, cleanup } from '@testing-library/svelte'
import PanelItem from './PanelItem.svelte'


describe('PanelItem', () => {
    beforeEach(cleanup)
    test('render the component', () => {
        const { container } = render(PanelItem)
        const panel = container.querySelector('.panel-item')

        expect(panel).toBeInTheDocument()
    })

})

