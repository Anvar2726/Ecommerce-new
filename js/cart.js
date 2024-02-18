const cartRow = document.querySelector('.cart-products__row');
const cartContainer = document.querySelector('.cart-right');

let cartProductQuantity = cartProducts.length;
let totalPrice = 0;
let discountCost = 0;
let discountPrice = 0;

function getCartProduct({ description, price, images, id, quantity, discount }) {
    discountPrice = quantity * (price - Math.floor((discount * price) / 100));
    return `
    <div class="cart-products__cart">
        <div>
            <img class="cart-products__img" src=${images[0]} alt="">
            <div>
                <p class="cart-products__name">${description}</p>
                <p class="cart-products__price">${price} $</p>
            </div>
        </div>
        ${discount > 0 ? `
            <p class="discount__card__discount">${discount} %</p>` : ""
        }
        <div>
            <div class="cart__btns cart-products__inner">
                <button onclick = "decreaseQuantity(${id})" class="cart__btn">-</button>
                <span class="cart__btn">${quantity}</span>
                <button onclick = "increaseQuantity(${id})" class="cart__btn">+</button>
            </div>
            <p class="cart-products__price">${discountPrice} $</p>
        </div>
    </div>
    `
}

function getProductPrice() {
    let disSum = 0;
    let sum = 0;
    let res = 0;
    cartProducts.forEach(el => {
        disSum += (el.price * el.discount * el.quantity) / 100;
        sum += el.price * el.quantity;
    })
    disSum = disSum.toFixed(1);
    res = sum - disSum;
    return cartContainer.innerHTML = `
    <div class="carts__right">
        <label class="toggle carts__toggle">
            <input class="toggle-checkbox" type="checkbox" checked>
            <div class="toggle-switch"></div>
            <span class="toggle-label">Списать 200 ₽ </span>
        </label>
        <p class="carts__right__text">На карте накоплено 200 ₽ </p>
        <hr>
        <div>
            <p class="carts__right__text product-quantity">${cartProducts.length} товара</p>
            <p class="carts__right__price">${sum} ₽ </p>
        </div>
        <div>
            <p class="carts__right__text ">Скидка</p>
            <p class="carts__right__discount product-discount">- ${disSum}  </p>
        </div>
        <div>
            <p class="carts__right__text">Итог</p>
            <p class="carts__right__total-price"> ${res} </p>
        </div>
        <p class="carts__right__bonus"><img src="/assets/images/icons/bonus.svg" alt="bonus">Вы получяете 100 бонусов</p>
        <p class="carts__right__min-price">Минимальная сумма заказа 1000р</p>
        <button class="carts__right__btn">Оформить заказ</button>
    </div>
    `
}
getProductPrice()


function getCartsProduct() {
    cartRow.innerHTML = "";
    cartProducts.forEach(el => {
        cartRow.innerHTML += getCartProduct(el)
    });

}
getCartsProduct();

function increaseQuantity(id) {
    cartProducts = cartProducts.map((pr) => {
        if (pr.id === id) {
            pr.quantity++;
        }
        return pr;
    });
    getCartsProduct();
    getProductQuantity();
    getProductPrice()
    localStorage.setItem("carts", JSON.stringify(cartProducts));
}

function decreaseQuantity(id) {
    let productInCard = cartProducts.find((pr) => pr.id === id);
    if (productInCard.quantity === 1) {
        cartProducts = cartProducts.filter((pr) => pr.id !== id);
    }
    cartProducts = cartProducts.map((pr) => {
        if (pr.id === id) {
            pr.quantity--;
        }
        return pr;
    });
    getCartsProduct();
    getProductPrice()
    getProductQuantity();
    localStorage.setItem("carts", JSON.stringify(cartProducts));
}

