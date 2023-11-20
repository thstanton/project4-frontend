import axios from "axios"
import { headers } from "./auth"

// Fetch assigned contexts
export function assignedContexts() {
    const data = axios.get(`${process.env.REACT_APP_API_URL}/class/pupil/`, { headers: headers() })
    console.log(data)
    return data
}