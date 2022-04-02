const modalOpen = '[data-open]'
const modalClose = '[data-close]'
const isVisible = 'is-visible'

const openModal = document.querySelectorAll(modalOpen);
const closeModal = document.querySelectorAll(modalClose);
//full site modal open buttons
for (const elm of openModal) {
    elm.addEventListener('click', function(){
         const modalID = this.dataset.open;
         document.getElementById(modalID).classList.add(isVisible);
    })
}

for (const elm of closeModal){
    elm.addEventListener('click', function(){
        this.parentElement.parentElement.classList.remove(isVisible)
    })
}