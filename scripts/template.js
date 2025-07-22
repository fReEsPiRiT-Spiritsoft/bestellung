function dishTemplate(dish) {
    return `
        <div class="dish-item">
            <img src="${dish.image}" alt="${dish.name}">
            <h3>${dish.name}</h3>
            <p>${dish.description}</p>
            <span class="price">${dish.price.toFixed(2)} €</span>
            <input type="number" class="amount" data-id="${dish.id}" value="1" min="1">
            <button onclick="addToCart(${dish.id})" class="add-to-cart">In den Warenkorb</button>
            <div class="cart-controls">
            <img src="./icons/plus.png" alt="plus" class="plus" onclick="addToCart(${dish.id})">
            <img src="./icons/minus.png" alt="minus" class="minus" onclick="removeFromCart(${dish.id})">
            </div>
        </div>
    `;
}


function cardTemplate(order) {
    return `
        <div class="order-itemquantity">         
            <h3>${order.name}</h3>
            <p>Preis: ${order.price.toFixed(2)} €</p>
            <p>Anzahl: ${order.amount}</p>
            <div class="cart-controls">
            <img src="./icons/plus.png" alt="plus" class="plus" onclick="addToCart(${order.id})">
            <img src="./icons/minus.png" alt="minus" class="minus" onclick="removeFromCart(${order.id})">
            </div>
        </div>
        
    `;
}