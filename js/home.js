// variables
const discountRows = document.querySelector('.discount__rows');
const newProductsRow = document.querySelector('.new-products__rows');
const purchasedRows = document.querySelector('.purchased__rows');
const appsRow = document.querySelector('.apps__row');


// discount section
let discountProducts = products.filter(pr => pr.discount == 50).slice(0, 4);
discountProducts.forEach(pr => {
    discountRows.innerHTML += getProductCards(pr)
});

// new products section
let  newProducts = products.filter(pr => pr.discount == 0).slice(-4);
newProducts.forEach(pr =>{
    newProductsRow.innerHTML += getProductCards(pr)
});

// purchased section
let purchasedProducts = products.sort((a, b) => b.rating - a.rating).slice(0, 4);
purchasedProducts.forEach(pr =>{
    purchasedRows.innerHTML += getProductCards(pr)
});


// apps object
const apps = [
    {
        name:"Оформите карту «Северяночка»",
        description:"И получайте бонусы при покупке в магазинах и на сайте",
        image: "/assets/images/articles/app1.png",
    },
    {
        name:"Покупайте акционные товары",
        description:"И получайте вдвое больше бонусов",
        image: "/assets/images/articles/app2.png"
    }
]

function getAppCard({name, description, image}){
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

apps.forEach(el =>{
    appsRow.innerHTML += getAppCard(el)
});