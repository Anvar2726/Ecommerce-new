// variables
const productsRow = document.querySelector('.products__row');
const searchInput = document.querySelector('.header__search');
let search = "";
const pagination = document.querySelector('.products__pagination');
let activePage = localStorage.getItem("page") ||1;

// search
function searchProducts(){

    let searchRes = products.filter((el) => el.name.toLowerCase().includes(search) || el.description.toLowerCase().includes(search));
    let pages = Math.ceil(searchRes.length / LIMIT);

    pagination.innerHTML = `
    <button onclick = "getPage('-')" ${activePage === 1 ? "disabled" : ""} class="products__pagination__btn ${activePage === 1 ? "products__pagination__btns-disabled" : ""}">prewious</button>`
    
    for(let i = 1; i <= pages; i++ ){
        pagination.innerHTML += `<button onclick = 'getPage(${i})' class="products__pagination__btns ${i == activePage ? "products__pagination__btns-active" : " "}">${i}</button>`
    }

    pagination.innerHTML += `
    <button onclick = "getPage('+')" ${activePage === pages ? "disabled" : ""}  class="products__pagination__btn ${activePage === pages ? "products__pagination__btns-disabled" : ""} ">next</button>`
    if(searchRes.length <= 8){
        pagination.innerHTML = "";
    }
    let start = (activePage - 1) * LIMIT;
    let end = LIMIT * activePage;

    productsRow.innerHTML = " ";
    searchRes.slice(start, end).forEach(el =>{
        productsRow.innerHTML += getProductCard(el)
    })
}

searchProducts();

function getPage(i){
    if(i === '+'){
        activePage++;
    }else if(i === '-'){
        activePage--;
    }else{
        activePage = i;
    }
    localStorage.setItem("page", activePage);
    searchProducts();
}

searchInput.addEventListener('keyup', function(){
    search = this.value.toLowerCase().trim();
    activePage = 1;
    localStorage.setItem("page", 1)
    searchProducts();
})