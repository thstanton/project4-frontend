import axios from "axios"
import { headers } from "./auth"

const API_URL = process.env.REACT_APP_API_URL

// Fetch assigned contexts
function assignedContexts() {
    const data = axios.get(`${API_URL}/class/pupil/`, { headers: headers() })
    return data
}

// Create new context
function newContext(context) {
    const response = axios.post(`${API_URL}/contexts/create/`, context, { headers: headers() })
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

export const contextsAPI = {
    getAssigned: assignedContexts,
    create: newContext,
    single: singleContext
}