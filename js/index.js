const discDiv = document.getElementById("discDiv");
const categoryDiv = document.getElementById("categoryDiv");
const productsCategory = document.getElementById("productsCategory");
const productsCategorySec = document.getElementById("productsCategorySec");
const bestSellerDiv = document.getElementById("bestSellerDiv");

(function showCategories() {
    getCategoriesFetch()
        .then(data => {
            data.map(item => {
                categoryDiv.innerHTML += `
                    <div class="swiper-slide rounded-lg overflow-hidden">
                        <div class="relative rounded- h-full">
                            <div class="absolute top-0 left-0 text-[18px] p-[19px] rounded-[8px_0_25px_0] bg-[#29292991] text-white">
                                <p class="mb-[10px]">Kateqoriyalar:</p>
                                <p>${item.categoryName}</p>
                            </div>
                            <img src="img/yalnizNeptun.jpg" alt="photo" class="mlg:!w-[375px]" />
                        </div>
                    </div>`
                productsCategorySec.innerHTML += `
                    <option class="p-[5px]">
                        ${item.categoryName}
                    </option>`
            })
        })
})();

(function showDiscount() {
    getDiscFetch()
        .then(data => {
            data.products.map(item => {
                discDiv.innerHTML += `
                        <div class="swiper-slide rounded-lg overflow-hidden h-auto">
                            <div class="relative w-full p-[0_10px_17px]">
                                <div>
                                <img src="${item.img[0]}" alt="photo" class="!w-[180px] mx-auto cursor-pointer" />
                                </div>
                                <p class="uppercase text-[10px] font-[600] h-[30px] text-center mb-5 w-[73%] mx-auto">${item.name.length > 30 ? item.name.slice(0, 30) + '...' : item.name}</p>
                                <div class="flex justify-center items-center mb-5">
                                    <div class="w-[38px] h-[38px] rounded-full bg-[#ffd9c0] group-hover:bg-[#ff8300] mr-2 grid place-items-center">
                                        <span class="text-[12px] text-[#4e4e4e] group-hover:text-white font-bold">-${item.discount}%</span>
                                    </div>
                                    <div>
                                        <p class="text-[16px] text-[#999] font-sans text-left"><del>${item.price}₼</del></p>
                                        <p class="text-[22px] font-[700] font-sans text-left">${item.totalPrice.toFixed(2)}₼</p>
                                    </div>
                                </div>
                                <div class="flex justify-center items-center">
                                    <button class="text-[#ff8300] p-[6px_12px] text-[25px]">‒</button>  
                                    <span class="text-[12px] font-bold">1</span>
                                    <span class="text-[11px] ml-1">Ədəd</span>
                                    <button class="text-[#ff8300] p-[6px_12px] text-[25px]">+</button>
                                </div>
                                <button class="bg-[#ff8300] rounded-full px-5 text-[15px] text-white h-[30px] transition duration-300 hover:bg-[#de7200]">Səbətə at</button>
                                <i class="fa-regular fa-heart text-[#ff8300] cursor-pointer absolute top-3 right-5"></i>
                            </div>
                        </div>`
            })
        })
})();

(function showPopulyar() {
    getPopulyarFetch()
        .then(data => {
            if (data.products == 0) {
                getAllProductsFetch(20, 15)
                    .then(mel => {
                        slideShow('bestSellerDiv', mel.products)
                    });
            }
        })


})();

(function showCategoryProducts() {
    getAllProductsFetch(40, 20)
        .then(data => {
            slideShow("productsCategory", data.products)
        });
})()

function slideShow(id, data) {
    const elem = document.getElementById(id)

    data.map(item => {
        elem.innerHTML += `
            <div class="swiper-slide rounded-lg overflow-hidden">
                <div class="relative w-full p-[0_10px_17px]">
                    <img src="${item.img[0]}" alt="photo" class="!w-[180px] mx-auto cursor-pointer" />
                    <p class="uppercase text-[10px] h-[30px] font-[600] text-center mb-5 w-[73%] mx-auto">${item.name.length > 30 ? item.name.slice(0, 30) + '...' : item.name}</p>
                    <p class="text-[22px] font-[700] font-sans text-center mb-5">${item.price}₼</p>
                    <div class="flex justify-center items-center">
                        <button class="text-[#ff8300] p-[6px_12px] text-[25px]">‒</button>
                        <span class="text-[12px] font-bold">1</span>
                        <span class="text-[11px] ml-1">Ədəd</span>
                        <button class="text-[#ff8300] p-[6px_12px] text-[25px]">+</button>
                    </div>
                    <button class="bg-[#ff8300] rounded-full px-5 text-[15px] text-white h-[30px] mb-5 transition duration-300 hover:bg-[#de7200]">Səbətə at</button>
                    <i class="fa-regular fa-heart text-[#ff8300] cursor-pointer absolute top-3 right-5"></i>
                </div>
            </div>`
    });
}


