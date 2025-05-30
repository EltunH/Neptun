import { login } from "../../services/api.js"

const emailInp = document.getElementById('emailInp')
const passwordInp = document.getElementById('passwordInp')
const btnLog = document.getElementById('btnLog')

window.girisEt = () => {
    if(validation()) return
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
            if (res.errors) {
                emailInp.value = ''
                passwordInp.value = ''
                return alert('Mail ən azı 3 simvol, parol ən azı 8 simvol uzunluğunda olmalıdır!')
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

function validation() {
    emailInp.style.border = '1px solid #ccc'
    passwordInp.style.border = '1px solid #ccc'
    if (emailInp.value.trim() == '') {
        emailInp.style.border = '1px solid red'
        emailInp.focus()
        alert('Xanaları doldurun!')
        return true
    }
    if (passwordInp.value.trim() == '') {
        passwordInp.style.border = '1px solid red'
        passwordInp.focus()
        alert('Xanaları doldurun!')
        return true
    }
}