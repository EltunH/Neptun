const changeSp = document.getElementById("changeSp");
const openUlDiv = document.getElementById("openUlDiv");

let flag = true;

export function openFtrUl() {
    openUlDiv.classList.toggle('max-md:max-h-[5000px!important]');
    changeSp.innerHTML = flag ? 'Bağla' : 'Daha çox';
    flag = !flag;
}