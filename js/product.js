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
