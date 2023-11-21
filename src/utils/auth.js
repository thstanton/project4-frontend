import axios from 'axios'

export function headers() {
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`
    }
}

export async function login(credentials) {
    const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/token/`, credentials, {
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
            const user = await axios.get(`${process.env.REACT_APP_API_URL}/users/self/`, { headers: headers() })
            return user.data[0]
        } catch (err) {
            throw new Error(err)
        }   
    }
    return null
}

export function logout() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    
}