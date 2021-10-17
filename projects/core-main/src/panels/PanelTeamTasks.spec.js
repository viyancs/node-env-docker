// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom'
import { render, cleanup } from '@testing-library/svelte'
import PanelTasksBase from './PanelTasksBase.svelte'


describe('PanelTeamTasks', () => {
    beforeEach(cleanup)
    test('render', () => {
        const { container } = render(PanelTasksBase, { name: "test" })
        const panel = container.querySelector('.panel.test')

        expect(panel).toBeInTheDocument()
    })

})