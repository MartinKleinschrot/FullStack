import axios from 'axios'
const baseUrl = '/api/users'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => {
    return response.data
  })
}

const getUser = (id) => {
  const requesturl = (`${baseUrl}/${id}`)
  const request = axios.get(requesturl)
  return request.then((response) => {
    return response.data
  })
}

export default { getAll, getUser }
