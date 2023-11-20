import axios from "axios"
import { headers } from "./auth"

const API_URL = process.env.REACT_APP_API_URL

// Fetch assigned contexts
function assignedContexts() {
    const data = axios.get(`${API_URL}/class/pupil/`, { headers: headers() })
    return data
}

export const contextsAPI = {
    getAssigned: assignedContexts
}