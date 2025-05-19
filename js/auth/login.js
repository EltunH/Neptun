import { login } from "../../services/api.js"

const emailInp = document.getElementById('emailInp')
const passwordInp = document.getElementById('passwordInp')
const btnLog = document.getElementById('btnLog')

window.girisEt = () => {
    btnLog.disabled = true
    const obj = JSON.stringify({
        login: emailInp.value,
        password: passwordInp.value
    })
    login(obj)
        .then(res => {
            if (res.error) {
                emailInp.value = ''
                passwordInp.value = ''
                return alert('Mail və ya şifrə yanlışdır!')
            }
            if (res.status) {
                localStorage.setItem('token', res.token)
                localStorage.setItem('status', res.status)
                window.location.href = '/admin/admin.htm'
            }
        })
        .finally(f => btnLog.disabled = false)
}

window.cixisEt = () => {
    location.href = '/auth/login.htm'
    localStorage.removeItem('token')
    localStorage.removeItem('status')
    localStorage.removeItem('username')
} 