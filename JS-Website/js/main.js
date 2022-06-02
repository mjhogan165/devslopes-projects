const theme ='theme';
const dataTheme = 'data-theme';
const themeTab = '.theme-tab';
const switcherBtn = '.switcher-btn';
const dark = 'dark';
const light = 'light';
const open = 'open';
const active = 'active';

const modalOpen = '[data-open]';
const modalClose = '[data-close]';
const isVisible = 'is-visible';

const dataFilter = '[data-filter]';
const portfolioData = '[data-item]';

const root = document.documentElement;

// Theme shortcuts
const toggleTheme = document.querySelector(themeTab);
const switcher = document.querySelectorAll(switcherBtn);
const currentTheme = localStorage.getItem(theme);

// Modal
const openModal = document.querySelectorAll(modalOpen);
const closeModal = document.querySelectorAll(modalClose);





//create html with data challenge

let cardObjArr = [
{
    dataItem: "web",
    img: "./assets/images/portfolio-1.jpg",
    href: "#",
    header: "Web Developement",
    subHeader: "Food Web",
},
{
    dataItem: "web",
    img: "./assets/images/portfolio-2.jpg",
    href: "#",
    header: "Web Developement",
    subHeader: "Skate Website",
},
{
    dataItem: "web",
    img: "./assets/images/portfolio-3.jpg",
    href: "#",
    header: "Web Developement",
    subHeader: "Eating Website",
},
{
    dataItem: "ui",
    img: "./assets/images/portfolio-4.jpg",
    href: "#",
    header: "UI Design",
    subHeader: "Cool Design",
},
{
    dataItem: "app",
    img: "./assets/images/portfolio-5.jpg",
    href: "#",
    header: "App Developement",
    subHeader: "Game App",
},
{
    dataItem: "app",
    img: "./assets/images/portfolio-6.jpg",
    href: "#",
    header: "App Developement",
    subHeader: "Gambling App",
},
{
    dataItem: "app",
    img: "./assets/images/portfolio-7.jpg",
    href: "#",
    header: "App Developement",
    subHeader: "Money App",
},
{
    dataItem: "ui",
    img: "./assets/images/portfolio-8.jpg",
    href: "#",
    header: "UI Design",
    subHeader: "Fantastic Design",
},

];

// const portfolioGrid = document.getElementById("portfolio-grid");

// const makeCards = () => {
//     let cardArr = cardObjArr.map(function(elm){
//         return `<div class="portfolio-card" data-open="web-1" data-item="${elm.dataItem}">
//         <div class="card-body">
//             <img src="${elm.img}" alt="portfolio icon">
//             <a href="${elm.href}" class="card-popup-box">
//                 <div>${elm.header}</div>
//                 <h3>${elm.subHeader}</h3>
//             </a>
//         </div>
//     </div>`
//     }).join("");
//     portfolioGrid.innerHTML = cardArr;

// }

// makeCards();

// Portfolio
const filterLink = document.querySelectorAll(dataFilter);
const portfolioItems = document.querySelectorAll(portfolioData);
const searchBox = document.querySelector('#search');


// themes
const setTheme = (val) => {
    if (val === dark) {
        root.setAttribute(dataTheme, dark);
        //set in local storage
        localStorage.setItem(theme, dark);
    }
    else {
        root.setAttribute(dataTheme, light);
        localStorage.setItem(theme, light);
    }
}
// checks to restore previous theme after re open
if (currentTheme) {
    root.setAttribute(dataTheme, currentTheme);
    switcher.forEach((btn)=> {
        btn.classList.remove(active);
    });

    if (currentTheme === dark){
        switcher[1].classList.add(active);
    }
    else {
        switcher[0].classList.add(active);
    }
}

// filtering portfolio with nav
for (const link of filterLink){
    link.addEventListener('click', function() {
        setActive(link, '.filter-link');
        const filter = this.dataset.filter;
        portfolioItems.forEach((card => {
            if (filter === 'all') {
                card.style.display = 'block';
            } else if (card.dataset.item === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }

        }))
    })
}

const setActive = (elm, selector)=> {
    if (document.querySelector(`${selector}.${active}`) !== null){
        document.querySelector(`${selector}.${active}`).classList.remove(active);
    }
    elm.classList.add(active);
};


//searchbar logic 

searchBox.addEventListener('keyup', (e) => {
    const searchInput = e.target.value.toLowerCase().trim();
   
    portfolioItems.forEach((card) => {
        if (card.dataset.item.includes(searchInput)) {
            card.style.display = 'block';
        }
        else {
            card.style.display = 'none'
        }
    })

})

toggleTheme.addEventListener('click', function() {
    const tab = this.parentElement.parentElement;
    if (!tab.className.includes(open)){
        tab.classList.add(open);
    }
    else {
        tab.classList.remove(open)
    }
})
 
for(const elm of switcher) {
    elm.addEventListener('click', function(){
        const toggle = this.dataset.toggle;
        setActive(elm, switcherBtn);
        setTheme(toggle);
    })
}

//modal/full site modal open buttons
for (const elm of openModal) {
    elm.addEventListener('click', function(){
         const modalID = this.dataset.open;
         document.getElementById(modalID).classList.add(isVisible);
    })
}

for (const elm of closeModal) {
    elm.addEventListener('click', function(){
        this.parentElement.parentElement.parentElement.classList.remove(isVisible)
    })
}


// Modal

document.addEventListener('click', (e) => {
    console.log(e.target, document.querySelector('.modal.is-visible'));
    if (e.target === document.querySelector('.modal.is-visible')) {
        document.querySelector('.modal.is-visible').classList.remove(isVisible);
    }
})

document.addEventListener('keyup', (e) => {
    if (e.key === 'Escape') {
        document.querySelector('.modal.is-visible').classList.remove(isVisible);
    }
})


const elmsDisplayed = getComputedStyle(root).getPropertyValue('--marquee-elms-displayed');
const marqueeContent = document.querySelector('ul.marquee-content');

root.style.setProperty('--marquee-elms', marqueeContent.children.length);

for(let i = 0; i < elmsDisplayed; i += 1){
    marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true))
}

