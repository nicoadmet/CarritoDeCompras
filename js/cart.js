// crea las tarjetas dentro del carrito de productos que selecciono el usuario

const productsContainer = document.getElementsByClassName("products-container")[0];
const totalPriceCount = document.querySelectorAll(".totals span")[1];
const emptyCartMessage = document.getElementById("emptyCartMessage");
const totalsContainer = document.getElementsByClassName("totals")[0];
const resetButton = document.getElementById("resetButton");
const buyButton = document.getElementById("buyButton");


function createCardsProducts() {
    productsContainer.innerHTML = '';
    const products = JSON.parse(localStorage.getItem("tattoos"));
    console.log(products);
    if (products && products.length > 0) {
        products.forEach(product => {
            const newTatto = document.createElement("div");
            newTatto.classList = "product-card";
            newTatto.innerHTML = `
                <img src="/img/products/${product.id}.jpg">
                <h3>${product.name}</h3>
                <span>$${product.price}</span>
                <div>
                    <button>-</button>
                    <span class="quantity">${product.amount}</span>
                    <button>+</button>
                </div>
            `;
            productsContainer.appendChild(newTatto);

            newTatto
                .getElementsByTagName("button")[1]
                .addEventListener("click", (e) => {
                    const quantityElement = e.target.parentElement.getElementsByTagName("span")[0];
                    quantityElement.innerText = addToCart(product);
                });
            newTatto
                .getElementsByTagName("button")[0]  
                .addEventListener("click", (e) => {  
                    removeFromCart(product)
                    createCardsProducts();
                })
                    
        });
    }
    emptyCartMessege();
}

function totalUnitsCount() {
    const totalUnits = document.getElementById("units");
    totalUnits.innerText = updateCartCount();
}


function UpdateTotalPrice() {
    const memory = JSON.parse(localStorage.getItem("tattoos"));
    const count =  memory.reduce((acum, current) => acum + current.price * current.amount, 0);
    totalPriceCount.innerText = count; 
}


function emptyCartMessege() {
    const memory = JSON.parse(localStorage.getItem("tattoos")) || [];
    emptyCartMessage.classList.toggle("hidden", memory && memory.length  > 0);
    totalsContainer.classList.toggle("hidden", !(memory && memory.length  > 0));
}


resetButton.addEventListener("click",() => {
    resetCart();
} );
function resetCart() {
    localStorage.removeItem("tattoos");
    emptyCartMessege();
    createCardsProducts();
    updateCartCount();
}


buyButton.addEventListener("click",() => {
    alert("La compra se realizo con éxito");
} );



createCardsProducts();
UpdateTotalPrice();
totalUnitsCount();


