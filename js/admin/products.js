import { addToProduct, delProduct, getAllProductsFetch, getCategoriesFetch, putProduct } from "../../services/api.js"

const openDiv = document.getElementById('openDiv')
const tblProduct = document.getElementById('tblProduct')
const prodName = document.getElementById('prodName')
const prodCat = document.getElementById('prodCat')
const prodSubCat = document.getElementById('prodSubCat')
const prodDisc = document.getElementById('prodDisc')
const prodPrice = document.getElementById('prodPrice')
const prodPop = document.getElementById('prodPop')
const prodPhoto = document.getElementById('prodPhoto')
const prodDesc = document.getElementById('prodDesc')
const prodMeta = document.getElementById('prodMeta')
const btnAdd = document.getElementById('btnAdd')
const delModal = document.getElementById('delModal')

const params = new URLSearchParams(location.search)
let count = 0
let page = 1
const catArr = []
let ID = null

getCategoriesFetch()
    .then(res => {
        handleSubCat()
        catArr.length = 0
        catArr.push(...res)
        prodCat.innerHTML = `<option value="0">Kateqoriya seçin:</option>`
        res.map(item => {
            prodCat.innerHTML += `<option class="capitalize" value="${item.id}">${item.categoryName}</option>`
        })
    })

window.handleSubCat = () => {
    prodSubCat.innerHTML = `<option value="0">Subkateqoriya seçin:</option>`
    catArr.find(item => item.id == prodCat.value)?.subcategory?.map(sub => {
        prodSubCat.innerHTML += `<option class="capitalize" value="${sub.id}">${sub.categoryName}</option>`
    })
}

window.addProduct = () => {
    if (validationObj()) return
    btnAdd.disabled = true
    addToProduct(getValues())
        .then(res => {
            if (!res.status) return
            else {
                alert('Məhsul əlavə edildi!')
                clearValues()
            }
        }).finally(_ => btnAdd.disabled = false)
}

function clickPage(arg) {
    page = arg || params.get('page')
    params.set('page', page)
    const newUrl = `${location.pathname}?${params.toString()}`
    history.pushState(null, "", newUrl)

    getAllProductsFetch(100, page)
        .then(res => {
            if (count == 0) {
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
                            <svg onclick='openCloseProduct(${JSON.stringify(item)})' stroke="currentColor" fill="none"
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
                            <svg onclick="openDelModal(${item.id})" stroke="currentColor" fill="currentColor"
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
clickPage()


function btnChangePage(arg) {
    pageBtn.innerHTML = ''
    let arrBtn = Array(arg).fill('').map((_, i) => i + 1)
    $('#pageBtn').pagination({
        dataSource: arrBtn,
        pageSize: 1,
        pageNumber: params.get('page'),
        callback: function (data, pagination) {
            loadPage()
            clickPage(pagination.pageNumber)
        }
    })
}

window.openCloseProduct = (elem) => {
    ID = elem?.subcategoryId ?? null
    btnAdd.innerHTML = elem ? 'Dəyişiklik et' : 'Əlavə et'

    openDiv.classList.toggle('!grid')
    document.body.classList.toggle('overflow-hidden')
    if (elem) {
        prodName.value = elem.name
        prodCat.value = elem.categoryId
        prodSubCat.innerHTML = ''
        catArr.find(item => elem.categoryId == item.id).subcategory?.map(sub => {
            prodSubCat.innerHTML += `<option value="${sub.id}" ${sub.id == ID ? 'selected' : ''}>${sub.categoryName}</option>`
        })
        prodPop.checked = elem.isTopSelling
        prodDisc.value = elem.discount
        prodPrice.value = elem.price
        prodPhoto.value = elem.img[0]
        prodDesc.value = elem.description
        prodMeta.value = elem.metadata
        btnAdd.onclick = () => changeProduct(elem)
    }
    else clearValues()
}

function changeProduct(arg) {
    if (validationObj()) return
    btnAdd.disabled = true
    putProduct(arg.id, getValues())
        .then(res => {
            if(res.id) alert('Dəyişiklik uğurlu oldu.')
            clickPage(page)
        })
        .finally(_ => {
            btnAdd.disabled = false
            openCloseProduct()
            btnAdd.onclick = addProduct
        })
}

window.openDelModal = (arg) => {
    ID = arg ?? null
    console.log(ID)
    delModal.classList.toggle('hidden')
}

window.sil = () => {
    delProduct(ID)
        .then(res => res.error ? alert('Server xətası developelə əlaqə saxlayın') : '')
    openDelModal()
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

function validationObj() {
    prodName.style.border = '1px solid #ccc'
    prodPrice.style.border = '1px solid #ccc'
    prodDisc.style.border = '1px solid #ccc'
    prodPhoto.style.border = '1px solid #ccc'
    prodCat.style.border = '1px solid #ccc'
    prodSubCat.style.border = '1px solid #ccc'
    prodDesc.style.border = '1px solid #ccc'
    prodMeta.style.border = '1px solid #ccc'
    if (prodName.value.trim() == '') {
        prodName.style.border = '1px solid red'
        prodName.focus()
        alert('Xanaları doldurun!')
        return true
    }
    if (prodCat.value == '0') {
        prodCat.style.border = '1px solid red'
        prodCat.focus()
        alert('Xanaları doldurun!')
        return true
    }
    if (prodSubCat.value == '0') {
        prodSubCat.style.border = '1px solid red'
        prodSubCat.focus()
        alert('Xanaları doldurun!')
        return true
    }
    if (prodDisc.value.trim() == '') {
        prodDisc.style.border = '1px solid red'
        prodDisc.focus()
        alert('Xanaları doldurun!')
        return true
    }
    if (prodPrice.value.trim() == '') {
        prodPrice.style.border = '1px solid red'
        prodPrice.focus()
        alert('Xanaları doldurun!')
        return true
    }
    if (prodPhoto.value.trim() == '') {
        prodPhoto.style.border = '1px solid red'
        prodPhoto.focus()
        alert('Xanaları doldurun!')
        return true
    }
}

function getValues() {
    return JSON.stringify({
        name: prodName.value,
        isTopSelling: prodPop.checked,
        price: prodPrice.value,
        discount: prodDisc.value,
        img: [
            prodPhoto.value
        ],
        categoryId: prodCat.value,
        subcategoryId: prodSubCat.value,
        description: prodDesc.value,
        metadata: prodMeta.value
    })
}

function clearValues() {
    prodName.value = ''
    prodCat.value = '0'
    prodSubCat.value = '0'
    prodPop.checked = false
    prodDisc.value = ''
    prodPrice.value = ''
    prodPhoto.value = ''
    prodDesc.value = ''
    prodMeta.value = ''
}