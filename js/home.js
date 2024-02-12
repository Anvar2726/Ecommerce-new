// variables
const discountRows = document.querySelector('.discount__rows');
const newProductsRow = document.querySelector('.new-products__rows');
const purchasedRows = document.querySelector('.purchased__rows');
const appsRow = document.querySelector('.apps__row');
const storesBtns = document.querySelectorAll('.stores__btns__btn'); // stores variable
const storesMap = document.querySelectorAll('.stores__maps__map'); // stores variable
let activeBtn = 0;
const articlesRow = document.querySelector('.articles__row'); //articles 


function renderHomeProd() {
    discountRows.innerHTML = " "
    newProductsRow.innerHTML = " "
    purchasedRows.innerHTML = " "
    // discount section
    let discountProducts = products.filter(pr => pr.discount == 50).slice(0, 4);
    discountProducts.forEach(pr => {
        discountRows.innerHTML += getProductCard(pr)
    });

    // new products section
    let newProducts = products.filter(pr => pr.discount == 0).slice(-4);
    newProducts.forEach(pr => {
        newProductsRow.innerHTML += getProductCard(pr)
    });

    // purchased section
    let purchasedProducts = products.sort((a, b) => b.rating - a.rating).slice(0, 4);
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
