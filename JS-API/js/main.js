
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

let arrRemoveBtns = []

let cartIds = [];
let userCart = new Array();
let displayedProducts = [];


const cartBtnNav = document.getElementById('cart');
const sortLinks = document.querySelectorAll('.sort-link');



//======API==========
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

activateSortBtn(priceBtn);
activateTitleBtn(titleBtn);


// ratingBtn.addEventListener('click', () =>{
//     displayedProducts.forEach(function(elm) {
//         elm = elm.sort(function (a,b){  
//             return a.price - b.price
//         })
//         console.log(elm)
//         insertCardsByArr(elm);
//     })

// })








// =================FUNCTIONS===================================

async function fetchProducts(){

    try{
        const returnValue = await fetch('https://fakestoreapi.com/products')
        allProducts = await returnValue.json();
    }
    catch(err){console.log(err.message)}

    console.log(allProducts)
}

// -----HEADER BUTTONS-----------
function clickCatBtn (btn, categoryStr) {
    btn.addEventListener('click', () => {
        clearDisplayedCards();
        insertCardsByCategory(categoryStr)
        let arr = Array.from(displayedProducts[0])
        document.getElementById("results-found").innerHTML =  arr.length + ' Results Found';
    })
}

function activateSortBtn(btn){
    btn.addEventListener('click', () =>{
        displayedProducts.forEach(function(elm) {
            elm = elm.sort(function (a,b){  
                return a.price - b.price
            })
            console.log(elm)
            insertCardsByArr(elm);
        })

    })
}

function activateTitleBtn(btn){
    let i = 1;
    btn.addEventListener('click', () =>{
        if(i % 2 !== 0){
            displayedProducts.forEach(function(elm) {
                elm = elm.sort(function (a,b){  
                        
                    if (a.title < b.title) {
                        return -1;
                    }
                        if (a.title > b.title) {
                        return 1;
                    }
                })
                console.log(elm)
                insertCardsByArr(elm);
                document.getElementById("title").innerHTML = "Title Z-A";
                console.log(i)
                
 
                i++
            })
        }
        else{
            displayedProducts.forEach(function(elm) {
                elm = elm.sort(function (a,b){  
                        
                    if (a.title > b.title) {
                        return -1;
                    }
                        if (a.title > b.title) {
                        return 1;
                    }
                })
                console.log(elm)
                insertCardsByArr(elm);
                document.getElementById("title").innerHTML = "Title A-Z";
                console.log(i)
                
 
                i++
            })

        }
        
    })

}
    

//-----PRODUCT CARDS-------------
function clearDisplayedCards(){
    removeNodesByClass('.welcome-banner')
    removeNodesByClass('.product-card')
}

function insertCardsByCategory(categoryStr){
    // let i = 1;
    let categoryArr = [];

    // if(i===1){
    //     makeBold(titleBtn)
    //     i++
    // }


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
    categoryArr.sort(function (a,b){             
        if (a.title < b.title) {
            return -1;
        }
            if (a.title > b.title) {
            return 1;
        }
    })
    insertCardsByArr(categoryArr)
    //update displayedproducts
    displayedProducts = [];
    displayedProducts.push(categoryArr);
    console.log(displayedProducts);
    activateAddtoCartBtn();
};

function insertCardsByArr(arr){
    clearDisplayedCards();
    writeCardsHTML(arr);

}

function writeCardsHTML(arr){
    for (const element of arr){
        // console.log(element.rating.rate)
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

    activateRemoveBtns();
}

function activateRemoveBtns () {

    arrRemoveBtns = document.querySelectorAll('.remove-cart-btn')
    let productId; 
    for (const btn of arrRemoveBtns){ 
        btn.addEventListener('click',function () {
            productId = btn.dataset.id;

            //filter item from userCart
            userCart = userCart.filter(function(obj){
                return obj.id != productId;
            })
            cartIds = [];
            for (const element of userCart){
                    cartIds.push(element.id)  
            }

            console.log(`userCart: ${userCart}`)

            insertCardsByArr(userCart);
            showRemoveBtn();
            hideAddToCartBtn();
        })
    }
}

//------USER CART-----------
function displayCart(){
    // let elm = document.getElementById("results-found")
    // elm.style.display= "none"

    clearDisplayedCards();

    // if(userCart.length > 0){
    //     userCart = [];
    // }
// add to cartlist
    for (const element of allProducts) {
        if(cartIds.includes(`${element.id}`)){
            userCart.push(element);
        }
    }

    insertCardsByArr(userCart);

    // arrRemoveBtns = document.querySelectorAll('.remove-cart-btn')

    //add-to-cart btn show or dont
    showRemoveBtn();
    hideAddToCartBtn();

    activateRemoveBtns();
    
    displayedProducts = userCart;
}

function showRemoveBtn(){
    let CartBtnsRemove = document.querySelectorAll('.remove-cart-btn')
    CartBtnsRemove.forEach(element => element.style.display= "block")
}
function hideAddToCartBtn(){
    let CartBtnsAdd = document.querySelectorAll('.cart-btn');
    CartBtnsAdd.forEach(element => element.style.display= "none")
}

function activateAddtoCartBtn(){
    const cartBtn = document.querySelectorAll('.cart-btn')
    for (const element of cartBtn){
        element.addEventListener('click', () =>{
            cartIds.push(element.parentElement.dataset.id)

        })
    }
    
};

// ------TOOLS--------------------
function removeNodesByClass(classStr){
    const cards = document.querySelectorAll(classStr);
    for (const card of cards){
        card.remove();
    };
}

function toggleBold(elm){
    const cssDeclaration = window.getComputedStyle(elm)
    const val = cssDeclaration.getPropertyValue('font-weight')
    (val => {
        if(val === 400){
            elm.style.fontWeight = '700'
        }
    }
    )

    // elm.style.fontWeight = '700'
}






















