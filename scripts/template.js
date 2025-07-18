function cardTemplate(card) {
  return `
    <div class="card-item">
      <h3>${card.title}</h3>
      <p>${card.description}</p>
      <span class="price">${card.price} €</span>
      <button class="add-to-cart" data-id="${card.id}">In den Warenkorb</button>
    </div>
  `;
}

function orderTemplate(order) {
  return `
    <div class="order-item">
      <h3>${order.title}</h3>
      <p>Preis: ${order.price} €</p>
      <span class="quantity">Menge: ${order.quantity}</span>
      <button class="remove-from-cart" data-id="${order.id}">Entfernen</button>
    </div>
  `;
}

function renderTemplates(cards, orders) {
  const cardContainer = document.getElementById('card');
  const orderContainer = document.getElementById('order');

  cardContainer.innerHTML = cards.map(cardTemplate).join('');
  orderContainer.innerHTML = orders.map(orderTemplate).join('');
}