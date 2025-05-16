import { login } from "../../services/api.js"

const emailInp = document.getElementById('emailInp')
const passwordInp = document.getElementById('passwordInp')

window.girisEt = () => {
    const obj = JSON.stringify({
        login: emailInp.value,
        password: passwordInp.value
    })
    login(obj)
        .then(res => console.log(res))
}