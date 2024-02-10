// variables
const categoryList = document.querySelector('.category__list');
const category = document.querySelector('.category');
const hamburgerMenu = document.querySelector('.header__menu');


function getCategory({name}){
    return `
        <li>
            <a class="category__list__link" href="/pages/category.html">${name}</a>
        </li>
    `
}

categories.forEach(el =>{
    categoryList.innerHTML += getCategory(el)
});

hamburgerMenu.addEventListener('click', function(){
    category.classList.toggle('category__active')
})