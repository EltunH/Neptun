import { getAllProductsFetch } from "../../services/api.js"

const openDiv = document.getElementById('openDiv')
const tblProduct = document.getElementById('tblProduct')

let count = 0

window.openCloseProduct = (e) => {
    e?.preventDefault()
    openDiv.classList.toggle('!grid')
}

function clickPage(page = 1) {
    getAllProductsFetch(100, page)
    .then(res => {
        if(count == 0) {
            btnChangePage(res.totalPages)
            count++
        }
        tblProduct.innerHTML = ''
        res.products.map(item => {
            tblProduct.innerHTML += `
                <tr class="hover:bg-gray-200">
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div class="flex items-center">
                            <div class="h-10 w-10 flex-shrink-0"><img
                                    class="h-10 w-10 rounded-full"
                                    src="${item.img[0]}"
                                    alt="${item.name}"></div>
                            <div class="ml-4">
                                <div class="font-medium text-gray-900">
                                    ${item.name}
                                </div>
                            </div>
                        </div>
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm">
                        <div class="text-red-600 font-semibold">${item.discount} %</div>
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"><span
                            class="inline-flex px-2">${item.totalPrice.toFixed(2)} ₼</span></td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div class="flex gap-2">
                            <svg stroke="currentColor" fill="none"
                                stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
                                stroke-linejoin="round"
                                class="text-[1.1em] text-[blue] cursor-pointer" height="1em"
                                width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7">
                                </path>
                                <path
                                    d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z">
                                </path>
                            </svg>
                            <svg stroke="currentColor" fill="currentColor"
                                stroke-width="0" viewBox="0 0 448 512"
                                class="text-[1.1em] text-[red] cursor-pointer" height="1em"
                                width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z">
                                </path>
                            </svg>
                        </div>
                    </td>
                </tr>`;
        })
    })
}
clickPage(1)

function btnChangePage(arg) {
    pageBtn.innerHTML = ''
    let arrBtn = Array(arg).fill('').map((_, i) => i + 1)
    $('#pageBtn').pagination({
        dataSource: arrBtn,
        pageSize: 1,
        pageNumber: 1,
        callback: function (data, pagination) {
            loadPage()
            clickPage(pagination.pageNumber)
        }
    })
}

function loadPage() {
    tblProduct.innerHTML = ''
    Array(100).fill('').map(_ => {
        tblProduct.innerHTML += `
                <tr class="hover:bg-gray-200">
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div class="flex items-center">
                            <div class="h-10 w-10 flex-shrink-0"><img
                                    class="h-10 w-10 rounded-full"
                                    src="https://neptun.az/image/cache/logo-270x270.png?v=9"
                                    alt="photo"></div>
                            <div class="ml-4">
                                <div class="font-medium text-gray-900">
                                    ...
                                </div>
                            </div>
                        </div>
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm">
                        <div class="text-red-600 font-semibold">99.99 %</div>
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"><span
                            class="inline-flex px-2">99.99 ₼</span></td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div class="flex gap-2">
                            <svg stroke="currentColor" fill="none"
                                stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
                                stroke-linejoin="round"
                                class="text-[1.1em] text-[blue] cursor-pointer" height="1em"
                                width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7">
                                </path>
                                <path
                                    d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z">
                                </path>
                            </svg>
                            <svg stroke="currentColor" fill="currentColor"
                                stroke-width="0" viewBox="0 0 448 512"
                                class="text-[1.1em] text-[red] cursor-pointer" height="1em"
                                width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z">
                                </path>
                            </svg>
                        </div>
                    </td>
                </tr>`;
    })
}
loadPage()