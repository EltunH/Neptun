import { getCategoriesFetch, getSearch } from "../../services/api.js"

const openCloseTop = document.getElementById('openCloseTop')
const openCloseBottom = document.getElementById('openCloseBottom')
const openCloseBottomDiv = document.getElementById('openCloseBottomDiv')
const searchInp = document.getElementById('searchInp')
const searchDiv = document.getElementById('searchDiv')
const searchBtn = document.getElementById('searchBtn')

const cache = JSON.parse(localStorage.getItem("categoryArr"))
const categoryArr = cache || []
const menu = document.getElementById('menu')

window.openSidebarTop = () => {
    openCloseBottom.style.left = '-100%';
    openCloseTop.style.left = openCloseTop.style.left === '0%' ? '-100%' : '0%';
    openCloseTop.style.left == '0%' || openCloseBottom.style.left === '0%' ? document.body.classList.add('overflow-hidden') : document.body.classList.remove('overflow-hidden')
}

window.openSidebarBottom = () => {
    openCloseTop.style.left = '-100%';
    openCloseBottom.style.left = openCloseBottom.style.left === '0%' ? '-100%' : '0%';
    openCloseTop.style.left == '0%' || openCloseBottom.style.left === '0%' ? document.body.classList.add('overflow-hidden') : document.body.classList.remove('overflow-hidden')
}

const icons = [
    'https://neptun.az/image/catalog/icon-menu/Meyv%C9%99-v%C9%99-t%C9%99r%C9%99v%C9%99z.svg',
    'https://neptun.az/image/catalog/icon-menu/%C9%99t-v%C9%99-toyuq%20m%C9%99hsullar%C4%B1.svg',
    'https://neptun.az/image/catalog/icon-menu/Qastronom.svg',
    'https://neptun.az/image/catalog/icon-menu/%C9%99rzaq%20m%C9%99hsullar%C4%B1.svg',
    'https://neptun.az/image/catalog/icon-menu/%C5%9Eirniyyat-%C3%A7ay-v%C9%99%20q%C9%99hv%C9%99.svg',
    'https://neptun.az/image/catalog/icon-menu/%C4%B0%C3%A7kil%C9%99r.svg',
    'https://neptun.az/image/catalog/icon-menu/S%C3%BCd-m%C9%99hsullar%C4%B1.svg',
    'https://neptun.az/image/catalog/icon-menu/U%C5%9Faq-m%C9%99hsullar%C4%B1.svg',
    'https://neptun.az/image/catalog/icon-menu/Yuyucu-vasit%C9%99l%C9%99r.svg',
    'https://neptun.az/image/catalog/icon-menu/Kosmetik-v%C9%99-gigiyenik.svg',
    'https://neptun.az/image/catalog/icon-menu/M%C9%99i%C5%9F%C9%99t-m%C9%99tb%C9%99x-v%C9%99-tekstil.svg',
    'https://neptun.az/image/catalog/icon-menu/Konselyariya.svg',
    'https://neptun.az/image/catalog/icon-menu/Heyvan-yeml%C9%99ri.svg',
    'https://neptun.az/image/catalog/icon-menu/neptun-icon.svg',
    'https://neptun.az/image/catalog/icon-menu/neptun-icon.svg',
    'https://neptun.az/image/catalog/icon-menu/elektronika-v%C9%99-mebel.svg',
]

if (!cache) {
    getCategoriesFetch().then(data => {
        categoryArr.length = 0;
        categoryArr.push(...data)
        localStorage.setItem("categoryArr", JSON.stringify(data))
        handleCategory()
    })
}

function handleCategory() {
    menu.innerHTML = ''
    openCloseBottomDiv.innerHTML = ''

    if (categoryArr.length == 0) {
        Array(15).fill("").forEach(item => {
            menu.innerHTML += `
                                <div class="flex items-center justify-center space-x-2">
                                    <div class="w-[10px] h-[10px] mb-10 rounded-full animate-pulse bg-[#ff8230]"></div>
                                    <div class="w-[10px] h-[10px] mb-10 rounded-full animate-pulse bg-[#ff8230]"></div>
                                    <div class="w-[10px] h-[10px] mb-10 rounded-full animate-pulse bg-[#ff8230]"></div>
                                </div>
                                `
        })
    } else {
        categoryArr.forEach((item, i) => {
            menu.innerHTML += `
                <li class="group relative cursor-pointer px-[13px] hover:bg-orange-200 transition-all">
                        <div class="border-b flex py-[9px] items-center justify-start">
                            <img class="max-w-full w-[16px] mlg:w-[21px]" src="${icons[i]}" alt="icons" />
                            <div class="flex items-center justify-between gap-2 px-4 w-full">
                                <span class="text-[9px] mlg:text-[11px] font-bold cursor-pointer">${item.categoryName}</span>
                            </div>
                            ${item.subcategory.length > 0 ? '<i class="fa-solid text-[10px] fa-chevron-right"></i>' : ""}
                        </div>
                        
                        ${item.subcategory.length > 0 ?
                    `<div class="scrollBar absolute left-[100%] top-0 border-l-orange-500 flex flex-col border-l-2 w-[160px] h-0  overflow-hidden bg-white shadow-2xl text-[11px] text-black opacity-0 translate-x-[-10px] transition-all duration-300 ease-in-out group-hover:h-[200px] group-hover:overflow-y-scroll group-hover:p-2 group-hover:opacity-100 group-hover:translate-x-0">
                            ${item.subcategory.map(sub => `<a href="/pages/category.htm?id=${sub.id}&page=1&limit=12" class="block px-2 py-1 text-[14px] hover:text-[#ff8230] capitalize hover:underline">${sub.categoryName}</a>`).join("")}
                        </div>`: ''}
                </li>`;
            openCloseBottomDiv.innerHTML += `
                <div class="group relative cursor-pointer px-[13px] hover:bg-orange-200 transition-all">
                        <div class="border-b flex py-[9px] items-center justify-start">
                            <img class="max-w-full w-[21px]" src="${icons[i]}" alt="icons" />
                            <div class="flex items-center justify-between gap-2 px-4 w-full">
                                <span class="text-[13px] cursor-pointer">${item.categoryName}</span>
                            </div>
                        </div>
                </div>`;
        })
    }
}
handleCategory()

window.searchProduct = () => {
    let name = searchInp.value
    if (name.trim().length > 1) {
        searchDiv.classList.remove('hidden')
        getSearch(name).then(res => {
            showSearch(res.products.slice(0, 5))
        })
    }
    if (name.trim().length == 0) searchDiv.classList.add('hidden')
}

function showSearch(data) {
    searchDiv.innerHTML = ''
    if (data.length) {
        data.slice(0, 5).map(item => {
            searchDiv.innerHTML += `
                <a class="flex gap-5 items-center p-3 border-b w-full bg-gray-50 hover:bg-gray-200 transition-all"
                    href="/pages/details.htm?id=${item.id}">
                    <img src="${item.img[0]}" class="w-16 h-16 object-cover rounded-md" alt="${item.name}">
                    <div>
                        <h3 class="text-sm hover:text-green-700 capitalize text-md transition-all">
                            ${item.name}</h3>
                        <p class="text-sm font-bold text-green-900">${item.totalPrice.toFixed(2)} ₼</p>
                    </div>
                </a>`
        })
    }
    else searchDiv.innerHTML = '<p class="py-5 px-2 text-center text-red-600">Məhsul tapılmadı</p>'
}

window.goSearchPage = (e) => {
    let name = searchInp.value
    if((e.keyCode == 13 || !e.keyCode) && name.trim().length > 1) location.href = `/pages/search.htm?name=${name}`
}

document.body.addEventListener("click", function (event) {
    if (!searchInp.contains(event.target) && !searchBtn.contains(event.target)) {
        searchDiv.classList.add('hidden')
    }
})
