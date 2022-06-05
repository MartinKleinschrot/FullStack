import { connect } from 'react-redux' 
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={e => props.setFilter(e.target.value)}/>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
  }
}

const mapDispatchToProps = {
  setFilter,
}

const ConnectedNotes = connect(mapStateToProps,mapDispatchToProps)(Filter)
export default ConnectedNotes