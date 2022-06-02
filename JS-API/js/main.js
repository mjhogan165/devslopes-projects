
let allProducts = [];

//get produts-grid
const grid = document.getElementById('products-grid');

// GET CATEGORY ELEMENTS
const mensBtn = document.getElementById("mens");
const womensBtn = document.getElementById("womens");
const jeweleryBtn = document.getElementById("jewelery");
const electronicsBtn = document.getElementById("electronics");
const allBtn = document.getElementById("all");

// GET SORT ELEMENT
const priceBtn = document.getElementById('price');
const titleBtn = document.getElementById('title');
const ratingBtn = document.getElementById('rated');



let cartIds = [];
let userCart = new Array();
let displayedProducts = [];


const cartBtnNav = document.getElementById('cart');
const sortLinks = document.querySelectorAll('.sort-link');

fetchProducts();
// =============NAV===================
cartBtnNav.addEventListener('click',function () {
    displayCart();
})

// ======CATEGORIES=========================
// ----ON CLICK
clickCatBtn(allBtn, "all");
clickCatBtn(womensBtn, "women's clothing");
clickCatBtn(jeweleryBtn, "jewelery");
clickCatBtn(electronicsBtn, "electronics");
clickCatBtn(mensBtn, "men's clothing");


//==========SORT BY===========================

priceBtn.addEventListener('click', () =>{
    displayedProducts.sort((a,b) => {
        if (a.price > b.price) 
        {return -1} 
    })
    insertCardsByArr(displayedProducts);
})


titleBtn.addEventListener('click', () =>{
    displayedProducts.sort((a,b) => {
        if (a.title > b.title) 
        {return 1} 
        else {return -1}
    })
    insertCardsByArr(displayedProducts);
})

ratingBtn.addEventListener('click', () =>{
    displayedProducts.sort((a,b) => {
        if (a.rating.rate > b.rating.rate) 
        {return -1}  
        else {return 1}
    })
    insertCardsByArr(displayedProducts);
})









// =================FUNCTIONS===================================



function clickCatBtn (btn, categoryStr) {
    btn.addEventListener('click', () => {
        clearDisplayedCards();
        displayedProducts = insertCardsByCategory(categoryStr)
    })
}

function removeNodesByClass(classStr){
    const cards = document.querySelectorAll(classStr);
    for (const card of cards){
        card.remove();
    };
}

//-----PRODUCT CARDS-------------
function clearDisplayedCards(){
    removeNodesByClass('.welcome-banner')
    removeNodesByClass('.product-card')
}

function insertCardsByArr(arr){
    clearDisplayedCards();
    writeCardsHTML(arr);
}

function writeCardsHTML(arr){
    for (const element of arr){
        grid.insertAdjacentHTML("beforeend", 
        `<div class="product-card">
            <h3>${element.title}</h3>
            <img src="${element.image}" alt="product img">
            <div class="description">
                ${element.description}
            </div>
            <div>
                <div class="price">
                    $ ${element.price}
                </div>
                <div data-id="${element.id}" class="card-btns">
                    <button class="cart-btn btn btn-primary round-pill">Add to cart</button>
                </div>
            </div>
            <div class="rating">
            <i class="fa-solid fa-star"></i> ${element.rating.rate}
            </div>
            <button data-id="${element.id}" class="remove-cart">
                Remove
            </button>
        </div> 
    </div>`);
    }

    //w remove button display:none
}

async function fetchProducts(){

    try{
        const returnValue = await fetch('https://fakestoreapi.com/products')
        allProducts = await returnValue.json();
    }
    catch(err){console.log(err.message)}

}

function insertCardsByCategory(categoryStr){
    let categoryArr = [];

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

    writeCardsHTML(categoryArr);
    displayedProducts = categoryArr;
    activateAddtoCartBtn();
    
};



//------USER CART-----------
// --fetchs list of all products and stores the selected items in userCart(global)
function displayCart(){
    clearDisplayedCards();
    if(userCart.length > 0){
        userCart = [];
    }
    for (const element of allProducts) {
        if(cartIds.includes(`${element.id}`)){
            userCart.push(element);
        }
    }

    writeCardsHTML(userCart);
    let CartBtnsRemove = document.querySelectorAll('.remove-cart')
    CartBtnsRemove.forEach(element => element.style.display= "block")

    let CartBtnsAdd = document.querySelectorAll('.cart-btn');
    CartBtnsAdd.forEach(element => element.style.display= "none")

    let nodeId 
    for (const node of CartBtnsRemove){ 
        node.addEventListener('click',function () {
            nodeId = node.dataset.id;

            console.log('node Id'+ nodeId)

            //filter item from userCart
            userCart = userCart.filter(function(value){
                console.log('prod id' + value.id)
                return value.id != nodeId;
            })
            clearDisplayedCards();
            writeCardsHTML(userCart);

            CartBtnsAdd = document.querySelectorAll('.cart-btn');
            CartBtnsAdd.forEach(element => element.style.display= "none")

            CartBtnsRemove = document.querySelectorAll('.remove-cart')
            CartBtnsRemove.forEach(element => element.style.display= "block")
        })
    }
    CartBtnsRemove = document.querySelectorAll('.remove-cart')
    CartBtnsRemove.forEach(element => element.style.display= "block")

    console.log('cart'+ userCart)
    
    displayedProducts = userCart;
    // let removeBtns = document.querySelectorAll('.remove-cart')
    // removeBtns.addEventListener('click', () =>{
    //     let btnId = this.dataset.id;
    //     foreach (btn => {
    //         if(product.id === btn.dataset.id ){

    //         }
    //     }) 
    //     }
    // })
}

function activateAddtoCartBtn(){
    const cartBtn = document.querySelectorAll('.cart-btn')
    for (const element of cartBtn){
        element.addEventListener('click', () =>{
            cartIds.push(element.parentElement.dataset.id)

        })
    }
    
};
























