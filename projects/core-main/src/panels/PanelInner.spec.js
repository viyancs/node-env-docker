// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom'
import { render, cleanup } from '@testing-library/svelte'
import PanelInner from './PanelInner.svelte'


describe('PanelInner', () => {
    beforeEach(cleanup)
    test('render the component', () => {
        const { container } = render(PanelInner)
        const panel = container.querySelector('.panel-inner-wrapper')

        expect(panel).toBeInTheDocument()
    })

})

