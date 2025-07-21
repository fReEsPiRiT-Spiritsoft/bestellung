function renderdishes(dishes) {
    let dishContainer = document.getElementById('dish');
    dishContainer.innerHTML = dishes.map(dishTemplate).join('');
}

function renderCard(orders) {
    let cardContainer = document.getElementById('card');
    cardContainer.innerHTML = '<h2>Warenkorb</h2>' + orders.map(cardTemplate).join('') + '<div id="card-sum"></div>';
}


function init() {
    renderdishes(dishes);
    renderCard(orders);
    summaryTemplate(totalAmount)
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
}


function removeFromCart(id) {
    let existingOrder =orders.find(order => order.id === id);
    if(existingOrder) {
        if (existingOrder.amount > 1) {
            existingOrder.amount -= 1;
        } else {
            orders = orders.filter(order => order.id !== id);
        }
    }  
    renderCard(orders);
    updateCartSummary();

}

function updateCartSummary() {
    let totalAmount = orders.reduce((sum, order) => sum + order.price * order.amount, 0);
    let cardSumContainer = document.getElementById('card-sum');
    totalAmount = totalAmount.toFixed(2)
    cardSumContainer.innerHTML = `<h3>Gesamt: ${totalAmount} €</h3><button class="btn" id="purchase">Jetzt Bezahlen</button>`;
}