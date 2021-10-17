// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom'
import { render, cleanup } from '@testing-library/svelte'
import Calendar from './Calendar.svelte'


describe('Calendar', () => {
    beforeEach(cleanup)
    test('render', () => {
        const { container } = render(Calendar)
        const calendarWrapper = container.querySelector('.calendar-wrapper')

        expect(calendarWrapper).toBeInTheDocument()
    })

})

afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
})
