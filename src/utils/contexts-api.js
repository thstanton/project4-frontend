import axios from "axios"
import { headers } from "./auth"

const API_URL = process.env.REACT_APP_API_URL

// Fetch owned contexts
function ownedContexts() {
    const data = axios.get(`${API_URL}/contexts/`, { headers: headers() })
    return data
}

// Fetch assigned contexts
function assignedContexts() {
    const data = axios.get(`${API_URL}/class/pupil/`, { headers: headers() })
    return data
}

// Create new context
function newContext(data) {
    const response = axios.post(`${API_URL}/contexts/create/`, data, { headers: headers() })
    return response
}

// Fetch/Edit/Delete Context - determined by method passed in
function singleContext(id, method, body) {
    const data = axios({
        method: method,
        url: `${API_URL}/contexts/${id}/`,
        headers: headers(),
        data: body
    })
    return data
}

// Assign context to a class
function assignClass(contextID, classID) {
    const response = axios.post(`${API_URL}/contexts/${contextID}/assign/${classID}/`, { headers: headers() })
    return response
}

// Unassign context from a class
function unassignClass(contextID, classID) {
    const response = axios.delete(`${API_URL}/contexts/${contextID}/unassign/${classID}/`, { headers: headers() })
    return response
}

export const contextsAPI = {
    own: ownedContexts,
    getAssigned: assignedContexts,
    create: newContext,
    single: singleContext,
    assign: assignClass,
    unassign: unassignClass
}