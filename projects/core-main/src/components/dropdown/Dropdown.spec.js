// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom'
import { render, fireEvent, cleanup } from '@testing-library/svelte'
import Dropdown from './Dropdown.svelte'
import Item from './Item.svelte'

beforeEach(cleanup)

describe('Dropdown', () => {
  test('render the dropdown and the trigger button', () => {
    const { container } = render(Dropdown)

    expect(container.querySelector('.Dropdown')).toBeInTheDocument()
    expect(container.querySelector('.trigger')).toBeInTheDocument()
  })
  test('render the dropdown with transparent trigger button', () => {
    const { container } = render(Dropdown, {transparent:true})
    const trigger = container.querySelector('button')

    expect(trigger).toHaveClass('bg-transparent')
  })

  test('render the menu', async () => {
    const { container } = render(Dropdown)

    await fireEvent.click(container.querySelector('.trigger'))
    expect(container.querySelector('.Menu')).toBeInTheDocument()
  })

  test('render a menu item', async () => {
    const { container } = render(Item)

    expect(container.querySelector('.Dropdown-Item')).toBeInTheDocument()
  })
})

