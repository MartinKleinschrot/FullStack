import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  //render(<BlogForm createNote={createBlog} />)
  const container = render(<BlogForm createBlog={createBlog} />).container

  //const input = screen.getByRole('textbox')
  const title = container.querySelector('.title')
  await user.type(title, 'Working title')

  const author = container.querySelector('.author')
  await user.type(author, 'John Cena')

  const url = container.querySelector('.url')
  await user.type(url, 'www.johncena.com')

  const sendButton = screen.getByText('create')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Working title')
  expect(createBlog.mock.calls[0][0].author).toBe('John Cena')
  expect(createBlog.mock.calls[0][0].url).toBe('www.johncena.com')
})
