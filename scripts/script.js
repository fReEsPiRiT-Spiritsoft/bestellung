function renderdishes(dishes) {
    let dishContainer = document.getElementById('dish');
    dishContainer.innerHTML = dishes.map(dishTemplate).join('');
}

function renderCard(orders) {
    let cardInner = document.querySelector('#card .card-inner');
    let cardSumContainer = document.getElementById('card-sum');
    cardInner.innerHTML = '<h2>Warenkorb</h2>' + orders.map(cardTemplate).join('');
}


function init() {
    renderdishes(dishes);
    renderCard(orders);
    updateCartSummary()
}


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

function updateCartSummary() {
    let totalAmount = orders.reduce((sum, order) => sum + order.price * order.amount, 0);
    let cardSumContainer = document.getElementById('card-sum');
    let cartMobileSum = document.getElementById('cart-mobile-sum');
    let cardMobileBtn = document.getElementById('cost');
    cartMobileSum.textContent = totalAmount.toFixed(2) + ' €';
    totalAmount = totalAmount.toFixed(2)
    cardSumContainer.innerHTML = `<h3>Gesamt: ${totalAmount} €</h3><button onclick="completeOrder()" class="btn" id="purchase">Jetzt Bezahlen</button>`;
    cartMobileSum.innerHTML = `<p> ${totalAmount} €</p>`;
    cardMobileBtn.innerHTML = `<p> ${totalAmount} €</p>`;
}

function openMobileCart() {
    document.getElementById('cart-overlay').style.display = 'block';
    updateCartSummary();
}

function renderMobileCart() {
    let cartContent = document.getElementById('cart-content');
    cartContent.innerHTML = orders.map(cardTemplate).join('');
    updateCartSummary();
}

function closeMobileOverlay() {
    document.getElementById('cart-overlay').style.display = 'none';
    
}

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