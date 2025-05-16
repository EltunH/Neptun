const basket = JSON.parse(localStorage.getItem('basket')) || []

function addToBasket(elm, prodCount = 1) {
    let yoxla = basket.find(item => item.id == elm.id)
    if (!yoxla) basket.push({ ...elm, count: prodCount })
    else yoxla.count += prodCount
    localStorage.setItem('basket', JSON.stringify(basket))
    console.log(basket)
}

export {
    addToBasket,
    basket
}