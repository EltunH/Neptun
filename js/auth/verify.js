import { verifyToken } from "../../services/api.js";

export function verifyAdmin() {
    const token = localStorage.getItem('token')
    const status = localStorage.getItem('status')
    if(!token || !status) location.href = '/auth/login.htm'
    else {
        verifyToken().then(res => {
            if (res.error) {
                location.href = '/auth/login.htm'
            } else {
                localStorage.setItem('username', res.user_login)
                document.getElementById('userName').innerHTML = res.user_login
            }
        })
    }
}