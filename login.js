
if (localStorage.getItem('cart') == null) {
    localStorage.setItem('cart', '[]');
}


function updateCartCount() {
    var cartString = localStorage.getItem('cart');
    var cart = JSON.parse(cartString);
    var totalItems = 0;


    for (var i = 0; i < cart.length; i = i + 1) {
        totalItems = totalItems + cart[i].quantity;
    }

    var countElement = document.getElementById('cart-count');
    if (countElement != null) {
        countElement.innerText = totalItems;
    }
}


function addToCart(id, name, price) {
    var cartString = localStorage.getItem('cart');
    var cart = JSON.parse(cartString);
    var itemExists = false;


    for (var i = 0; i < cart.length; i = i + 1) {
        if (cart[i].id == id) {
            cart[i].quantity = cart[i].quantity + 1;
            itemExists = true;
        }
    }


    if (itemExists == false) {
        var newItem = {
            id: id,
            name: name,
            price: price,
            quantity: 1
        };
        cart.push(newItem);
    }


    var newCartString = JSON.stringify(cart);
    localStorage.setItem('cart', newCartString);

    alert(name + " added to cart!");
    updateCartCount();
}


function displayCartItems() {
    var cartString = localStorage.getItem('cart');
    var cart = JSON.parse(cartString);
    var cartTableBody = document.getElementById('cart-items');
    var cartTotalElement = document.getElementById('cart-total');


    if (cartTableBody == null) {
        return;
    }
    if (cartTotalElement == null) {
        return;
    }

    cartTableBody.innerHTML = '';
    var totalAmount = 0;


    if (cart.length == 0) {
        cartTableBody.innerHTML = '<tr><td colspan="5" style="text-align:center;">Your cart is empty.</td></tr>';
        cartTotalElement.innerText = '0.00';
        return;
    }


    for (var i = 0; i < cart.length; i = i + 1) {
        var item = cart[i];
        var itemTotal = item.price * item.quantity;
        totalAmount = totalAmount + itemTotal;

        var row = document.createElement('tr');


        row.innerHTML = '<td>' + item.name + '</td>' +
            '<td>₹' + item.price + '</td>' +
            '<td>' + item.quantity + '</td>' +
            '<td>₹' + itemTotal + '</td>' +
            '<td><button class="btn btn-danger" onclick="removeItem(' + item.id + ')">Remove</button></td>';

        cartTableBody.appendChild(row);
    }

    cartTotalElement.innerText = totalAmount;
}


function removeItem(id) {
    var cartString = localStorage.getItem('cart');
    var cart = JSON.parse(cartString);
    var newCart = [];


    for (var i = 0; i < cart.length; i = i + 1) {
        if (cart[i].id != id) {
            newCart.push(cart[i]);
        }
    }


    var newCartString = JSON.stringify(newCart);
    localStorage.setItem('cart', newCartString);


    displayCartItems();
    updateCartCount();
}


function clearCart() {
    var cartString = localStorage.getItem('cart');
    var cart = JSON.parse(cartString);

    if (cart.length == 0) {
        alert("Cart is already empty.");
        return;
    }

    var confirmClear = confirm("Are you sure you want to clear your cart?");
    if (confirmClear == true) {
        localStorage.setItem('cart', '[]');
        displayCartItems();
        updateCartCount();
    }
}


function handleLogin(event) {
    event.preventDefault();

    var emailInput = document.getElementById('email').value;
    var passwordInput = document.getElementById('password').value;

    var emailError = document.getElementById('email-error');
    var passwordError = document.getElementById('password-error');

    emailError.style.display = 'none';
    passwordError.style.display = 'none';

    var isValid = true;


    if (emailInput == '') {
        emailError.innerText = 'Email is required';
        emailError.style.display = 'block';
        isValid = false;
    } else {

        if (emailInput.indexOf('@') == -1) {
            emailError.innerText = 'Please enter a valid email address';
            emailError.style.display = 'block';
            isValid = false;
        }
    }


    if (passwordInput == '') {
        passwordError.innerText = 'Password is required';
        passwordError.style.display = 'block';
        isValid = false;
    }


    if (isValid == true) {
        alert('Login successful! Welcome to Royal Chess Store.');
        window.location.href = 'index.html';
    }
}


window.onload = function () {
    updateCartCount();

    if (document.getElementById('cart-items') != null) {
        displayCartItems();
    }
};
