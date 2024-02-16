const cartRow = document.querySelector('.cart-products__row');

function getCartProduct({description, price, images, id, quantity}){
    return `
    <div class="cart-products__cart">
        <div>
            <img class="cart-products__img" src=${images[0]} alt="">
            <div>
                <p class="cart-products__name">${description}</p>
                <p class="cart-products__price">${price} $</p>
            </div>
        </div>
        <div>
            <div class="cart__btns cart-products__inner">
                <button onclick = "decreaseQuantity(${id})" class="cart__btn">-</button>
                <span class="cart__btn">${quantity}</span>
                <button onclick = "increaseQuantity(${id})" class="cart__btn">+</button>
            </div>
            <p class="cart-products__price">${quantity * price} $</p>
        </div>
    </div>
    `
}

function getCartsProduct(){
    cartRow.innerHTML = "";
    cartProducts.forEach(el=> {
        cartRow.innerHTML += getCartProduct(el)
    });
}
getCartsProduct();

function increaseQuantity(id){
    cartProducts = cartProducts.map((pr) => {
        if (pr.id === id) {
            pr.quantity++;
        }
        return pr;
    });
    getCartsProduct();
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
    getCartsProduct();
    getProductQuantity();
    localStorage.setItem("carts", JSON.stringify(cartProducts));
}