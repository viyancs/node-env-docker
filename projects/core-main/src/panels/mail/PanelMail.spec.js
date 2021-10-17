// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom'
import { render, cleanup } from '@testing-library/svelte'
import { writable } from 'svelte/store'
import PanelMail from './PanelMail.svelte'
import { KEY } from '../../Context.svelte'
import { ContextTester } from '../../components'

beforeEach(cleanup)

const mail = { isUser: true, sender: { first: "", last: "", id: 1 }, subject: "Testing Subject", body: "this is a text body", timeago: "30mn" }

describe('PanelMail', () => {
    test('render', () => {
        const { container } = render(ContextTester, { key: KEY, value: writable({ mails: [] }), component: { default: PanelMail, props: {} } })
        const panel = container.querySelector('.panel')

        expect(panel).toHaveClass('mail')
    })

})

