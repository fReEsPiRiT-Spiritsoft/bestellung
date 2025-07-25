/** 
 * get dishes from the db.js dishes array
 * and render them to the dish container
 * @param dishes - array of dish objects
 * @returns {string} - HTML string of dish elements
 */
function renderdishes(dishes) {
    let dishContainer = document.getElementById('dish');
    dishContainer.innerHTML = dishes.map(dishTemplate).join('');
}

/** 
 * get orders from the db.js orders array
 * and render them to the order container
 * @param orders - array of order objects
 * @returns {string} - HTML string of order elements
 */
function renderCard(orders) {
    let cardInner = document.querySelector('#card .card-inner');
    let cardSumContainer = document.getElementById('card-sum');
    cardInner.innerHTML = '<h2>Warenkorb</h2>' + orders.map(cardTemplate).join('');
}

/**
 * start function to run the Script
  */
function init() {
    renderdishes(dishes);
    renderCard(orders);
    updateCartSummary()
}

/**
 * Add the dishes to the cart
 * @param {number} id - the id of the dish to add
 * This function finds the dish by id, gets the amount from the input field,
  */
function addToCart(id) {
    let currentDish = dishes.find(dish => dish.id === id);
    let amountInput = document.querySelector(`input.amount[data-id="${id}"]`);
    let amount = parseInt(amountInput.value);
    let existingOrder = orders.find(order => order.id === id);
    if (existingOrder) {
        existingOrder.amount += amount;
    } else {
        orders.push({ ...currentDish, amount });
    }
    renderCard(orders);
    updateCartSummary();
    renderMobileCart()
}

/**
 * Remove the dishes from the cart
 * @param {number} id - the id of the dish to remove
  */
function removeFromCart(id) {
    let existingOrder = orders.find(order => order.id === id);
    if (existingOrder) {
        if (existingOrder.amount > 1) {
            existingOrder.amount -= 1;
        } else {
            orders = orders.filter(order => order.id !== id);
        }
    }
    renderCard(orders);
    updateCartSummary();
    renderMobileCart()

}

/**
 * function to update the cart summary
 * This function calculates the total amount of the orders,
 * updates the cart summary in the desktop view,
 * and updates the cart summary in the mobile view.
  */
function updateCartSummary() {
    let totalAmount = orders.reduce((sum, order) => sum + order.price * order.amount, 0);
    let cardSumContainer = document.getElementById('card-sum');
    let cartMobileSum = document.getElementById('cart-mobile-sum');
    let cardMobileBtn = document.getElementById('cost');
    cartMobileSum.textContent = totalAmount.toFixed(2).replace('.', ',') + ' €';
    totalAmount = totalAmount.toFixed(2).replace('.', ',')
    cardSumContainer.innerHTML = `<h3>Gesamt: ${totalAmount} €</h3><button onclick="completeOrder()" class="btn" id="purchase">Jetzt Bezahlen</button>`;
    cartMobileSum.innerHTML = `<p> ${totalAmount} €</p>`;
    cardMobileBtn.innerHTML = `<p> ${totalAmount} €</p>`;
}

/**
 * Function to open the mobile cart overlay
  */
function openMobileCart() {
    document.getElementById('cart-overlay').style.display = 'block';
    updateCartSummary();
}

/**
 * Function to render the mobile cart
 * This function updates the cart content in the mobile view
  */
function renderMobileCart() {
    let cartContent = document.getElementById('cart-content');
    cartContent.innerHTML = orders.map(cardTemplate).join('');
    updateCartSummary();
}

/**
 * Function to close the mobile cart overlay
 * This function hides the cart overlay when called
  */
function closeMobileOverlay() {
    document.getElementById('cart-overlay').style.display = 'none';
    
}

/**
 * Function to complete the order
 * This function clears the orders array, updates the cart display,
  */
function completeOrder() {
    orders = [];
    renderCard(orders);
    updateCartSummary();
    renderMobileCart()
    let completeOrder = document.getElementById('cart-overlay');
    completeOrder.innerHTML = `<span class="closebtn" onclick="closeMobileOverlay()">&times;</span><h2>Bestellung abgeschlossen! <br> Vielen Dank für Ihre Bestellung <br><br> Das MampfMobil ist unterwegs zu dir</h2>`
    document.getElementById('cart-overlay').style.display = 'block';
    setTimeout(() => location.reload(), 3000); 
}

/**
 * Event listener to close the mobile cart overlay
 * This listener checks if the click event target is the overlay itself,
  */
document.getElementById('cart-overlay').addEventListener('click', function(event) {
    if (event.target === this) {
        closeMobileOverlay();
    }
});