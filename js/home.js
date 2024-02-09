// variables
const discountRows = document.querySelector('.discount__rows');
const newProductsRow = document.querySelector('.new-products__rows');
const purchasedRows = document.querySelector('.purchased__rows')


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
let purchasedProducts = products.sort((a, b) => b.rating - a.rating).slice(0, 4)
purchasedProducts.forEach(pr =>{
    purchasedRows.innerHTML += getProductCards(pr)
});