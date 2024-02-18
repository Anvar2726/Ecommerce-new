// variables
const productsRow = document.querySelector('.products__row');
const pagination = document.querySelector('.products__pagination');
let activePage = +localStorage.getItem(PAGE) || 1;


// 
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

function getCartProduct (id){
    localStorage.setItem(PRODUCTID, id);
}


// search
function searchProducts() {

    let searchRes = products.filter((el) => el.name.toLowerCase().includes(search) || el.description.toLowerCase().includes(search));;
    let pages = Math.ceil(searchRes.length / LIMIT);

    pagination.innerHTML = `
    <button onclick = "getPage('-')" ${activePage === 1 ? "disabled" : ""} class="products__pagination__btn ${activePage === 1 ? "products__pagination__btns-disabled" : ""}">prewious</button>`

    for (let i = 1; i <= pages; i++) {
        pagination.innerHTML += `<button onclick = 'getPage(${i})' class="products__pagination__btns ${i == activePage ? "products__pagination__btns-active" : " "}">${i}</button>`
    }

    pagination.innerHTML += `
    <button onclick = "getPage('+')" ${activePage === pages ? "disabled" : ""}  class="products__pagination__btn ${activePage === pages ? "products__pagination__btns-disabled" : ""} ">next</button>`
    if (searchRes.length <= 8) {
        pagination.innerHTML = "";
    }
    let start = (activePage - 1) * LIMIT;
    let end = LIMIT * activePage;

    productsRow.innerHTML = " ";
    searchRes.slice(start, end).forEach(el => {
        productsRow.innerHTML += getProductCard(el)
    })

    if (searchRes == 0) {
        productsRow.innerHTML = `
        <div>
            <h1>Mahsulot topilmadi</h1>
        </div>    
        `
    }
}

searchProducts();

function getPage(i) {
    if (i === '+') {
        activePage++;
    } else if (i === '-') {
        activePage--;
    } else {
        activePage = i;
    }
    localStorage.setItem(PAGE, activePage);
    searchProducts();
}

searchInput.addEventListener('keyup', function () {
    search = this.value.toLowerCase().trim();
    activePage = 1;
    localStorage.setItem(PAGE, activePage)
    searchProducts();
})

// add to card
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
    searchProducts();
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
    searchProducts();
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
    searchProducts();
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
    searchProducts();
    getFavoriteQuantity();
    localStorage.setItem("likeProducts", JSON.stringify(likeProduct));
}