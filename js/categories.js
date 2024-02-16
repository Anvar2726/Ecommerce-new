const catalogRow = document.querySelector('.catalog__row');

function getCatalogCart({name, image}){
    return `
    <div class="catalog__cart">
        <img src=${image} alt=${name}>
        <a href="/pages/category.html" onclick="getCategories('${name}')">${name}</a>
    </div>
    `
}
// /pages/category.html
function getCategories (name){
    localStorage.setItem(CATEGORY, name);
}

function getCatalog(){
    categories.forEach(el => {
        catalogRow.innerHTML += getCatalogCart(el)
    });
}
getCatalog()
