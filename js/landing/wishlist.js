import { openFtrUl } from "./footer.js"

const content = document.getElementById('content');

const wishArr = JSON.parse(localStorage.getItem('wishList')) || []

function addToWishList(elm) {
    let yoxla = wishArr.find(item => item.id == elm.id)

    if (!yoxla) {
        wishArr.push(elm)
        localStorage.setItem('wishList', JSON.stringify(wishArr))
    }
    showFavourite()
}

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
                            <p class="text-orange-500 text-[15px]">${item.price} ₼</p>
                        </div>
                    </div>
                    <div class="py-2 px-4 hidden sm:table-cell font-medium">${item.name}</div>
                </div>
                <div class="flex gap-[15px]">
                    <div class="py-2 px-4 hidden sm:table-cell text-orange-500 font-semibold text-nowrap">${item.price} ₼</div>
                    <div class="py-2 px-4">
                        <div class="flex gap-2">
                            <button
                                class="bg-orange-400 hover:bg-orange-500 text-white px-3 py-1 rounded-full">🛒</button>
                            <button onclick="delFavouriteProd(${item.id})"
                                class="bg-white hover:bg-red-500 px-3 py-1 rounded-full transition">❌</button>
                        </div>
                    </div>
                </div>
            </div>`;
    });
}
// showFavourite()

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