import axios from "axios"
import { headers } from "./auth"

const API_URL = process.env.REACT_APP_API_URL

// List all teacher's classes
function ownedClasses() {
    const data = axios.get(`${API_URL}/class/`, { headers: headers() })
    return data
}

export const classesAPI = {
    own: ownedClasses,
}