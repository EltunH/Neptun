import { getAllProductsFetch, getCategoriesFetch, getCategoryById, getDiscFetch, getPopulyarFetch } from "../../services/api.js";
import { addToBasket } from "./basket.js";
import { openFtrUl } from "./footer.js";
import { addToWishList } from "./wishlist.js";

const categoryDiv = document.getElementById("categoryDiv");
const productsCategory = document.getElementById("productsCategory");
const productsCategorySec = document.getElementById("productsCategorySec");

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
let activeSlide = 1;

getCategoriesFetch()
    .then(data => {
        categoryDiv.innerHTML = ''
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
        })

        swiperHidden.on('slideChange', swipper => {
            if (window.innerWidth > 768) {
                const activeElement = swipper.slides[swipper.activeIndex].id
                if (activeElement != activeSlide) {
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
                activeSlide = activeElement
            }
        })
    })


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

getCategoryById()
    .then(data => slideShow("productsCategory", data.products));

getDiscFetch()
    .then(data => {
        slideShow('discDiv', data.products)
    })

getPopulyarFetch()
    .then(data => {
        if (data.products == 0) {
            getAllProductsFetch(20, 15)
                .then(mel => {
                    slideShow('bestSellerDiv', mel.products)
                });
        }
    })



function slideShow(id, data) {
    const elem = document.getElementById(id)
    elem.innerHTML = ''
    data.map(item => {
        elem.innerHTML += `
            <article class="swiper-slide rounded-lg overflow-hidden">
                <div class="relative w-full p-[0_10px_17px]">
                    <a href="pages/details.htm?id=${item.id}" class="block pt-[10px]">
                        <img src="${item.img[0]}" alt="photo" class="!w-[180px] aspect-square mx-auto cursor-pointer" />
                    </a>
                    <a href="pages/details.htm?id=${item.id}" class="uppercase text-[10px] h-[30px] block font-[600] text-center mb-5 mt-3 w-[73%] mx-auto hover:text-[#ff8300]">${item.name.length > 30 ? item.name.slice(0, 30) + '...' : item.name}</a>
                    <div class="flex justify-center items-center mb-5">
                        ${id == 'discDiv' ?
                        `<div class="w-[38px] h-[38px] rounded-full bg-[#ffd9c0] group-hover:bg-[#ff8300] mr-2 grid place-items-center">
                            <span class="text-[12px] text-[#4e4e4e] group-hover:text-white font-bold">-${item.discount}%</span>
                        </div>` : ''}
                        <div>
                            ${id == 'discDiv' ? `<p class="text-[16px] text-[#999] font-sans text-left"><del>${item.price}₼</del></p>` : ''}
                            <p class="text-[22px] font-[700] font-sans text-left">${item.totalPrice.toFixed(2)}₼</p>
                        </div>
                    </div>
                    <div class="flex justify-center items-center">
                        <button onclick='incDec(-1, ${JSON.stringify(item)})' class="text-[#ff8300] p-[6px_12px] text-[25px]">‒</button>
                        <span id="xana${item.id}" class="text-[12px] font-bold">1</span>
                        <span class="text-[11px] ml-1">Ədəd</span>
                        <button onclick='incDec(1, ${JSON.stringify(item)})' class="text-[#ff8300] p-[6px_12px] text-[25px]">+</button>
                    </div>
                    <button id="btn${item.id}" onclick='sebeteAt(${JSON.stringify(item)})' class="bg-[#ff8300] rounded-full px-5 text-[15px] text-white h-[30px] mb-5 transition duration-300 hover:bg-[#de7200]">Səbətə at</button>
                    <i onclick='favourite(${JSON.stringify(item)})' class="fa-regular fa-heart text-[#ff8300] cursor-pointer absolute p-1 top-3 right-5 hover:text-red-600"></i>
                </div>
            </article>`
    });
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



window.openFtr = () => openFtrUl()