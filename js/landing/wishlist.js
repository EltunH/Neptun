import { addToBasket } from "./basket.js";
import { openFtrUl } from "./footer.js"

const content = document.getElementById('content');

const wishArr = JSON.parse(localStorage.getItem('wishList')) || []

let newsTimer

function addToWishList(elm) {
    let yoxla = wishArr.find(item => item.id == elm.id)

    if (!yoxla) {
        wishArr.push(elm)
        localStorage.setItem('wishList', JSON.stringify(wishArr))
    }

    news.innerHTML = `
        <div class="w-[250px] rounded-[15px] bg-white text-[#333] p-[10px] my-2 min-h-[40px]" style="box-shadow: 0 1px 0 0 rgba(0, 0, 0, .1), 0 0 0 1px rgba(0, 0, 0, .08), 0 1px 5px 0 rgba(0, 0, 0, .2);">
                <div class="flex justify-between items-center mb-[10px]">
                    <p class="text-[11px] font-bold">Məhsul arzu siyahısına əlavə olundu</p>
                    <i onclick="closenews()" class="fa-solid fa-circle-xmark text-[20px] text-[#ff8230] cursor-pointer"></i>
                </div>
                <div class="text-[12px] flex items-center">
                    <img src="${elm.img[0]}" class="object-cover w-[50px] h-[50px] mr-[15px]" alt="photo" />
                    <p><span>${elm.name}</span> arzu siyahısına əlavə edildi</p>
                </div>
            </div>`;

    if (newsTimer) clearTimeout(newsTimer);

    news.style.right = '10px'
    newsTimer = setTimeout(() => { news.style.right = '-100%' }, 4000)
}

window.closenews = () => news.style.right = '-150%'

function showFavourite() {
    content.innerHTML = ''
    wishArr.forEach(item => {
        content.innerHTML += `
            <div
                class="w-full hover:bg-gray-100 flex flex-row lg:items-center justify-between bg-gray-50 items-center max-mini:flex-col lg:justify-between sm:flex-row mb-4 sm:mb-0 bg-white-300 sm:bg-gray-50 sm:hover::bg-gary-100 rounded-lg sm:rounded-none shadow-sm sm:shadow-none p-4 sm:p-0 my-2">
                <div class="flex items-center">
                    <div class="py-2 px-0 sm:px-4 max-mini:flex-col flex items-center gap-4">
                        <img alt="${item.name}"
                            class="w-20 max-mini:w-[150px] object-cover rounded-md"
                            src="${item.img[0]}">
                        <div class="sm:hidden max-mini:text-center">
                            <p class="font-semibold">${item.name}</p>
                            <p class="text-orange-500 text-[15px]">${(item.price -  (item.price * item.discount / 100)).toFixed(2)} ₼</p>
                        </div>
                    </div>
                    <div class="py-2 px-4 hidden sm:table-cell font-medium">${item.name}</div>
                </div>
                <div class="flex gap-[15px]">
                    <div class="py-2 px-4 hidden sm:table-cell text-orange-500 font-semibold text-nowrap">${(item.price -  (item.price * item.discount / 100)).toFixed(2)} ₼</div>
                    <div class="py-2 px-4">
                        <div class="flex gap-2">
                            <button onclick='fromToBasket(${JSON.stringify(item,)})'
                                class="bg-orange-400 hover:bg-orange-500 text-white px-3 py-1 rounded-full">🛒</button>
                            <button onclick="delFavouriteProd(${item.id})"
                                class="bg-white hover:bg-red-500 px-3 py-1 rounded-full transition">❌</button>
                        </div>
                    </div>
                </div>
            </div>`;
    });
}
if(content) showFavourite() 

window.fromToBasket = (elm) => {
    addToBasket(elm)
}

window.delAllFavourites = () => {
    wishArr.length = 0
    localStorage.removeItem('wishList')
    showFavourite()
}

window.delFavouriteProd = (id) => {
    let newArr = wishArr.filter(item => item.id !== id)
    wishArr.length = 0
    wishArr.push(...newArr)
    localStorage.setItem('wishList', JSON.stringify(wishArr))
    showFavourite()
}




window.openFtr = () => openFtrUl()

export {
    addToWishList,
    wishArr
}