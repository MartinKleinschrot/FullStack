import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
  let container
  const mockHandler = jest.fn()

  beforeEach(() => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Bryan Adams',
      likes: 0,
      url: 'www.myblog.com'
    }

    const deleteBlog = () => {
      console.log('test')
    }

    container = render(<Blog blog={blog} deleteBlog={deleteBlog} updateBlog={mockHandler}/>).container
  })

  test('author and title are shown, url and like are within display:none div', async() => {
    const title = screen.queryByText('Component testing is done with react-testing-library')
    expect(title).toBeDefined()

    const author = screen.queryByText('Bryan Adams')
    expect(author).toBeDefined()

    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
    expect(div).toHaveTextContent('www.myblog.com')
    expect(div).toHaveTextContent('0')
  })

  test('url and like can be seen with buttonpress on "view"', async() => {
    expect(container).toBeDefined()
    expect(container).toHaveTextContent('Component testing is done with react-testing-library')
    expect(container).toHaveTextContent('Bryan Adams')

    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
    expect(div).toHaveTextContent('www.myblog.com')
    expect(div).toHaveTextContent('0')

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    expect(div).not.toHaveStyle('display: none')
    expect(div).toHaveTextContent('www.myblog.com')
    expect(div).toHaveTextContent('0')

  })

  test('when button like is clicked twice - handle fires twice', async() => {
    expect(container).toBeDefined()
    expect(container).toHaveTextContent('Component testing is done with react-testing-library')
    expect(container).toHaveTextContent('Bryan Adams')

    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
    expect(div).toHaveTextContent('www.myblog.com')
    expect(div).toHaveTextContent('0')

    const user = userEvent.setup()
    const button = container.querySelector('.btnLike')
    await user.click(button)
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})