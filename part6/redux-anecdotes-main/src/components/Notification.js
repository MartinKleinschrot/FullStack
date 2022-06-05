import { connect } from 'react-redux' 

const Notification = (props) => {
  let style = {}
  if (props.notification) {
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

  return (
    <div style={style}>
      {props.notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotes = connect(mapStateToProps)(Notification)
export default ConnectedNotes