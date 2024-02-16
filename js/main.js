// variables
const categoryList = document.querySelector('.category__list');
const category = document.querySelector('.category');
const hamburgerMenu = document.querySelector('.header__menu');
const searchProductRow = document.querySelector('.search__products');
const searchWrapper = document.querySelector('.search');
const main = document.querySelector('main');
const productQuantity = document.querySelector('.header__list2-item span');
let cartJson = localStorage.getItem("carts");
let cartProducts = JSON.parse(cartJson) || [];




// /pages/category.html
// category
function getCategory({ name }) {
    return `
        <li>
            <a onclick="getCategories('${name}')"  class="category__list__link" href="/pages/category.html">${name}</a>
        </li>
    `
}

function getCategories (name){
    localStorage.setItem(CATEGORY, name);
}

// mapping category
categories.forEach(el => {
    categoryList.innerHTML += getCategory(el);
});


hamburgerMenu.addEventListener('click', function () {
    category.classList.toggle('category__active')
})

// search
function getSearchProduct({ name, description, images, price, discount ,id}) {
    return `
    <a href="/pages/product.html" class="link" onclick = "getCartProduct(${id})">
        <div class="search__card">
            <img class="search__card__img" src=${images[0]} alt=${description}>
            <div class="search__card__wrapper">
                <p class="search__card__desc">${description}</p>
                <p class="search__card__discount">${discount} %</p>
                <p class="search__card__name">${name}</p>
                <p class="search__card__price">${price} $</p>
                <div class="search__card__inner">
                </div>
            </div>
        </div>
    </a>
    `
}

function getCartProduct (id){
    localStorage.setItem(PRODUCTID, id);
}

main.addEventListener('click', function () {
    searchWrapper.style.display = "none";
})

searchInput.addEventListener('click', function () {
    searchWrapper.style.display = "block";
})

function getSearchCard() {
    let searchRes = products.filter((el) => el.name.toLowerCase().includes(search) || el.description.toLowerCase().includes(search));;

    searchProductRow.innerHTML = "";
    searchRes.forEach(el => {
        searchProductRow.innerHTML += getSearchProduct(el)
    })

    if (searchRes.length < 1) {
        searchProductRow.innerHTML += `
        <div>
            <h1 class="search__info">Mahsulot topilmadi</h1>
        </div>    
        `
    }
}
getSearchCard();

searchInput.addEventListener('keyup', function () {
    search = this.value.toLowerCase().trim();
    getSearchCard();
})


// addToCard
function getProductQuantity() {
    productQuantity.textContent = cartProducts.length
}
getProductQuantity();

