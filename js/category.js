const categoryRow = document.querySelector('.categories__rows');
const productsCategory = document.querySelector('.categories__category');
let Category = localStorage.getItem(CATEGORY) || "all";
productsCategory.textContent = Category;

function getProductCard({ name, description, price, rating, discount, images, id }) {
    let productInCard = cartProducts.find(pr => pr.id === id);
    return `
    <div class="discount__card">
        <div class="discount__card__inner">
        <img class="discount__card__img" src=${images[0]} alt=${description}>
        </div>
        
        <div>
        <p class="discount__card__discount">${discount} %</p>
        <p class="discount__card__name">${name}</p>
        </div>
        <a href="/pages/product.html" class="discount__card__desc" onclick = "getCartProduct(${id})">
            <p class="discount__card__price">${price} $</p>
            <p class="discount__card__desc" >${description}</p>
            <p class="discount__card__rate">${rating}</p>
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

function getCategorys(){
    let categoryProductSs =  products.filter((pr) => pr.category === Category);
    categoryRow.innerHTML = ""
    categoryProductSs.forEach(el => {
        categoryRow.innerHTML += getProductCard(el);
    });
}

getCategorys();

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
    getCategorys();
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
    getCategorys();
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
    getCategorys();
    getProductQuantity();
    localStorage.setItem("carts", JSON.stringify(cartProducts));
}

