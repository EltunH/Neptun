import { getAllProductsFetch, getCategoriesFetch, getCategoryById, getDiscFetch, getPopulyarFetch } from "../services/api.js";

const discDiv = document.getElementById("discDiv");
const categoryDiv = document.getElementById("categoryDiv");
const productsCategory = document.getElementById("productsCategory");
const productsCategorySec = document.getElementById("productsCategorySec");
const bestSellerDiv = document.getElementById("bestSellerDiv");
const testUl = document.getElementById("testUl");

const categoryProductImg = [
    'https://cdn.myikas.com/images/11ee5840-85b0-4d70-9b56-6b324f30871e/272de7d2-93fb-419e-8d07-8cbfea9b7d58/image_1080.jpg',
    'https://turpkimi.com/files/posts/original/2020/12/17/4e8118db-3009-4a2a-9ebe-e86985e94c15/03d8b90243714e0fb0a3207ec85658e8.jpg',
    'https://imageproxy.wolt.com/assets/67b59e2316aace6c1c77824d',
    'https://ikisahil.az/photo/975x540_2/upload/2020/05/20/-a1b07b89158998156991021284110798467.jpg',
    'https://files.modern.az/articles/2021/01/02/420786.jpg',
    'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiZ6JtCUKg_S6pZYe1DuuIVB9GQqB-oLKsg3fw7LHQ8Uq4nXGIBH_HmgP8WhhNQxPcug7nwM_iJ7iN2DJnzX_ZukWyqNrcuX3mv84DO5NJ_sVp_aRkqaQhGLW5y1zgNY7xux0ZSglidsCSW/s1600/cointreau-cocktail.jpg',
    'https://upload.az/foto/arxiv/sud_21623066473.jpg',
    'https://ziplinelogistics.com/wp-content/uploads/2022/06/shutterstock_608257718.jpg',
    'https://www.isguvenlikosgb.com/userfiles/images/Blog/temizlik-urunleri.jpg',
    'https://www.saglik.org.tr/uploads/images/202411/original_doktor-tavsiye-kozmetik.webp',
    'https://i.nefisyemektarifleri.com/2019/02/25/pratik-mutfak-aletleri-yemek-yaparken-isinizi-kolaylastiracak-15-gerec-17-600x400.jpg',
    'https://odam.uz/upload/media/posts/2017-08/07/kanselyariya-jihozlari-kelib-chiqishi-haqidagi-10-ta-kutilmagan-faktlar_1502084646-b.jpg',
    'https://cats.com/wp-content/uploads/2025/01/Royal-Canin-Cat-Food-5.jpg',
    'https://fed.az/upload/news/4807949.jpg',
    'https://certus.az/uploads/6052f63442399f5c0cacb5e4f06a9c913dc37422225eb.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTheS7BUesfeiyVfiPw_-7Clbjx772FIZOxKg&s'
];

let idElement = 1;
let activeSlie = 1;

function showCategories() {
    getCategoriesFetch()
        .then(data => {
            data.map((item, i) => {
                categoryDiv.innerHTML += `
                    <div id="${idElement++}" class="swiper-slide rounded-lg overflow-hidden">
                        <div class="relative rounded- h-full">
                            <div class="absolute top-0 left-0 text-[18px] p-[19px] rounded-[8px_0_25px_0] bg-[#29292991] text-white">
                                <p class="mb-[10px]">Kateqoriyalar:</p>
                                <p>${item.categoryName}</p>
                            </div>
                            <img src="${categoryProductImg[i]}" alt="photo" class="mlg:!w-[375px] max-mlg:!h-[324px] object-cover" />
                        </div>
                    </div>`;
                productsCategorySec.innerHTML += `
                    <option value="${idElement - 1}" class="p-[5px]">
                        ${item.categoryName}
                    </option>`;

                    // test---------------------------------------------------------
                    
                testUl.innerHTML += `
                    <li class="w-[200px] cursor-pointer group relative py-3 px-2">
                        <p>${item.categoryName} ></p>
                        <ul class="absolute left-[100%] top-0 bg-orange-300 group-hover:max-h-[500px] max-h-0 overflow-hidden transition-all duration-300">
                            <li class="py-3 px-2">
                                ${item.subcategory.map(sub => {return `<a href="pages/product.htm?id=${sub.id}" class="py-3 block px-2 cursor-pointer">${sub.categoryName}<a/>`}).join('')}
                            </li>
                        </ul>
                    </li>
                `
            })

            swiperHidden.on('slideChange', swipper => {
                if (window.innerWidth > 768) {
                    const activeElement = swipper.slides[swipper.activeIndex].id
                    if (activeElement != activeSlie) {
                        getCategoryById(activeElement)
                            .then(data => {
                                productsCategory.innerHTML = ''
                                slideShow("productsCategory", data.products)
                            })
                            .catch(_ => {
                                productsCategory.innerHTML = `
                                        <div class="w-full h-full grid place-items-center bg-white">
                                            <span class='text-red-600 text-[24px] py-3'>Bu kateqoriyaya uyğun məhsul tapılmadı</span>
                                        </div>`
                            })
                    }
                    activeSlie = activeElement
                }
            })
        })
}
showCategories()

window.changeCategoryOption = (self) => {
    getCategoryById(self.value)
        .then(data => {
            productsCategory.innerHTML = ''
            slideShow("productsCategory", data.products)
        })
        .catch(_ => {
            productsCategory.innerHTML = `
                    <div class="w-full h-full grid place-items-center bg-white">
                        <span class="text-red-600 text-[24px] py-4">Bu kateqoriyaya uyğun məhsul tapılmadı</span>
                    </div>`
        })
}

getCategoryById(1)
    .then(data => {
        productsCategory.innerHTML = ''
        slideShow("productsCategory", data.products)
    });

function showDiscount() {
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
}
showDiscount()

function showPopulyar() {
    getPopulyarFetch()
        .then(data => {
            if (data.products == 0) {
                getAllProductsFetch(20, 15)
                    .then(mel => {
                        slideShow('bestSellerDiv', mel.products)
                    });
            }
        })


}
showPopulyar()

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