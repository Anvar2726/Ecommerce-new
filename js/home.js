// variables
const discountRows = document.querySelector('.discount__rows');
const newProductsRow = document.querySelector('.new-products__rows');
const purchasedRows = document.querySelector('.purchased__rows');
const appsRow = document.querySelector('.apps__row');
const storesBtns = document.querySelectorAll('.stores__btns__btn'); // stores variable
const storesMap = document.querySelectorAll('.stores__maps__map'); // stores variable
let activeBtn = 0;
const articlesRow = document.querySelector('.articles__row'); //articles 

let likeJson = localStorage.getItem("likeProducts");
let likeProduct = JSON.parse(likeJson) || [];


function renderHomeProd() {
    discountRows.innerHTML = " "
    newProductsRow.innerHTML = " "
    purchasedRows.innerHTML = " "

    // discount section
    let discountProducts = products.filter(pr => pr.discount == 50).slice(0,4);
    discountProducts.forEach(pr => {
        discountRows.innerHTML += getProductCard(pr, renderHomeProd)
    });

    // new products section
    let newProducts = products.filter(pr => pr.discount == 0).slice(-4);
    newProducts.forEach(pr => {
        newProductsRow.innerHTML += getProductCard(pr)
    });

    // purchased section
    let purchasedProducts = products.toSorted((a, b) => b.rating - a.rating).slice(-4);
    purchasedProducts.forEach(pr => {
        purchasedRows.innerHTML += getProductCard(pr)
    });
}

renderHomeProd();


// apps object and apps
const apps = [
    {
        name: "Оформите карту «Северяночка»",
        description: "И получайте бонусы при покупке в магазинах и на сайте",
        image: "/assets/images/articles/app1.png",
    },
    {
        name: "Покупайте акционные товары",
        description: "И получайте вдвое больше бонусов",
        image: "/assets/images/articles/app2.png"
    }
]

function getAppCard({ name, description, image }) {
    return `
    <div class="apps__item">
        <div>
            <h1 class="apps__item__title">${name}</h1>
            <p class="apps__item__text">${description}</p>
        </div>
        <img class="apps__item__img" src=${image} alt=${description}>
    </div>
    `
}

apps.forEach(el => {
    appsRow.innerHTML += getAppCard(el)
});


// stores
function btnTab() {
    storesMap.forEach((el, i) => {
        if (i == activeBtn) {
            el.style.display = "block";
            storesBtns[i].classList.add('stores__btns__btn__active');
        } else {
            el.style.display = "none";
            storesBtns[i].classList.remove('stores__btns__btn__active');
        }
    })
}

btnTab();

storesBtns.forEach((el, i) => {
    el.addEventListener('click', function () {
        activeBtn = i;
        btnTab()
    })
});


// articles object and articles

const articles = [
    {
        image: "/assets/images/articles/article-1.png",
        date: "05.03.2021",
        name: "Режим использования масок и перчаток на территории магазинов",
        desc: "Подробная информация о режимах использования масок и перчаток на территории магазинов \"ЛЕНТА\". Информация обновляется каждый будний день."
    },
    {
        image: "/assets/images/articles/article-2.png",
        date: "05.03.2021",
        name: "Весеннее настроение для каждой",
        desc: "8 Марта – это не просто Международный женский день, это ещё день тюльпанов, приятных сюрпризов и праздничных тёплых пожеланий."
    },
    {
        image: "/assets/images/articles/article-3.png",
        date: "05.03.2021",
        name: "ЗОЖ или ФАСТФУД. А вы на чьей стороне? Голосуем!",
        desc: "Голосуйте за любимые категории, выбирайте категорию-победителя в мобильном приложении и получайте кешбэк 10% баллами в апреле!"
    }
]

function getArticleCard({ image, date, name, desc }) {
    return `
    <div class="articles__card">
        <img class="articles__card__img" src=${image} alt=${desc}>
        <div class="articles__card__inner">
            <p class="articles__card__date">${date}</p>
            <h3 class="articles__card__title">${name}</h3>
            <p class="articles__card__desc">${desc}</p>
            <button class="articles__card__btn">Подробнее</button>
        </div>
    </div>
    `
}

articles.forEach(el => {
    articlesRow.innerHTML += getArticleCard(el);
})


// mapping
function getProductCard({ name, description, price, rating, discount, images, id }) {
    function getRating() {
        if (rating == 5) {
          return `/assets/images/icons/rating5.svg`;
        } else if (rating == 4.5) {
          return `/assets/images/icons/rating4.5.svg`;
        } else if (rating == 4) {
          return `/assets/images/icons/rating4.svg`;
        } else if (rating == 3.5) {
          return `/assets/images/icons/rating2.5.svg`;
        } else if (rating == 3) {
          return `/assets/images/icons/rating3.svg`;
        } else if (rating == 2) {
          return `/assets/images/icons/rating2.svg`;
        } else if (rating == 1) {
          return `/assets/images/icons/rating1.svg`;
        }
    }
    let productInCard = cartProducts.find(pr => pr.id === id);
   let productFavoriteFound = likeProduct.find(pr => pr.id === id)
    return `
    <div class="discount__card">
        <div class="discount__card__inner">
        <img class="discount__card__img" src=${images[0]} alt=${description}>
        
        ${
            productFavoriteFound
            ?`<img onclick="addToFavorite(${id})" class="discount__card__heart" src="/assets/images/icons/heart-like.svg" alt="heart" width="30" height="30">`
              : `<img onclick="addToFavorite(${id})" class="discount__card__heart" src="/assets/images/icons/heart.svg" alt="heart" width="30" height="30">`
          }
        </div>
        <div>
        <p class="discount__card__discount">${discount} %</p>
        <p class="discount__card__name">${name}</p>
        </div>
        <a href="/pages/product.html" class="discount__card__desc" onclick = "getCartProduct(${id})">
            <p class="discount__card__price">${price} $</p>
            <p class="discount__card__desc" >${description}</p>
            <img src=${getRating()} alt=${name}/>
        </a>   
            ${productInCard ? `
                <div class="cart__btns">
                    <button onclick = "decreaseQuantity(${id})" class="cart__btn">-</button>
                    <span class="cart__btn">${productInCard.quantity}</span>
                    <button onclick = "increaseQuantity(${id})" class="cart__btn">+</button>
                </div>`: `

                <button onclick="addToCard(${id})" class="discount__card__btn">В корзину</button>
                `
            }
           
    </div>
    `
}

function addToCard(id) {
    let productFound = products.find(pr => pr.id === id);
    let productInCard = cartProducts.find(pr => pr.id === id);
    if (productInCard) {
        cartProducts = cartProducts.map((pr) => {
            if (pr.id === id) {
                pr.quantity++;
            }
            return pr;
        });
    } else {
        productFound.quantity = 1;
    }
    cartProducts.push(productFound);
    renderHomeProd();
    getProductQuantity();
    localStorage.setItem("carts", JSON.stringify(cartProducts));
}

function increaseQuantity(id){
    cartProducts = cartProducts.map((pr) => {
        if (pr.id === id) {
            pr.quantity++;
        }
        return pr;
    });
    renderHomeProd();
    getProductQuantity();
    localStorage.setItem("carts", JSON.stringify(cartProducts));
}

function decreaseQuantity(id){
    let productInCard = cartProducts.find((pr) => pr.id === id);
    if(productInCard.quantity === 1){
        cartProducts = cartProducts.filter((pr) => pr.id !== id);
    }
    cartProducts = cartProducts.map((pr) => {
        if (pr.id === id) {
            pr.quantity--;
        }
        return pr;
    });
    renderHomeProd();
    getProductQuantity();
    localStorage.setItem("carts", JSON.stringify(cartProducts));
}

function addToFavorite(id){
    let productInFavorite = products.find(pr => pr.id === id);
    let productFavoriteFound = likeProduct.find(pr => pr.id === id)
    if(productFavoriteFound){
        likeProduct = likeProduct.map(pr =>{
            if(pr.id ===  id){
                pr.like = false
            }
            return pr;
        })
        likeProduct = likeProduct.filter(pr => pr.id !== id);
    }else {
        likeProduct = likeProduct.map(pr => {
            if(pr.id === id){
                pr.like = true
            }
            return pr;
        })
        likeProduct.push(productInFavorite);
    }
    renderHomeProd();
    getProductQuantity();
    localStorage.setItem("likeProducts", JSON.stringify(likeProduct));
}