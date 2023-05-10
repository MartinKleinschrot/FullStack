import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant="secondary" onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {props.children}
        <Button variant="secondary" onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}
Togglable.displayName = 'Togglable'

export default Togglable
