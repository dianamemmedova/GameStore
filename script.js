
        // Cart data
        let cart = [];

        // Gradient definitions
        const gradients = {
            gradient1: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            gradient2: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            gradient3: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            gradient4: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            gradient5: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
            gradient6: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
        };

        function addToCart(name, price, category, gradient, image) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name,
            price,
            category,
            gradient,
            image,
            quantity: 1
        });
    }

    updateCart();
    showNotification('Product added to cart!');
}

       function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartCount = document.getElementById('cartCount');

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <i class="fa fa-shopping-cart"></i>
                <p>Cart empty!</p>
            </div>`;
        cartTotal.textContent = '0';
        cartCount.textContent = '0';
        return;
    }

    let total = 0;
    let count = 0;
    let html = '';

    cart.forEach((item, index) => {
        total += item.price * item.quantity ;
        count += item.quantity;

        html += `
        <div class="cart-item">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>

            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-category">${item.category}</div>

                <div class="quantity-control">
                    <button class="quantity-btn" onclick="decreaseQty(${index})">−</button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="quantity-btn" onclick="increaseQty(${index})">+</button>
                </div>

                <div class="cart-item-price">
                    ${item.price * item.quantity} m
                </div>
            </div>

            <button class="remove-item" onclick="removeFromCart(${index})">
                <i class="fa fa-times"></i>
            </button>
        </div>`;
    });

    cartItems.innerHTML = html;
    cartTotal.textContent = total + ' m';
    cartCount.textContent = count;
}

function increaseQty(index) {
    cart[index].quantity++;
    updateCart();
}

function decreaseQty(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }
    updateCart();
}


        // Remove from cart
        function removeFromCart(index) {
            cart.splice(index, 1);
            updateCart();
            showNotification('Products remov from cart');
        }

        // Toggle cart
        function toggleCart() {
            const cartModal = document.getElementById('cartModal');
            const cartOverlay = document.getElementById('cartOverlay');

            cartModal.classList.toggle('active');
            cartOverlay.classList.toggle('active');
        }

        // Show notification
        function showNotification(message) {
            const notification = document.getElementById('cartNotification');
            notification.textContent = message;
            notification.classList.add('show');

            setTimeout(() => {
                notification.classList.remove('show');
            }, 2000);
        }

        // Checkout
        function checkout() {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }

            alert(`Order confirmed! Total: ${cart.reduce((sum, item) => sum + item.price, 0)} m`);
            cart = [];
            updateCart();
            toggleCart();
        }

        // Sticky header
        window.addEventListener('scroll', function () {
            const header = document.getElementById('header');
            if (window.scrollY > 100) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
