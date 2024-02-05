let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');


openShopping.addEventListener('click', ()=>{ // These lines add event listeners to the elements selected above. When the element with class 'shopping' is clicked, the 'active' class is added to the body, and when the element with class 'closeShopping' is clicked, the 'active' class is removed from the body.
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [                     //Here, an array products is declared, containing objects representing different products. listCards is initialized with the data retrieved from the 'cart' key in the localStorage, or an empty array if there is no data.
    {
        id: 1,                           
        name: 'PRODUCT NAME 1',
        image: '1.PNG',
        price: 25
    },
    {
        id: 2,
        name: 'PRODUCT NAME 2',
        image: '2.PNG',
        price: 27
    },
    {
        id: 3,
        name: 'PRODUCT NAME 3',
        image: '3.PNG',
        price: 29
    },
    {
        id: 4,
        name: 'PRODUCT NAME 4',
        image: '4.PNG',
        price: 30
    },
    {
        id: 5,
        name: 'PRODUCT NAME 5',
        image: '5.PNG',
        price: 32
    },
    {
        id: 6,
        name: 'PRODUCT NAME 6',
        image: '6.PNG',
        price: 33
    }
];
let listCards = JSON.parse(localStorage.getItem('cart')) || [];  // localStorage.getItem('cart'): Retrieves the value stored in the 'cart' key of the browser's local storage.

//JSON.parse(...): Converts the retrieved value from a JSON-formatted string to a JavaScript object. Local storage stores data as strings, so this step is necessary to convert it back into a usable object.

//|| []: The || (logical OR) operator is used here for fallback. If the value retrieved from local storage is null (indicating that there is no data stored in the 'cart' key), the right side of the || operator is used as a default value. In this case, an empty array [] is assigned to listCards.
function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Cart</button>
            <button onclick="buyNow(${key})">Buy Now</button>`;
        list.appendChild(newDiv);
    });
}
initApp();
// function buyNow(key) {
//     addToCard(key); 
//     body.classList.remove('active');
// }

function addToCard(key) {
    if (listCards[key] == null) {  // : This condition checks whether there is already an entry for the product with the specified key in the listCards array. If there is no entry (it is null or undefined), it means the product is not in the shopping cart.
        listCards[key] = JSON.parse(JSON.stringify(products[key]));   // listCards[key] = JSON.parse(JSON.stringify(products[key]));: If the product is not in the shopping cart, this line creates a deep copy of the product from the products array using JSON.stringify and JSON.parse. This step ensures that modifications to the product in the shopping cart won't affect the original product in the products array.
        listCards[key].quantity = 1; // : Sets the quantity of the added product to 1 since it's the first time the product is being added to the cart
    }
    saveCartToLocalStorage(); // Calls the saveCartToLocalStorage function to update the local storage with the modified listCards array, ensuring that the shopping cart state is stored persistently.
    reloadCard();
}

function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
            <div><img src="image/${value.image}"/></div>
            <div>${value.name}</div>
            <div>${value.price.toLocaleString()}</div>
            <div>
                <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                <div class="count">${value.quantity}</div>
                <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
            </div>
            <button onclick="buyNow(${key})">Buy Now</button>`; 
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity) {
    if (quantity == 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    saveCartToLocalStorage(); 
    reloadCard();
}


function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(listCards));
}


window.addEventListener('load', () => {
    listCards = JSON.parse(localStorage.getItem('cart')) || [];
    reloadCard();
});
