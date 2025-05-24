import { register } from "../../services/api.js"

const btnReg = document.getElementById('btnReg')
const emailInp = document.getElementById('emailInp')
const passwordInp = document.getElementById('passwordInp')


window.registration = () => {
    if (validation()) return
    btnReg.disabled = true

    const obj = JSON.stringify({
        login: emailInp.value,
        password: passwordInp.value
    })

    register(obj)
        .then(res => {
            if (!res.error) location.href = '/auth/login.htm'
            else alert(res.error)
            btnReg.disabled = false
        })
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