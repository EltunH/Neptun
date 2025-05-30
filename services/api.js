import { configObject } from "../config/config.js"
const token = localStorage.getItem('token');

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

async function getCategoryById(id = 1) {
    const res = await fetch(`${configObject.base}/products/category/${id}`)
    return await res.json()
}

async function getSubCategoryId(id = 1, limit = 12, page = 1) {
    if (id == null) id = 1
    const res = await fetch(`${configObject.base}/products/subcategory/${id}?limit=${limit}&page=${page}`)
    return await res.json()
}

async function getProductId(id) {
    const res = await fetch(`${configObject.base}/products/${id}`)
    return await res.json()
}

async function getSearch(name) {
    const res = await fetch(`${configObject.base}/products/search/?name=${name}`)
    return await res.json()
}

async function verifyToken() {
    const res = await fetch(`${configObject.base}/auth/verify-token`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    return await res.json()
}

async function login(obj) {
    const res = await fetch(`${configObject.base}/auth/login`, {
        method: 'POST',
        body: obj,
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    return await res.json()
}

async function register(obj) {
    const res = await fetch(`${configObject.base}/auth/register`, {
        method: 'POST',
        body: obj,
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    return await res.json()
}

async function addToProduct(obj) {
    const res = await fetch(`${configObject.base}/products`, {
        method: 'POST',
        body: obj,
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + token
        }
    })
    return await res.json()
}

async function putProduct(id, obj) {
    const res = await fetch(`${configObject.base}/products/${id}`, {
        method: 'PUT',
        body: obj,
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + token
        }
    })
    return await res.json()
}

async function delProduct(id) {
    const res = await fetch(`${configObject.base}/products/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + token
        }
    })
    return await res.json()
}

export {
    getAllProductsFetch,
    getAllProductsIdFetch,
    getCategoriesFetch,
    getPopulyarFetch,
    getDiscFetch,
    getCategoryById,
    getSubCategoryId,
    getProductId,
    getSearch,
    login,
    verifyToken,
    register,
    addToProduct,
    putProduct,
    delProduct
}