import { useSelector } from 'react-redux'

const Notification = () => {
  let style = {}
  const notification = useSelector(state => state.notification)
  if (notification) {
    style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
  } else {
    style = {
      display: 'none'
    }
  }

  if (notification.success) {
    return (
      <div style={style} className="success">
        { notification.message }
      </div>
    )
  } else {
    return (
      <div style={style} className="error">
        { notification.message }
      </div>
    )
  }
}

export default Notification