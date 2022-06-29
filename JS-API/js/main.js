
let allProducts = [];

const welcomeBannerText = document.getElementById('welcome-banner-text');
//get produts-grid
const grid = document.getElementById('products-grid');

// GET CATEGORY ELEMENTS
const mensBtn = document.getElementById("mens");
const womensBtn = document.getElementById("womens");
const jeweleryBtn = document.getElementById("jewelery");
const electronicsBtn = document.getElementById("electronics");
const allBtn = document.getElementById("all");

// GET SORT ELEMENT
const allCatBtns = document.querySelectorAll('.category-link')
const priceBtn = document.getElementById('price');
const titleBtn = document.getElementById('title');
const ratingBtn = document.getElementById('rated');

let arrRemoveBtns = []
let onCartPage = false;

let userCart = new Array(); //arr of obj
let displayedProducts = [];

let currTitleIndex;
let selectedSortType = 'titleAZ';

const cartBtnNav = document.getElementById('cart');
const sortLinks = document.querySelectorAll('.sort-link');
const resultsFound = document.getElementById("results-found");


// ========================MAIN======================

welcomeBannerText.innerHTML = "Please Wait...";

//======API==========
fetchProducts();

// =================FUNCTIONS===================================

async function fetchProducts(){
    try{
        const returnValue = await fetch('https://fakestoreapi.com/products')
        allProducts = await returnValue.json()
        await postFetch();
    }
    catch(err){console.log(err.message)}
}

async function postFetch(){
    console.log(allProducts)
    welcomeBannerText.innerHTML = "Welcome to the Store";
    // // =======NAV===================
    cartBtnNav.addEventListener('click',function () {
        onCartPage = true;
        displayCart();
    })
    
    // =========CATEGORIES=========================
    // ----ON CLICK
    clickCatBtn(allBtn, "all");
    clickCatBtn(womensBtn, "women's clothing");
    clickCatBtn(jeweleryBtn, "jewelery");
    clickCatBtn(electronicsBtn, "electronics");
    clickCatBtn(mensBtn, "men's clothing");
    
    //==========SORT BY===========================
    activatePriceBtn();
    activateTitleBtn();
    activateTopRatedBtn()
    
}

// -----HEADER BUTTONS-----------
function clickCatBtn (btn, categoryStr) {
    btn.addEventListener('click', () => {
        clearDisplayedCards();
        onCartPage = false;
        insertCardsByCategory(categoryStr)
    })
}
function activatePriceBtn(){
    priceBtn.addEventListener('click', () =>{
        selectedSortType = 'price'

        insertCardsByArr(displayedProducts)
    })
}
function activateTitleBtn(){
    const selectElem = document.getElementById("title-drop-down");
    currTitleIndex = selectElem.selectedIndex

    selectElem.addEventListener('change', function() {
        currTitleIndex = selectElem.selectedIndex;

        if(currTitleIndex === 1){
            selectedSortType = 'titleZA'
            insertCardsByArr(displayedProducts)
        }
        if (currTitleIndex === 0) {
            selectedSortType = 'titleAZ'
            insertCardsByArr(displayedProducts)
        }

    })
}
function activateTopRatedBtn(){
    ratingBtn.addEventListener('click', () =>{
        selectedSortType = 'top-rated'
        insertCardsByArr(displayedProducts)
    })
}

//-----PRODUCT CARDS-------------
function clearDisplayedCards(){
    removeNodesByClass('.welcome-banner')
    removeNodesByClass('.product-card')
}
function insertCardsByCategory(categoryStr){
    let categoryArr = [];
    //make category array
    if(categoryStr === 'all'){
            categoryArr = allProducts;
    }
    else {
        for (const element of allProducts) {
            if(element.category === categoryStr){
                categoryArr.push(element);
            }
        }
    }
    //filter items that are in userCart
    categoryArr = categoryArr.filter(function(elm) {
        return (userCart.includes(elm)) ? false : true;
    })
    insertCardsByArr(categoryArr);
    updateDisplayedCards(categoryArr);

};
function updateDisplayedCards(arr){
    displayedProducts = [];  //clear
    for(i=0; i < arr.length; i++){   //re-populate
        displayedProducts.push(arr[i]);
    }
}
function insertCardsByArr(arr){
    clearDisplayedCards();

    sortArrayBy(arr, selectedSortType);

    writeCardsHTML(arr);
    if(onCartPage === true){
        showRemoveBtn();
        hideAddToCartBtn();
        activateRemoveBtns();
    }
    else {activateAddtoCartBtn();}
    resultsFound.innerHTML =  arr.length + ' Result(s) Found';
}
function writeCardsHTML(arr){
    for (const element of arr){
        grid.insertAdjacentHTML("beforeend", 
        `                <div class="product-card">
        <div class="product-card-item">
            <h3>${element.title}</h3>
        </div>
        <div class="product-card-item">
            <img src="${element.image}" alt="product img">
        </div>
        <div class="description product-card-item">
            ${element.description}
        </div>
        <div class="product-card-item">
            <div class="price">
                $ ${element.price}
            </div>
            <div data-id="${element.id}" class="card-btns product-card-item">
                <button class="cart-btn btn btn-primary round-pill">Add to cart</button>
            </div>
        </div>
        <div class="product-card-item">
            <div class="rating">
                <i class="fa-solid fa-star"></i> ${element.rating.rate}
            </div>
        </div>
        <div class="product-card-item">
            <button data-id="${element.id}" class="remove-cart-btn">
                Remove
            </button>
        </div>
    </div>`);
    }

}
function activateAddtoCartBtn(){
    const cartBtns = document.querySelectorAll('.cart-btn')
    for (const element of cartBtns){
        element.addEventListener('click', () =>{
            let selectedId = parseInt(element.parentElement.dataset.id);

            displayedProducts.forEach(function(obj, i){
                if(obj.id === selectedId){
                    userCart.push(obj)
                    displayedProducts.splice(i, 1)
                    let time = 1000;
                    setTimeout(function() {insertCardsByArr(displayedProducts)}, time)
                }
            })
            //duplicates
            userCart = userCart.filter((val, index) => {
                return userCart.indexOf(val) === index;
            })
            element.innerHTML = "ADDED!";
        })
    }
    
};

//------USER CART-----------
function displayCart(){
    clearDisplayedCards();
    insertCardsByArr(userCart);
    
    displayedProducts = userCart;
    resultsFound.innerHTML =  displayedProducts.length + ' Result(s) Found';

}
function showRemoveBtn(){
    let CartBtnsRemove = document.querySelectorAll('.remove-cart-btn')
    CartBtnsRemove.forEach(element => element.style.display= "block")
}
function hideAddToCartBtn(){
    let CartBtnsAdd = document.querySelectorAll('.cart-btn');
    CartBtnsAdd.forEach(element => element.style.display= "none")
}
function activateRemoveBtns () {
    arrRemoveBtns = document.querySelectorAll('.remove-cart-btn')
    let selectedId; 

    for (const btn of arrRemoveBtns){ 
        btn.addEventListener('click',function () {
            selectedId = btn.dataset.id;

            //filter item from userCart
            userCart = userCart.filter(function(obj){
                return obj.id != selectedId;
            })  

            insertCardsByArr(userCart);
        })
    }
}

// ------TOOLS--------------------
function removeNodesByClass(classStr){
    const cards = document.querySelectorAll(classStr);
    for (const card of cards){
        card.remove();
    };
}
function sortArrayBy(arr, typeStr){
    switch(typeStr){
        case 'titleAZ':
            arr.sort(function (a,b){             
                if (a.title < b.title) {
                    return -1;
                }
                    if (a.title > b.title) {
                    return 1;
                }
            });
            break
        case 'titleZA':
            arr.sort(function (a,b){             
                if (a.title > b.title) {
                    return -1;
                }
                    if (a.title < b.title) {
                    return 1;
                }
            });
            break
        case 'price':
            arr.sort(function (a,b){  
                return a.price - b.price
            });
            break
        case 'top-rated':
            arr.sort(function (a,b){  
                return b.rating.rate - a.rating.rate
            })
            break
    }
}























