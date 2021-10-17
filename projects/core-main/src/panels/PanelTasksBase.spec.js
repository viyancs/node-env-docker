// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom'
import { render, cleanup } from '@testing-library/svelte'
import PanelTasksBase from './PanelTasksBase.svelte'


describe('PanelTasksBase', () => {
    beforeEach(cleanup)
    test('render the component', () => {
        const { container } = render(PanelTasksBase)
        const panel = container.querySelector('.panel')

        expect(panel).toBeInTheDocument()
    })

})

