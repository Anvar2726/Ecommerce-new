// variables
const productsRow = document.querySelector('.products__row');
const pagination = document.querySelector('.products__pagination');
let activePage = +localStorage.getItem(PAGE) || 1;


// search
function searchProducts(){

    let searchRes = products.filter((el) => el.name.toLowerCase().includes(search) || el.description.toLowerCase().includes(search));;
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

    if(searchRes == 0){
        productsRow.innerHTML = `
        <div>
            <h1>Mahsulot topilmadi</h1>
        </div>    
        `
    }
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
    localStorage.setItem(PAGE, activePage);
    searchProducts();
}

searchInput.addEventListener('keyup', function(){
    search = this.value.toLowerCase().trim();
    activePage = 1;
    localStorage.setItem(PAGE, activePage)
    searchProducts();
})

function addToCard(id){
    let productFound = products.find(pr => pr.id === id);
    let productInCard  = cartProducts.find(pr => pr.id === id);
    if(productInCard ){
        cartProducts = cartProducts.map((pr) =>{
            if(pr.id === id){
                pr.quantity++;
            }
            return pr;
        });
    }else{
        productFound.quantity = 1;
    }
    cartProducts.push(productFound);
    renderHomeProd();
    getProductQuantity();
}