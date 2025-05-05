import { getSubCategoryId } from "../services/api.js"

const sideHiddenDiv = document.getElementById('sideHiddenDiv')
const sideLeftDiv = document.getElementById('sideLeftDiv')
const prodContent = document.getElementById('prodContent')
const limitSelect = document.getElementById('limitSelect')
const catName = document.getElementById('catName')
const subCatName = document.getElementById('subCatName')
const pageBtn = document.getElementById('pageBtn')

const params = new URLSearchParams(location.search)
const myCatId = params.get('id')

let page = params.get('page') || 1
let limit = 12

window.clickPage = (arg, self) => {
    productLoad()
    params.set('page', arg)
    const newUrl = `${location.pathname}?${params.toString()}`
    history.pushState(null, "", newUrl)
    page = arg
    showCatProdct()
}

window.changeLimit = () => {
    productLoad()
    limit = limitSelect.value
    showCatProdct()
}

window.showCatProdct = () => {
    getSubCategoryId(myCatId, limit, page)
        .then(data => {
            btnChangePage(data.totalPages)
            prodContent.innerHTML = ''
            data.products.forEach(item => {
                prodContent.innerHTML += `
                    <article class="relative w-full rounded-[8px] p-[0_10px_17px] bg-white">
                        <img src="${item.img[0]}" alt="photo" class="!w-[255px] mx-auto cursor-pointer" />
                        <p class="uppercase text-[10px] h-[30px] mt-[10px] font-[600] text-center mb-[10px] w-[73%] mx-auto">
                            <a href="#" class="cursor-pointer hover:text-[#ff8300]">${item.name.length > 30 ? item.name.slice(0, 30) + '...' : item.name}</a>
                        </p>
                        <p class="text-[22px] font-[700] font-sans text-center mb-[10px]">${item.price}₼</p>
                        <div class="flex justify-center items-center">
                            <button class="text-[#ff8300] p-[6px_12px] text-[25px]">‒</button>
                            <span class="text-[12px] font-bold px-3">1</span>
                            <button class="text-[#ff8300] p-[6px_12px] text-[25px]">+</button>
                        </div>
                        <div class="flex justify-center items-center gap-2 flex-wrap">
                            <button class="bg-[#ff8300] rounded-full px-5 text-[15px] text-white h-[30px] transition duration-300 hover:bg-[#de7200]">Səbətə at</button>
                            <button class="w-[32px] h-[32px] text-[#ff8300] rounded-full hover:bg-[#de7200] hover:text-white transition-all duration-300">
                                <i class="fa-regular fa-heart"></i>
                            </button>
                            <button class="w-[32px] h-[32px] text-[#ff8300] rounded-[6px] hover:bg-[#de7200] hover:text-white transition-all duration-300">
                                <i class="fa-solid fa-retweet"></i>
                            </button>
                        </div>
                    </article>`;
            })
        })
}
showCatProdct()

window.btnChangePage = (arg) => {
    pageBtn.innerHTML = ''

    Array(arg).fill('').map((_, i) => {
        pageBtn.innerHTML += `
            <button onclick="clickPage(${i + 1})" class="button border w-[28px] h-[28px] text-[#666] bg-white hover:border-[#ff8230] hover:bg-[#ff8230] hover:text-white">${i + 1}</button>
        `
    })
}

window.productLoad = () => {
    prodContent.innerHTML = ''
    Array(limit).fill('').map(_ => {
        prodContent.innerHTML += `
            <article class="relative w-full animate-pulse rounded-[8px] p-[0_10px_17px] bg-white">
                <img src="https://neptun.az/image/cache/logo-270x270.png?v=9" alt="photo" class="!w-[255px] mx-auto cursor-pointer" />
                <p class="uppercase text-[10px] h-[30px] mt-[10px] font-[600] text-center mb-[10px] w-[73%] mx-auto">
                    <a href="#" class="cursor-pointer hover:text-[#ff8300]">...</a>
                </p>
                <p class="text-[22px] font-[700] font-sans text-center mb-[10px]">99.99₼</p>
                <div class="flex justify-center items-center">
                    <button class="text-[#ff8300] p-[6px_12px] text-[25px]">‒</button>
                    <span class="text-[12px] font-bold px-3">99.99</span>
                    <button class="text-[#ff8300] p-[6px_12px] text-[25px]">+</button>
                </div>
                <div class="flex justify-center items-center gap-2 flex-wrap">
                    <button class="bg-[#ff8300] rounded-full px-5 text-[15px] text-white h-[30px] transition duration-300 hover:bg-[#de7200]">Səbətə at</button>
                    <button class="w-[32px] h-[32px] text-[#ff8300] rounded-full hover:bg-[#de7200] hover:text-white transition-all duration-300">
                        <i class="fa-regular fa-heart"></i>
                    </button>
                    <button class="w-[32px] h-[32px] text-[#ff8300] rounded-[6px] hover:bg-[#de7200] hover:text-white transition-all duration-300">
                        <i class="fa-solid fa-retweet"></i>
                    </button>
                </div>
            </article>`;
    })
}
productLoad()

window.sideFiltr = () => {
    sideHiddenDiv.classList.toggle('hidden')
    sideLeftDiv.classList.toggle('!left-0')
    document.body.classList.toggle('overflow-y-hidden')
}

window.prodSideFiltr = (div, i) => {
    const filtrDiv = document.getElementById(div)
    const filtrIcon = document.getElementById(i)
    filtrDiv.classList.toggle('hidden')
    filtrIcon.classList.toggle('rotate-[180deg]')
}