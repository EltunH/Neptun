import { getSubCategoryId } from "../../services/api.js"
import { addToBasket } from "./basket.js"
import { openFtrUl } from "./footer.js"
import { addToWishList } from "./wishlist.js"

const sideHiddenDiv = document.getElementById('sideHiddenDiv')
const sideLeftDiv = document.getElementById('sideLeftDiv')
const prodContent = document.getElementById('prodContent')
const limitSelect = document.getElementById('limitSelect')
const pageBtn = document.getElementById('pageBtn')
const priceInp = document.getElementById('priceInp')

const data = []
const copyData = []
let minMax = []

const params = new URLSearchParams(location.search)
const myCatId = params.get('id')

let page = params.get('page') || 1
let limit = params.get('limit') || 12
limitSelect.value = limit

let countPage = 0
function clickPage(arg) {
    productLoad()
    if (countPage !== 0) {
        params.set('page', arg)
        params.set('limit', limit)
        const newUrl = `${location.pathname}?${params.toString()}`
        history.pushState(null, "", newUrl)
        page = arg
    }
    countPage++
    getCatProdct()
}

window.changeLimit = () => {
    productLoad()
    limit = +limitSelect.value
    getSubCategoryId(params.get('id'), limit, page)
        .then(data => btnChangePage(data.totalPages))
    getCatProdct()
}

window.btnChangePage = (arg) => {
    pageBtn.innerHTML = ''
    let arrBtn = Array(arg).fill('').map((_, i) => i + 1)
    $('#pageBtn').pagination({
        dataSource: arrBtn,
        pageSize: 1,
        pageNumber: page,
        callback: function (data, pagination) {
            clickPage(pagination.pageNumber)
        }
    })
}

function getCatProdct(arg) {
    getSubCategoryId(myCatId, limit, page)
        .then(res => {
            data.length = copyData.length = 0
            data.push(...res.products)
            copyData.push(...res.products)

            filtrization()
            showCatProdct()
            if (arg) {
                btnChangePage(res.totalPages)
            }
        })
}
getCatProdct(true)

function showCatProdct() {
    prodContent.innerHTML = ''
    data.forEach(item => {
        prodContent.innerHTML += `
            <article class="relative w-full rounded-[8px] p-[0_10px_17px] bg-white">
                <a href="details.htm?id=${item.id}">
                    <img src="${item.img[0]}" alt="photo" class="!w-[255px] mx-auto cursor-pointer" />
                </a>
                <p class="uppercase text-[10px] h-[30px] mt-[10px] font-[600] text-center mb-[10px] w-[73%] mx-auto">
                    <a href="details.htm?id=${item.id}" class="cursor-pointer hover:text-[#ff8300]">${item.name.length > 30 ? item.name.slice(0, 30) + '...' : item.name}</a>
                </p>
                <p class="text-[22px] font-[700] font-sans text-center mb-[10px]">${item.price}₼</p>
                <div class="flex justify-center items-center">
                    <button onclick='incDec(-1, ${JSON.stringify(item)})' class="text-[#ff8300] p-[6px_12px] text-[25px]">‒</button>
                    <span id="xana${item.id}" class="text-[12px] font-bold px-3">1</span>
                    <button onclick='incDec(1, ${JSON.stringify(item)})' class="text-[#ff8300] p-[6px_12px] text-[25px]">+</button>
                </div>
                <div class="flex justify-center items-center gap-2 flex-wrap">
                    <button id="btn${item.id}" onclick='sebeteAt(${JSON.stringify(item)})' class="bg-[#ff8300] rounded-full px-5 text-[15px] text-white h-[30px] transition duration-300 hover:bg-[#de7200]">Səbətə at</button>
                    <button onclick='favourite(${JSON.stringify(item)})' class="w-[32px] h-[32px] text-[#ff8300] rounded-full hover:bg-[#de7200] hover:text-white transition-all duration-300">
                        <i class="fa-regular fa-heart"></i>
                    </button>
                    <button class="w-[32px] h-[32px] text-[#ff8300] rounded-[6px] hover:bg-[#de7200] hover:text-white transition-all duration-300">
                        <i class="fa-solid fa-retweet"></i>
                    </button>
                </div>
            </article>`;
    })
}

window.sebeteAt = (arg) => addToBasket(arg)

window.incDec = (x, data) => {
    const elm = document.getElementById(`xana${data.id}`)
    let count = +elm.innerHTML
    if (count + x >= 1) {
        count += x
        elm.innerHTML = count

        const btnCount = document.getElementById(`btn${data.id}`)
        btnCount.onclick = () => {
            addToBasket(data, count)
        }
    }
}

window.favourite = (elm) => addToWishList(elm)

function productLoad() {
    prodContent.innerHTML = ''
    Array(+limit).fill('').map(_ => {
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

window.openFtr = () => openFtrUl()

window.filtrization = () => {


    let sortArr = copyData.sort((a, b) => a.price - b.price)
    minMax[0] = sortArr[0].price
    minMax[1] = sortArr.at(-1).price
    $(() => {
        $("#slider-range").slider({
            range: true,
            step: 0.01,
            min: minMax[0],
            max: minMax[1],
            values: minMax,
            slide: function (event, ui) {
                data.length = 0
                data.push(...sortArr.filter(item => item.price >= ui.values[0] && item.price <= ui.values[1]))

                $('#minSp').html(`${ui.values[0]} ₼`)
                $('#maxSp').html(`${ui.values[1]} ₼`)
                showCatProdct()
            }
        });
        $('#minSp').html(`${minMax[0]} ₼`)
        $('#maxSp').html(`${minMax[1]} ₼`)
    });
}


