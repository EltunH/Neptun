const sideHiddenDiv = document.getElementById('sideHiddenDiv')
const sideLeftDiv = document.getElementById('sideLeftDiv')

function sideFiltr() {
    sideHiddenDiv.classList.toggle('hidden')
    sideLeftDiv.classList.toggle('!left-0')
    document.body.classList.toggle('overflow-y-hidden')
}

function prodSideFiltr(div, i) {
    const filtrDiv = document.getElementById(div)
    const filtrIcon = document.getElementById(i)
    filtrDiv.classList.toggle('hidden')
    filtrIcon.classList.toggle('rotate-[180deg]')
}