import axios from "axios"
import { headers } from "./auth"

const API_URL = process.env.REACT_APP_API_URL

// Fetch unfinished jotters
function unfinishedJotters() {
    const data = axios.get(`${API_URL}/jotter/incomplete/`, { headers: headers() })
    return data
}

// Fetch finished jotters
function finishedJotters() {
    const data = axios.get(`${API_URL}/jotter/complete/`, { headers: headers() })
    return data
}

// Create new jotter
function createJotter(body) {
    const data = axios.post(`${API_URL}/jotter/create/`, body, { headers: headers() })
    return data
}

// Fetch/Edit/Delete jotter - determined by method passed in
function singleJotter(id, method, body) {
    const data = axios({
        method: method,
        url: `${API_URL}/jotter/${id}/`,
        headers: headers(),
        data: body
    })
    return data
}

export const jottersAPI = {
    unfinished: unfinishedJotters,
    finished: finishedJotters,
    create: createJotter,
    single: singleJotter
}