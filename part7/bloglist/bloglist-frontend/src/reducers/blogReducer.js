import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state, action) {
      action.payload.sort(function (a,b) {
        return b.likes - a.likes
      })
      state = action.payload
      return state
    },
    removeBlog(state) {
      state = ''
      return state
    },
    getBlog(state) {
      return state
    }
  }
})

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const { setBlogs, removeBlog, getBlog } = blogSlice.actions
export default blogSlice.reducer