function getProductCard ({name, description, price, rating, discount, images}){
    return `
        <div class="discount__card">
            <div class="discount__card__inner">
                <img class="discount__card__img" src=${images[0]} alt=${description}>
            </div>
           
            <div>
                <p class="discount__card__discount">${discount} %</p>
                <p class="discount__card__name">${name}</p>
            </div>
            <p class="discount__card__price">${price} $</p>
            <p class="discount__card__desc">${description}</p>
            <p class="discount__card__rate">${rating}</p>
            <button class="discount__card__btn">В корзину</button>
        </div>
     `
}