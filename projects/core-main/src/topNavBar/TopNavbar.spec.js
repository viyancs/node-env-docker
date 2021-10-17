// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom'
import { render, cleanup } from '@testing-library/svelte'
import { get } from 'svelte/store'
import TopNavBar from './TopNavbar.svelte'
import { getStore } from '../auth/fireStore'

jest.mock('../auth/fireStore.js', () => {
    const writable = jest.requireActual('svelte/store').writable

    return {
        getStore: () => ({
            auth: jest.fn(),
            profile: writable({
                notifications: {
                    watch: (callback, ...args) => {
                        callback([])
                        return () => { }
                    }
                },
                displayName: "Specta T.",
                lastName: "Tester",
                firstName: "Specta"
            })
        })
    }
})

describe('TopNavbar', () => {
    beforeEach(cleanup)
    test('Auth', () => {
        expect(get(getStore().profile)).toBeTruthy()
    })

    test('render', () => {
        const { container, getByText } = render(TopNavBar)
        const panel = container.querySelector('.navbar-wrapper')

        expect(panel).toBeInTheDocument()
    })
})
