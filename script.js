/*MENU JS*/
let navibar = document.querySelector('.navibar');

document.querySelector('#menu-btn').onclick = () =>{
    navibar.classList.toggle('active');
    cartItem.classList.remove('active');
    searchForm.classList.remove('active');
}

/*CART JS*/
let cartItem = document.querySelector('.cart-items-container');

document.querySelector('#cart-btn').onclick = () =>{
    navibar.classList.remove('active');
    searchForm.classList.remove('active');
}
let searchForm = document.querySelector('.search-form');

/* para to sa lahat ng button, pag pinindot mo yung search-btn lalabas ang searchbtn pag pinindot mo naman yung cart, cart yung lalabas */

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    navibar.classList.remove('active');
    cartItem.classList.remove('active');
}

 /*pag nag scroll ka mawawala siya, pag pinindot mo or clinick mo */

window.onscroll = () => {
    navibar.classList.remove('active');
    searchForm.classList.remove('active');

}
/* Pag pinindot yung add to cart, mag co-count siya, kung ilan na yung nasa cart mo*/
let cart = document.querySelector('.cart-item');
let cartfield = document.querySelector('.box-container');
let add = document.getElementsByClassName('add');
/*
for(let but of add){
    but.onclick = e=> {
        let item = Number(cart.getAttribute('data-count') || 0);
        cart.setAttribute('data-count', item + 1);
        cart.classList.add('on');

        /*image ng product na mapupunta siya sa cart 
        let parent = e.target.parentNode.parentNode.parentNode;
        let image = parent.querySelector('img');
        let span = document.createElement('span');
        span.className = 'image-carior';
        parent.insertBefore(span, parent.lastElementChild);

        let s_image = image.cloneNode(false);
        span.appendChild(s_image);
        span.classList.add('active');
        setTimeout(()=>{
        span.classList.remove('active');
        span.removeChild(s-image);
        }, 500);
    }
}*/

/* CART LIST OF ITEMS */ 
let fashoppingcart = document.querySelector('.fa-shopping-cart');
let closeCart = document.querySelector('.close');
let body = document.querySelector('body');
let listProductHTML = document.querySelector('.listProducts');
let listCartHTML = document.querySelector('.listCart');
let fashoppingcartSpan = document.querySelector('.fa-shopping-cart span');


let listProducts = [];
let carts = [];

fashoppingcart.addEventListener('click', ()=> {
    body.classList.toggle('showCart')
})
closeCart.addEventListener('click', ()=> {
    body.classList.toggle('showCart')
})

const addDataToHTML = () => {
    listProductHTML.innerHTML = '';
    if(listProducts.length > 0){
        listProducts.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('box');
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = `
            <img src=${product.image} alt="">
                    <h3>${product.name}</h3>
                    <div class="price">₱${product.price}</div> 
                    <button class="add">Add to Cart</button>
            `;
                listProductHTML.appendChild(newProduct);
        })
    }
}
listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('add')) {
        let product_id = positionClick.parentElement.dataset.id;
        addToCart(product_id);
    }
})

const addToCart = (product_id) => {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    if (carts.length <= 0) {
        carts = [{
            product_id: product_id,
            quantity: 1
        }]        
    }else if (positionThisProductInCart < 0) {
        carts.push({
            product_id: product_id,
            quantity: 1
        });
    }else{
        carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity + 1;
    }
    addToHTML();
    /*addToMemory();*/
}
    /*const addToMemory = () => {
        localStorage.setItem('cart', JSON.stringify(carts));
    }*/
    const addToHTML = () => { 
        listCartHTML.innerHTML = '';
        let totalQuantity = 0;
        if(carts.length > 0) {
            carts.forEach(cart => {
                totalQuantity = totalQuantity + cart.quantity;
                let newCart = document.createElement('div');
                newCart.classList.add('item'); /*Box*/
                let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id);
                let info = listProducts[positionProduct];
                newCart.innerHTML = `
                        <div class="image">
                                    <img src="${info.image}" alt="">
                                </div>
                                <div class="name">
                                    ${info.name}
                                </div>
                                <div class="totalPrice">
                                    ₱${info.price * cart.quantity}
                                </div>
                                <div class="quantity">
                                    <span>${cart.quantity}</span>
                                </div>   
                                `;
            listCartHTML.appendChild(newCart);
            })
        }
        fashoppingcartSpan.innerText = totalQuantity;
    }

const initApp = () => {
    /* DATA MULA SA PRODUCTS.JSON*/
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
        listProducts= data;
        addDataToHTML();
    })
}
initApp();
