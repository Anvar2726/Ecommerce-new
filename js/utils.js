// function getProductCard ({name, description, price, rating, discount, images, id}){
//     // let checkProductInCard = cardProducts.find(pr => pr.id === id);
//     return `
//         <div class="discount__card">
//             <div class="discount__card__inner">
//                 <img class="discount__card__img" src=${images[0]} alt=${description}>
//             </div>
           
//             <div>
//                 <p class="discount__card__discount">${discount} %</p>
//                 <p class="discount__card__name">${name}</p>
//             </div>
//             <p class="discount__card__price">${price} $</p>
//             <p class="discount__card__desc">${description}</p>
//             <p class="discount__card__rate">${rating}</p>
//             <button onclick = "addToCard(${id})" class="discount__card__btn">В корзину</button>
           
//         </div>
//     `
// }


function getProductCard ({name, description, price, rating, discount, images, id}){
    let productInCard = cardProducts.find(pr => pr.id === id);
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
            
            <button onclick = "addToCard(${id})" class="discount__card__btn">В корзину</button>
           
        </div>
    `
}

// ${
//     productInCard  ? `
//      <div class="cart__btns">
//         <button class="cart__btn">-</button>
//         <span class="cart__btn">${productInCard .quantity}</span>
//         <button class="cart__btn">+</button>
//     </div>`: `
//     `
// }


