import { openFtrUl } from "./footer.js";

const news = document.getElementById('news')
const contentBasket = document.getElementById('contentBasket')
const totalAmount = document.getElementById('totalAmount')
const marketCount = document.getElementById('marketCount')

const basket = JSON.parse(localStorage.getItem('basket')) || []

marketCount.innerHTML = basket.length
let newsTimer;

function addToBasket(elm, prodCount = 1) {
    let yoxla = basket.find(item => item.id == elm.id)
    if (!yoxla) basket.push({ ...elm, count: prodCount })
    else yoxla.count += prodCount
    localStorage.setItem('basket', JSON.stringify(basket))

    news.innerHTML = `
        <div class="w-[250px] rounded-[15px] bg-white text-[#333] p-[10px] my-2 min-h-[40px]" style="box-shadow: 0 1px 0 0 rgba(0, 0, 0, .1), 0 0 0 1px rgba(0, 0, 0, .08), 0 1px 5px 0 rgba(0, 0, 0, .2);">
                <div class="flex justify-between items-center mb-[10px]">
                    <p class="text-[11px] font-bold">Məhsul səbətə əlavə olundu</p>
                    <i onclick="closenews()" class="fa-solid fa-circle-xmark text-[20px] text-[#ff8230] cursor-pointer"></i>
                </div>
                <div class="text-[12px] flex items-center">
                    <img src="${elm.img[0]}" class="object-cover w-[50px] h-[50px] mr-[15px]" alt="photo" />
                    <p><span>${elm.name}</span> məhsul səbətinizə əlavə edildi</p>
                </div>
            </div>`;

    if (newsTimer) clearTimeout(newsTimer);

    news.style.right = '10px'
    newsTimer = setTimeout(() => { news.style.right = '-100%' }, 4000)
    marketCount.innerHTML = basket.length
}

function showBaket() {
    if (contentBasket) {
        contentBasket.innerHTML = ''
        basket.map(item => {
            contentBasket.innerHTML += `
            <tr class="border">
                <td class="w-32 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                    <a href="/product/955"><img
                            src="${item.img}"
                            alt="${item.name}"
                            class="md:w-24 w-20 h-[10vh] rounded-md object-cover"></a>
                    <dl class="font-normal lg:hidden">
                        <dd class="mt-1 text-gray-700">${item.name}</dd>
                        <dd class="mt-1 truncate text-gray-500 sm:hidden">2.69 ₼</dd>
                    </dl>
                </td>
                <td class="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">${item.name}</td>
                <td class="px-3 py-4 w-fit text-center text-sm text-gray-500 sm:table-cell">
                    <div class="flex items-center">
                        <svg onclick='changeCountBasket(-1, ${JSON.stringify(item)})' stroke="currentColor" fill="currentColor"
                            stroke-width="0" viewBox="0 0 1024 1024"
                            class="text-[#ff8300] cursor-pointer active:scale-105 text-[27px] block"
                            height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm192 472c0 4.4-3.6 8-8 8H328c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h368c4.4 0 8 3.6 8 8v48z">
                            </path>
                        </svg>
                        <span class="px-2">${item.count} ədəd</span>
                        <svg onclick='changeCountBasket(1, ${JSON.stringify(item)})' stroke="currentColor"
                            fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024"
                            class="text-[#ff8300] active:scale-105 cursor-pointer text-[27px] block"
                            height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm192 472c0 4.4-3.6 8-8 8H544v152c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V544H328c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h152V328c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v152h152c4.4 0 8 3.6 8 8v48z">
                            </path>
                        </svg>
                    </div>
                </td>
                <td class="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">${(item.price - (item.price * item.discount / 100)).toFixed(2)} ₼</td>
                <td class="px-3 py-4 truncate font-semibold text-sm text-gray-500">${((item.price - (item.price * item.discount / 100)) * item.count).toFixed(2)} ₼</td>
                <td class="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <p onclick=delBasket(${item.id}) class="hover:text-red-600 text-[1.2em] cursor-pointer">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0"
                            viewBox="0 0 448 512" height="1em" width="1em"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z">
                            </path>
                        </svg>
                    </p>
                </td>
            </tr>`;
        })

        totalAmount.innerHTML = basket.reduce((sum, item) => sum + +((item.price - (item.price * item.discount / 100)) * item.count), 0).toFixed(2)
    }
}
showBaket()

window.changeCountBasket = (x, elem) => {
    basket.find(item => {
        if (item.id == elem.id) {
            item.count += x
            if (item.count == 0) delBasket(item.id)
        }
    })
    localStorage.setItem('basket', JSON.stringify(basket))
    showBaket()
}

window.delBasket = (id) => {
    let yoxla = basket.filter(item => item.id !== id)
    basket.length = 0
    basket.push(...yoxla)
    localStorage.setItem('basket', JSON.stringify(basket))
    showBaket()
    marketCount.innerHTML = basket.length
}

window.closenews = () => news.style.right = '-150%'

window.openFtr = () => openFtrUl()

export {
    addToBasket,
    basket,
    newsTimer
}