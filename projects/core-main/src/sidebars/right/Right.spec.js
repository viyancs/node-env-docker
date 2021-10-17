// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom'
import { render, cleanup } from '@testing-library/svelte'
import Right from './Right.svelte'
import { ContextTester } from '../../components'
import { KEY } from '../../Context.svelte'
import { writable } from 'svelte/store'

// Moch auth store module
jest.mock('../../auth/fireStore', () => {
    const store = jest.requireActual('svelte/store')

    return {
        store: {
            profile: store.writable({
                settings: {
                    display: {}
                }
            })
        }
    }
})

describe('Right sidebar', () => {
    beforeEach(cleanup)

    test('render', () => {
        const { container } = render(ContextTester, {
            props: {
                component: { default: Right, props: {} }, key: KEY, value: writable({ events: [], artistEvents: [], users: [], user_id: "" })
            }
        })
        const panel = container.querySelector('.right-sidebar')

        expect(panel).toBeInTheDocument()
    })
})
