// variables
const categoryList = document.querySelector('.category__list');
const category = document.querySelector('.category');
const hamburgerMenu = document.querySelector('.header__menu');
const searchProductRow = document.querySelector('.search__products');
const searchWrapper = document.querySelector('.search');
const main = document.querySelector('main');




function getCategory({name}){
    return `
        <li>
            <a class="category__list__link" href="/pages/category.html">${name}</a>
        </li>
    `
}


categories.forEach(el =>{
    categoryList.innerHTML += getCategory(el)
});

hamburgerMenu.addEventListener('click', function(){
    category.classList.toggle('category__active')
})


function getSearchProduct({name, description, images, price, discount}){
    return `
    <div class="search__card">
        <img class="search__card__img" src=${images[0]} alt=${description}>
        <div class="search__card__wrapper">
            <p class="search__card__desc">${description}</p>
            <div class="search__card__inner">
                <p class="search__card__discount">${discount} %</p>
                <p class="search__card__name">${name}</p>
            </div>
            <p class="search__card__price">${price} $</p>
            <button class="search__card__btn">В корзину</button>
        </div>
    </div>
    `
}

main.addEventListener('click', function(){
    searchWrapper.style.display = "none";
})

searchInput.addEventListener('click', function(){
    searchWrapper.style.display = "block";
})

function getSearchCard(){
    let searchRes = products.filter((el) => el.name.toLowerCase().includes(search) || el.description.toLowerCase().includes(search));;

    searchProductRow.innerHTML = "";
    searchRes.forEach(el =>{
        searchProductRow.innerHTML += getSearchProduct(el)
    })

    if(searchRes.length < 1){
        searchProductRow.innerHTML += `
        <div>
            <h1 class="search__info">Mahsulot topilmadi</h1>
        </div>    
        `
    }
}
getSearchCard()

searchInput.addEventListener('keyup', function(){
    search = this.value.toLowerCase().trim();
    getSearchCard();
})