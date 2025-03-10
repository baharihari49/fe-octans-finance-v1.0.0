import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const login = async (email: string, password: string) => {

    const response = await axios.post(`${API_URL}/login`, {email, password})

    const token = response.data.access_token

    if(token) {
        await axios.post('/api/auth/set-token', { token });
        return response.data
    }
}


export const register = async (username: string, name: string, email: string, password: string, password_confirmation: string) => {
    const response = await axios.post(`${API_URL}/register`, {username, name, email, password, password_confirmation})
    const token = response.data.access_token

    if(token){
        await axios.post('/api/auth/set-token', { token });
        return response.data
    }
}