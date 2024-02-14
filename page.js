const openShopping = document.querySelector('.shopping');
const closeShopping = document.querySelector('.closeShopping');
const list = document.querySelector('.list');
const listCard = document.querySelector('.listCard');
const body = document.querySelector('body');
const total = document.querySelector('.total');
const quantity = document.querySelector('.quantity');
const plusButton = document.getElementById('plusButton');
const closeButton =document.getElementById('closeButton')
const plusDiv = document.getElementById('plusDiv');
const addCancelButton = document.getElementById('addCancelButton');
const linkInput = document.getElementById('linkInput');
const priceInput = document.getElementById('priceInput');
const nameInput = document.getElementById('nameInput');
const addCardButton = document.getElementById('addCardButton');
const displayArea = document.getElementById('displayArea');

// Check if the clicked element is not inside plusDiv and is not the plusButton
body.addEventListener('click', (event) => {
    if (!plusDiv.contains(event.target) && event.target !== plusButton) {
        plusDiv.classList.add('none');
    }
});

plusButton.addEventListener('click', () => {
    plusDiv.classList.toggle('none');
});

addCancelButton.addEventListener('click', () => {
    plusDiv.classList.toggle('none');
});

closeButton.addEventListener('click', () => {
    plusDiv.classList.toggle('none');
});

openShopping.addEventListener('click', () => {
    body.classList.toggle('active');
});

closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

let products = [
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

let cards = [];
// Define an array to store the cart items
let cartItems = [];

// Initialize the application
const initApp = () => {
    products.forEach((value, key) => {
        const newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCart(${key})">Add To Cart</button>
            <button onclick="buyNow(${key})">Buy Now</button>`;
        list.appendChild(newDiv);
    });
}

// Function to add item to cart
const addToCart = (key) => {
    const product = products[key];
    const index = cartItems.findIndex(item => item.id === product.id);

    if (index !== -1) {
        // If item already exists in cart, increase its quantity
        cartItems[index].quantity++;
    } else {
        // If item doesn't exist in cart, add it
        cartItems.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    // Update cart display
    updateCartDisplay();
}

// Function to update cart display
const updateCartDisplay = () => {
    listCard.innerHTML = '';
    let totalPrice = 0;
    let totalCount = 0;

    cartItems.forEach((item, index) => {
        const { id, name, price, quantity } = item;
        totalPrice += price * quantity;
        totalCount += quantity;

        const newDiv = document.createElement('li');
        newDiv.innerHTML = `
            <div><img src="image/${products[id - 1].image}"/></div>
            <div>${name}</div>
            <div>${(price * quantity).toLocaleString()}</div>
            <div>
                <button onclick="changeQuantity(${index}, ${quantity - 1})">-</button>
                <div class="count">${quantity}</div>
                <button onclick="changeQuantity(${index}, ${quantity + 1})">+</button>
            </div>
            <button onclick="buyNow(${index})">Buy Now</button>`;
        listCard.appendChild(newDiv);
    });

    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = totalCount;
}

// Function to change item quantity in cart
const changeQuantity = (index, newQuantity) => {
    if (newQuantity <= 0) {
        // If quantity becomes zero, remove the item from cart
        cartItems.splice(index, 1);
    } else {
        // Update the quantity of the item
        cartItems[index].quantity = newQuantity;
    }

    // Update cart display
    updateCartDisplay();
}

// Initialize the application when the window loads
window.addEventListener('load', () => {
    initApp();
    updateCartDisplay();
});
// adding new card
const addCard = () => {
    const link = linkInput.value;
    const price = parseFloat(priceInput.value);
    const name = nameInput.value;

    let newCard = {
        id: products.length + 1,
        link: link,
        price: price,
        name: name
    };

    products = [...products, newCard];
    initApp();
    displayCard(newCard);

    linkInput.value = '';
    priceInput.value = '';
    nameInput.value = '';
}
// displays added new iteam
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
