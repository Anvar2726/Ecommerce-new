function getProductCards ({name, description, price, rating, discount, images}){
    return `
    <div class="discount__card">
        <div class="discount__card-inner">
            <img class="discount__card-img" src=${images[0]} alt=${description}>
        </div>
        <div>
            <p class="discount__card-discount">${discount} %</p>
            <p class="discount__card-name">${name}</p>
        </div>
        <p class="discount__card-desc">${description}</p>
        <p class="discount__card-rate">${rating}</p>
        <button class="discount__card-btn">В корзину</button>
    </div>
    `
}