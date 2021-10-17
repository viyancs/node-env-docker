// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom'
import { render, cleanup } from '@testing-library/svelte'
import CalendarDetail from './CalendarDetail.svelte'


describe('CalendarDetails', () => {
    beforeEach(cleanup)
    test('render', () => {
        const { container } = render(CalendarDetail, {
            message: {
                id: Date.now().toString(8),
                event: {
                    eventTitile: "Test title",
                    start_fmt: Date.now() + "",
                    end_fmt: Date.now() + ""
                }
            }
        })
        const calendarDetails = container.querySelector('.calendar-detail')

        expect(calendarDetails).toBeInTheDocument()
    })

})