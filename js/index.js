// Crea las tarjetas de productos



 const productsContainer = document.getElementsByClassName("products-container")[0];
 
 function createCardsProducts(products) {
    products.forEach(product => {
        const newTatto = document.createElement("div");
        newTatto.classList = "product-card";
        newTatto.innerHTML = `
            <img src="/img/products/${product.id}.jpg">
            <h3>${product.name}</h3>
            <span>$${product.price}</span>
            <button>Agregar al carrito</button>
        `;


        productsContainer.appendChild(newTatto);
        newTatto.getElementsByTagName("button")[0].addEventListener("click", () => addToCart(product))
    });
 }

 createCardsProducts(tattoos);