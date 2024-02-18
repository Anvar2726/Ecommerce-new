const favoriteRow = document.querySelector('.favorite__row');

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
    let productFavoriteFound = likeProduct.find(pr => pr.id === id);
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

function getFavoriteCarts(){
    favoriteRow.innerHTML = "";
    likeProduct.forEach(element => {
        favoriteRow.innerHTML += getProductCard(element);
    });
}
getFavoriteCarts();

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
    getFavoriteCarts();
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
    getFavoriteCarts();
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
    getFavoriteCarts();
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
    getFavoriteCarts();
    getFavoriteQuantity();
    localStorage.setItem("likeProducts", JSON.stringify(likeProduct));
}