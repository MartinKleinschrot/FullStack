import { createSlice } from '@reduxjs/toolkit'

const initialState = ''
let timeoutID = 0

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      state = action.payload
      return state
    },
    removeNotification(state) {
      state = ''
      return state
    },
    getNotification(state) {
      return state
    }
  }
})

export const setNotificationWithTime = (message, time, success) => {
  return async dispatch => {
    dispatch(setNotification({ message: message, success: success }))
    if (timeoutID) {
      clearTimeout(timeoutID)
    }
    timeoutID = setTimeout(() => {
      dispatch(removeNotification())
    }, time * 1000)
  }
}

export const { setNotification, removeNotification, getNotification } = notificationSlice.actions
export default notificationSlice.reducer