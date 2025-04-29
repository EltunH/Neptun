

async function getAllProductsFetch(limit = 20, page = 4) {
    const res = await fetch(`${configObject.base}/products?limit=${limit}&page=${page}`)
    return res.json()
}

async function getAllProductsIdFetch(id) {
    const res = await fetch(`${configObject.base}/products/${id}`)
    return res.json()
}

async function getCategoriesFetch() {
    const res = await fetch(`${configObject.base}/categories`)
    return res.json()
}

async function getPopulyarFetch() {
    const res = await fetch(`${configObject.base}/products/populyar`)
    return res.json()
}

async function getDiscFetch() {
    const res = await fetch(`${configObject.base}/products/discounted`)
    return res.json()
}