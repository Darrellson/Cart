const openShopping = document.querySelector('.shopping');
const closeShopping = document.querySelector('.closeShopping');
const list = document.querySelector('.list');
const listCard = document.querySelector('.listCard');
const body = document.querySelector('body');
const total = document.querySelector('.total');
const quantity = document.querySelector('.quantity');
const plusButton = document.getElementById('plusButton');
const plusDiv = document.getElementById('plusDiv');
const addCancelButton = document.getElementById('addCancelButton'); 

plusButton.addEventListener('click', () => {
    if (plusDiv.style.display === 'none' || plusDiv.style.display === ''){
        plusDiv.style.display = 'block'; 
    } else {
        plusDiv.style.display = 'none';
    }
});


addCancelButton.addEventListener('click', () => {
    plusDiv.style.display = 'none';
});


openShopping.addEventListener('click', ()=>{ 
    body.classList.toggle('active');
})

closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

const products = [                
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

const listCards = JSON.parse(localStorage.getItem('cart')) || [];  

const initApp = () => {
    products.forEach((value, key) => {
        const newDiv = document.createElement('div');
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


const addToCard = (key) => {
    if (listCards[key] == null) {  
        listCards[key] = JSON.parse(JSON.stringify(products[key]));   
        listCards[key].quantity = 1; 
    }
    saveCartToLocalStorage(); 
    reloadCard();
}

const  reloadCard = () => {
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

const changeQuantity = (key, quantity) => {
    if (quantity == 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    saveCartToLocalStorage(); 
    reloadCard();
}


const saveCartToLocalStorage = () => {
    localStorage.setItem('cart', JSON.stringify(listCards));
}

const deleteItem = () => {
    localStorage.setItem('cart', JSON.stringify(listCards));
}


window.addEventListener('load', () => {
    listCards = JSON.parse(localStorage.getItem('cart')) || [];
    reloadCard();
});


const linkInput = document.getElementById('linkInput');
const priceInput = document.getElementById('priceInput');
const nameInput = document.getElementById('nameInput');
const addCardButton = document.getElementById('addCardButton');
const displayArea = document.getElementById('displayArea');


const cards = [];

const addCard = () => {
    const link = linkInput.value;
    const price = parseFloat(priceInput.value);
    const name = nameInput.value;

    const newCard = {
        id: products.length + 1,
        link: link,
        price: price,
        name: name
    };

    products.push(newCard);
    initApp(); 

    cards.push(newCard);
    displayCard(newCard);

    linkInput.value = '';
    priceInput.value = '';
    nameInput.value = '';
}


const displayCard = (card) => {
    const cardElement = document.createElement('div');
    cardElement.innerHTML = `
        <p><strong>Link:</strong> ${card.link}</p>
        <p><strong>Price:</strong> $${card.price.toFixed(2)}</p>
        <p><strong>Name:</strong> ${card.name}</p>
        <hr>
    `;

    displayArea.appendChild(cardElement);
}

addCardButton.addEventListener('click', addCard);







