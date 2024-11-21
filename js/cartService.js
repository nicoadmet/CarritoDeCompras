// Agregar y eliminar productos del carrito

function addToCart(product){
    const memory = JSON.parse(localStorage.getItem("tattoos"));
    console.log(memory);
    let count = 0;
    
    if (!memory) {
        const newProduct = product;
        newProduct.amount = 1;
        localStorage.setItem("tattoos", JSON.stringify([newProduct]));
        count = 1;
        updateCartCount();
    } else {
        const indexProduct =  memory.findIndex(tattoo => tattoo.id === product.id); //findIndex recorre el array memory, y evalua cada elemento
        console.log(indexProduct);
        const newMemory = memory; 

        if (indexProduct  === -1) {
            newMemory.push(getNewProductToMemory(product));
            count = 1;
        } else{
            newMemory[indexProduct].amount ++;
            count = newMemory[indexProduct].amount;
        }
        localStorage.setItem("tattoos", JSON.stringify(newMemory));
        updateCartCount();
        totalUnitsCount();
        UpdateTotalPrice();
        return count;
    }
}

function removeFromCart(product) {
    const memory = JSON.parse(localStorage.getItem("tattoos"));
    console.log(memory);   
    const indexProduct =  memory.findIndex(tattoo => tattoo.id === product.id);

    if (memory[indexProduct].amount > 1) {
        memory[indexProduct].amount --;
    } else if (memory[indexProduct].amount === 1){
        memory.splice(indexProduct, 1); // 1 es la cantidad de elementos q se eliminaran
    }
    localStorage.setItem("tattoos", JSON.stringify(memory));
    updateCartCount();
    totalUnitsCount();
    UpdateTotalPrice();
    emptyCartMessege();
}

// Toma un producto, le agrega cantidad 1 y lo devuelve
function getNewProductToMemory(product){
    const newProduct = product;
    newProduct.amount = 1;
    return newProduct
}

const countCartElement = document.getElementById("shoppingCartCount");
function updateCartCount() {
    const memory = JSON.parse(localStorage.getItem("tattoos"));
    if (!memory) {
        countCartElement.innerText = 0;
    }
    const count =  memory.reduce((acum, current) => acum + current.amount, 0); //reduce el array a un solo valor; acum va acumulando los valores y current es el valor que se va a sumar; comienza en 0.
    countCartElement.innerText = count;
    return count;
}


updateCartCount();