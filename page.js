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
const debitCardDetails = document.getElementById('debitCardDetails');
const addDebit = document.getElementById('addDebit');
const cardCloseButton = document.getElementById('cardCloseButton');
const DebitCancelButton = document.getElementById('DebitCancelButton');
const addDebitButton = document.getElementById('saveDebitCard');

// Check if the clicked element is not inside plusDiv and is not the plusButton
body.addEventListener('click', (event) => !plusDiv.contains(event.target) && event.target !== plusButton ? plusDiv.classList.add('none') : null);
// make cancel close clickable
[cardCloseButton, DebitCancelButton].forEach(button => {
    button.addEventListener('click', () => {
        debitCardDetails.classList.toggle('none');
    });
});
// make cross cancele plus clickable 
[plusButton, addCancelButton, closeButton].forEach(button => {
    button.addEventListener('click', () => {
        plusDiv.classList.toggle('none');
    });
});
// opens and close cart
[openShopping, closeShopping].forEach(button => {
    button.addEventListener('click', () => {
        body.classList.toggle('active');
    });
});
// Function to fetch products array from JSON file
const fetchProducts = async () => { // // Define an asynchronous function to fetch products from 'products.json'
    try {
       // Use await to asynchronously fetch data from 'products.json'
      const response = await fetch('products.json');
       // Check if the response is not okay (status code other than 200)
      if (!response.ok) {
          // Throw an error if the response is not okay
        throw new Error('Network response was not ok');
      }
        // Use await to parse the JSON data from the response asynchronously
      const data = await response.json();
       // Return the parsed data
      return data;
    } catch (error) {
      // If any error occurs during the fetch process, catch it and throw a new error
      throw new Error('There was a problem fetching the products: ' + error);
    }
  }
  // Function to handle fetching products and updating UI
  const initializeApp = async () => {
    try {
      // Call the fetchProducts function to asynchronously fetch the products
      const data = await fetchProducts();
      // Update the products array with the fetched data
      products = data;
      // Initialize the application with the updated products
      initApp();
      updateCartDisplay();
    } catch (error) {
      console.error(error);
    }
  }
  initializeApp();
// Define an array to store the cart items
let cartItems = [];
// buy now function
const buyNow = (key) => {
    const product = products[key];
    console.log("Buying Product:", product);
    // Display debit card details input fields
    document.getElementById('debitCardDetails').classList.remove('none');
}
const saveDebitCard = () => {
    const debitCardNumber = document.getElementById('debitCardNumber').value.trim();
    const debitCardCVV = document.getElementById('debitCardCVV').value.trim();
    const debitCardLastName = document.getElementById('debitCardLastName').value.trim();
    const debitCardFirstName = document.getElementById('debitCardFirstName').value.trim();

    if (!debitCardNumber || !debitCardCVV || !debitCardLastName || !debitCardFirstName) {
        return alert("Please fill in all fields.");
    }

    const debitCardInfo = {
        cardNumber: debitCardNumber,
        cvv: debitCardCVV,
        lastName: debitCardLastName,
        firstName: debitCardFirstName
    };

    console.log("Debit Card Information:", debitCardInfo);

    // You can add further processing or actions here

    // Clear input fields after saving
    document.getElementById('debitCardNumber').value = '';
    document.getElementById('debitCardCVV').value = '';
    document.getElementById('debitCardLastName').value = '';
    document.getElementById('debitCardFirstName').value = '';

    // Hide the debit card details form after saving
    debitCardDetails.classList.add('none');
}

// Add event listener to the "Save" button to trigger the saveDebitCard function
addDebitButton.addEventListener('click', saveDebitCard);
// Add event listener to the CVV input field
const debitCardCVVInput = document.getElementById('debitCardCVV');
debitCardCVVInput.addEventListener('input', () => {
    const cvvValue = debitCardCVVInput.value.trim();
    if (/[a-zA-Z]/.test(cvvValue)) {
        alert("CVV should only contain numbers.");
        // Clear the input field or take any other necessary action
    }
});

// Add event listener to the Debit Card Number input field
const debitCardNumberInput = document.getElementById('debitCardNumber');
debitCardNumberInput.addEventListener('input', () => {
    const cardNumberValue = debitCardNumberInput.value.trim();
    if (/[a-zA-Z]/.test(cardNumberValue)) {
        alert("Debit Card Number should only contain numbers.");
        // Clear the input field or take any other necessary action
    }
});
// Function to initialize the application
const initApp = () => {
    list.innerHTML = "";
    products.forEach((value, key) => {
        const newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCart(${key})">Add To Cart</button>
            <button onclick="buyNow(${key})">Buy Now</button>
            <button class="removeCardButton" onclick="removeCard(${key})">Remove</button>`; // Added onclick event for remove button
        list.appendChild(newDiv);
    });
}

// Function to remove card from display and local storage
const removeCard = (key) => {
    // Remove the card from the products array
    products.splice(key, 1);

    // Update the display and local storage
    initApp();
    localStorage.setItem('products', JSON.stringify(products));
}

// Initialize the application when the window loads
window.addEventListener('load', () => {
    // Retrieve products from local storage if available, otherwise initialize with default products
    products = (localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [...products]);

    // Initialize the application
    initApp();
    updateCartDisplay();
});
// Function to add item to cart
const addToCart = (key) => {
    const product = products[key];
    const index = cartItems.findIndex(item => item.id === product.id);

    index !== -1 ? cartItems = [...cartItems.slice(0, index), {...cartItems[index], quantity: cartItems[index].quantity + 1}, ...cartItems.slice(index + 1)] : cartItems = [...cartItems, {...product, quantity: 1}];
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
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}
// Function to change item quantity in cart
const changeQuantity = (index, newQuantity) => {
    newQuantity <= 0 ? cartItems.splice(index, 1) : cartItems[index].quantity = newQuantity;

    // Update cart display
    updateCartDisplay();
}

// Function to add a new card to the products array and save it to local storage
const addCard = () => {
    const link = linkInput.value.trim();
    const price = parseFloat(priceInput.value);
    const name = nameInput.value.trim();

    if (!link || !price || isNaN(price) || !name) return alert("Please fill in all fields.");

    // Check if a card with the same name already exists
    const existingCard = products.find(card => card.name === name);
    if (existingCard) {
        return alert("A card with the same name already exists.");
    }

    let newCard = {
        id: products.length + 1,
        link: link,
        price: price,
        name: name
    };

    // Add the new card to the products array
    products = [...products, newCard];

    // Save the updated products array to local storage
    localStorage.setItem('products', JSON.stringify(products));
    initApp();

    // Update the display to show the new card
    displayCard(newCard);

    // Clear input fields
    linkInput.value = '';
    priceInput.value = '';
    nameInput.value = '';
}

// Modify the displayCard function to include a close button for each card
const displayCard = (card) => {
    const cardElement = document.createElement('div');
    cardElement.setAttribute('data-card-name', card.name); // Set data-card-name attribute
    cardElement.innerHTML = `
        <p><strong>Link:</strong> ${card.link}</p>
        <p><strong>Price:</strong> $${card.price.toFixed(2)}</p>
        <p><strong>Name:</strong> ${card.name}</p> 
        <hr>
    `;

    displayArea.appendChild(cardElement);
}
// Add event listener to the "Add Card" button only if it's not already attached
if (!addCardButton.onclick) {
    addCardButton.addEventListener('click', addCard);
}

