import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const addPerson = newPerson => {
    const request = axios.post(baseURL, newPerson)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseURL}/${id}`, newObject)
    return request.then(response => response.data)
} 

const deletePerson = (id, personToDelete) => {
    const request = axios.delete(`${baseURL}/${id}`, personToDelete)
    return request
}

const phonebookService = { getAll, addPerson, deletePerson, update }

export default phonebookService