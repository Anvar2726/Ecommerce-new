const productRow = document.querySelector('.product__rowws');
const productDesc = document.querySelector('.product__description');
const productDisc = document.querySelector('.product__wrapper__discount');
const productPrice = document.querySelector('.product__price');
const productDiscountPrice = document.querySelector('.product__discount-price');
const productImg = document.querySelector('.product__img'); 
const productImg1 = document.querySelector('.product__wrapper__imgs-1');
const productImg2 = document.querySelector('.product__wrapper__imgs-2');
const productImg3 = document.querySelector('.product__wrapper__imgs-3');
const productImg4 = document.querySelector('.product__wrapper__imgs-4');
const productCategory = document.querySelector('.product__category');
const productName = document.querySelector('.product-link')
const productImgs = document.querySelector('.product__imgs');
const productInner = document.querySelector('.product__part__inner');

let productId = +localStorage.getItem(PRODUCTID);
let cartId =  products.find(pr => pr.id === productId);
let discountPrice = Math.ceil((cartId.discount * cartId.price) / 100)

if(cartId.discount > 0){
    productDiscountPrice.textContent = " -" + (cartId.price - discountPrice) + " ₽ "
}

productDesc.textContent = cartId.description;
productImg1.src = cartId.images[0];
productImg2.src = cartId.images[1];
productImg3.src = cartId.images[2];
productImg4.src = cartId.images[3];
productImg1.alt = cartId.description;
productImg2.alt = cartId.description;
productImg3.alt = cartId.description;

productImg.src = cartId.images[3];
productImg.alt = cartId.description;

productDisc.textContent = "- "+ cartId.discount +" " + `%`;
productPrice.textContent = cartId.price + " " + " ₽";

productCategory.textContent = cartId.category;
productName.textContent = cartId.name;

productCategory.addEventListener('click', () =>{
    localStorage.setItem(CATEGORY, cartId.category);
})


productImgs.addEventListener('click', (event)=>{
    let src = event.target.src;
    src && (productImg.src = src)
})
let id = cartId.id

function getProductLink ({id}){
    return `
    
    `
}
function getLike(){
    let productFavoriteFound = likeProduct.find(pr => pr.id === id);
    productInner.innerHTML =`
    ${
    productFavoriteFound
    ?`<img onclick="addToFavorite(${id})" class="product__part__heart" src="/assets/images/icons/heart-like.svg" alt="heart" width="30" height="30">`
      : `<img onclick="addToFavorite(${id})" class="product__part__heart" src="/assets/images/icons/heart.svg" alt="heart" width="30" height="30">`
    }
    <a href="/pages/favorite.html">В избраное</a>
` 
}
getLike();
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
    getLike();
    getFavoriteQuantity();
    localStorage.setItem("likeProducts", JSON.stringify(likeProduct));
}
// cartId.forEach(element => {
// });
