import { getProductId } from "../services/api.js";

const smallMenu = document.getElementById('smallMenu')
const detailsContent = document.getElementById('detailsContent')

const paramDetail = new URLSearchParams(location.search)
const detailId = paramDetail.get('id')
// const detailPage = paramDetail.get('page')

getProductId(detailId)
    .then(data => showDetails(data))


function showDetails(data) {
    smallMenu.innerHTML = `
        <a href="/index.htm" class="cursor-pointer">Ana səhifə</a>
        <span>></span>
        <a href="#" class="cursor-pointer">${data.category.categoryName}</a>
        <span>></span>
        <a href="/pages/product.htm?id=${data.subcategory.id}&page=1&limit=12" class="cursor-pointer">${data.subcategory.categoryName.charAt(0).toUpperCase() + data.subcategory.categoryName.slice(1)}</a>
        <span>></span>
        <span href="#">${data.name}</span>`

    detailsContent.innerHTML = `
        <div>
            <img src="${data.img[0]}" alt="photo" class="w-full md:w-[379px] mlg:w-[470px]" />
        </div>
        <div class="max-md:py-3">
            <h1 class="text-[18px] font-bold capitalize mb-[7px]">${data.name}</h1>
            <div class="flex gap-x-1 text-[#ff8230] text-[22px]">
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
            </div>
            <p class="text-[11px] mt-5 mb-[28px]">
                <span class="text-[#7d7d7d] cursor-pointer hover:text-[#ff8230]">0 şərh</span> 
                |
                <span class="text-[#7d7d7d] cursor-pointer hover:text-[#ff8230]">Şərh yaz</span>
            </p>
            <div class="text-[#525252] text-[12px]">
                <span class="w-[129px] inline-block">Model:</span>
                <span>079552</span>
            </div>
            <div class="text-[#525252] text-[12px] pt-[10px]">
                <span class="w-[129px] inline-block">Mövcudluq:</span>
                <i class="fa-solid fa-square-check"></i>
                <span>Anbarda</span>
            </div>
            <p class="mt-[22px] mb-[15px] text-[#ff8230] text-[31px] font-bold">${data.price}₼</p>
            <div class="">
                <button class="text-[#ff8300] p-[6px_12px] text-[25px]">‒</button>
                <span class="text-[12px] font-bold px-3">1</span>
                <button class="text-[#ff8300] p-[6px_12px] text-[25px]">+</button>
            </div>
            <div class="flex items-center gap-2 flex-wrap">
                <button class="bg-[#ff8300] rounded-full px-5 text-[15px] text-white h-[30px] transition duration-300 hover:bg-[#de7200]">Səbətə at</button>
                <button class="w-[32px] h-[32px] text-[#ff8300] rounded-full hover:bg-[#de7200] hover:text-white transition-all duration-300">
                    <i class="fa-regular fa-heart"></i>
                </button>
                <button class="w-[32px] h-[32px] text-[#ff8300] rounded-[6px] hover:bg-[#de7200] hover:text-white transition-all duration-300">
                    <i class="fa-solid fa-retweet"></i>
                </button>
            </div>
        </div>`;
}

function detailsLoader() {
    detailsContent.innerHTML = `
        <div>
            <img src="https://neptun.az/image/cache/logo-270x270.png?v=9" alt="photo" class="w-full md:w-[379px] mlg:w-[470px]" />
        </div>
        <div class="max-md:py-3">
            <h1 class="text-[18px] font-bold capitalize mb-[7px]">...</h1>
            <div class="flex gap-x-1 text-[#ff8230] text-[22px]">
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
            </div>
            <p class="text-[11px] mt-5 mb-[28px]">
                <span class="text-[#7d7d7d] cursor-pointer hover:text-[#ff8230]">0 şərh</span> 
                |
                <span class="text-[#7d7d7d] cursor-pointer hover:text-[#ff8230]">Şərh yaz</span>
            </p>
            <div class="text-[#525252] text-[12px]">
                <span class="w-[129px] inline-block">Model:</span>
                <span>079552</span>
            </div>
            <div class="text-[#525252] text-[12px] pt-[10px]">
                <span class="w-[129px] inline-block">Mövcudluq:</span>
                <i class="fa-solid fa-square-check"></i>
                <span>Anbarda</span>
            </div>
            <p class="mt-[22px] mb-[15px] text-[#ff8230] text-[31px] font-bold">99.99₼</p>
            <div class="">
                <button class="text-[#ff8300] p-[6px_12px] text-[25px]">‒</button>
                <span class="text-[12px] font-bold px-3">99.99</span>
                <button class="text-[#ff8300] p-[6px_12px] text-[25px]">+</button>
            </div>
            <div class="flex items-center gap-2 flex-wrap">
                <button class="bg-[#ff8300] rounded-full px-5 text-[15px] text-white h-[30px] transition duration-300 hover:bg-[#de7200]">Səbətə at</button>
                <button class="w-[32px] h-[32px] text-[#ff8300] rounded-full hover:bg-[#de7200] hover:text-white transition-all duration-300">
                    <i class="fa-regular fa-heart"></i>
                </button>
                <button class="w-[32px] h-[32px] text-[#ff8300] rounded-[6px] hover:bg-[#de7200] hover:text-white transition-all duration-300">
                    <i class="fa-solid fa-retweet"></i>
                </button>
            </div>
        </div>`;
}
detailsLoader()

