import { verifyAdmin } from "../auth/verify.js";

verifyAdmin()

const openDivSide = document.getElementById('openDivSide')
const leftDiv = document.getElementById('leftDiv')

window.openCloseSide = () => {
    document.body.classList.toggle('overflow-y-hidden')
    openDivSide.classList.toggle('hidden')
    leftDiv.classList.toggle('left-[0]')
}