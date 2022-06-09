import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state = action.payload
      return state
    },
    removeUser(state) {
      state = null
      return state
    },
    getUser(state) {
      return state
    }
  }
})

export const { setUser, removeUser, getUser } = userSlice.actions
export default userSlice.reducer