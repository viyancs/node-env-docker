// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom'
import { render, fireEvent, cleanup } from '@testing-library/svelte'
import MailItem from './MailItem.svelte'

beforeEach(cleanup)

const mail = { isUser: true, sender: { first: "", last: "", id: 1 }, subject: "Testing Subject", body: "this is a text body", timeago: "30mn" }

describe('MailItem', () => {
    test('render the component', () => {
        const { container } = render(MailItem, { mail })

        expect(container.querySelector('.panel-item')).toBeInTheDocument()
    })

})

