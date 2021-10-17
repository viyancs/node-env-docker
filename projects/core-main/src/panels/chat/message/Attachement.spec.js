// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom'
import { render, cleanup } from '@testing-library/svelte'
import Attachement from './Attachment.svelte'

beforeEach(cleanup)

describe('Attachement', () => {
    test('render', () => {
        const file = new File(["Hello world"], "foo.txt", {
            type: "text/plain"
        })
        const uploadObserver = (v) => {
            return () => { }
        }
        const { container } = render(Attachement, { file, uploadObserver })
        const panel = container.querySelector('.attachement')

        expect(panel).toBeInTheDocument()
    })

})