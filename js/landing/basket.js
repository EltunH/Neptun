const news = document.getElementById('news')

const basket = JSON.parse(localStorage.getItem('basket')) || []

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
}

window.closenews = () => news.style.right = '-150%'



export {
    addToBasket,
    basket,
    newsTimer
}