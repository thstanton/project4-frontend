import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

export function headers() {
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`
    }
}

export async function login(credentials) {
    const { data } = await axios.post(`${API_URL}/token/`, credentials, {
        headers: { "Content-Type": "application/json"}
    }, {
        withCredentials: true
    })
    localStorage.clear()
    localStorage.setItem("access_token", data.access)
    localStorage.setItem("refresh_token", data.refresh)
    return await getUser()
}

export function getToken() {
    const token = localStorage.getItem('access_token')
    if (!token) return null
    return token
}

export async function getUser() {
    const token = getToken()
    if (token) {
        try {
            const user = await axios.get(`${API_URL}/users/self/`, { headers: headers() })
            return user.data[0]
        } catch (err) {
            console.error(err)
        }   
    }
    return null
}

export function logout() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token') 
}

export function createAccount(groupId, newUser) {
    const response = axios.post(
        `${API_URL}/users/${groupId}/create/`, 
        newUser, 
        { headers: { "Content-Type": "application/json"} 
    })
    return response
}