import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (newObject) => {
  const request = axios.put(`${baseUrl}/${newObject.id}`, newObject)
  return request.then((response) => response.data)
}

const deleteBlog = (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then((response) => response.data)
}

const getBlog = (id) => {
  const requesturl = (`${baseUrl}/${id}`)
  const request = axios.get(requesturl)
  return request.then((response) => {
    return response.data
  })
}

export default { getAll, create, update, setToken, deleteBlog, getBlog }
