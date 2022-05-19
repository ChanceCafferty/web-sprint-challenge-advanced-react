
import React from 'react'
import AppClass from './AppClass'
import { render } from '@testing-library/react'
// import userEvent from '@testing-library/jest-dom/extend-expect'


// Test that the visible texts in headings, buttons, links... render on the screen.
// Test that typing on the input results in its value changing to the entered text.

// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})

test('renders AppClass without errors', () => {
  render(<AppClass />)
})