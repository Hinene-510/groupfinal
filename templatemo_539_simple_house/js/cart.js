// filepath: d:\download\templatemo_539_simple_house\templatemo_539_simple_house\js\cart.js
document.addEventListener("DOMContentLoaded", function () {
    const cartItemsContainer = document.querySelector(".cart-items");
    const emptyCartMessage = document.querySelector(".empty-cart-message");

    let cart = JSON.parse(localStorage.getItem("cart")) || []; // Lưu trữ giỏ hàng trong localStorage

    // Hàm cập nhật giỏ hàng
    function updateCart() {
        cartItemsContainer.innerHTML = ""; // Xóa nội dung cũ

        if (cart.length === 0) {
            // Hiển thị thông báo giỏ hàng trống
            cartItemsContainer.innerHTML = '<p class="empty-cart-message text-center">Your cart is currently empty.</p>';
            document.querySelector(".total-price .col.text-right").textContent = "$0.00";
            return;
        }

        let totalPrice = 0;

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;

            const cartItem = document.createElement("div");
            cartItem.classList.add("row", "border-top", "border-bottom", "align-items-center");
            cartItem.innerHTML = `
                <div class="col-3">
                    <img class="img-fluid" src="${item.image}" alt="${item.title}">
                </div>
                <div class="col-5">
                    <div class="row text-muted">${item.title}</div>
                </div>
                <div class="col-2 text-center quantity-control">
                    <button class="quantity-btn decrease" data-index="${index}">-</button>
                    <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-index="${index}">
                    <button class="quantity-btn increase" data-index="${index}">+</button>
                </div>
                <div class="col-2 text-right">
                    <span class="price">$${itemTotal.toFixed(2)}</span>
                    <button class="close" data-index="${index}">&times;</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        // Cập nhật tổng giá
        document.querySelector(".total-price .col.text-right").textContent = `$${totalPrice.toFixed(2)}`;

        // Lưu giỏ hàng vào localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Xử lý sự kiện thêm sản phẩm vào giỏ hàng
    document.body.addEventListener("click", function (e) {
        if (e.target.classList.contains("add-to-cart")) {
            const button = e.target;
            const title = button.dataset.title;
            const price = parseFloat(button.dataset.price);
            const image = button.dataset.image;

            const existingItem = cart.find((item) => item.title === title);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ title, price, image, quantity: 1 });
            }

            updateCart();
        }
    });

    // Xử lý sự kiện thay đổi số lượng
    cartItemsContainer.addEventListener("click", function (e) {
        if (e.target.classList.contains("quantity-btn")) {
            const index = parseInt(e.target.dataset.index);
            if (e.target.classList.contains("increase")) {
                cart[index].quantity++;
            } else if (e.target.classList.contains("decrease") && cart[index].quantity > 1) {
                cart[index].quantity--;
            }
            updateCart();
        } else if (e.target.classList.contains("close")) {
            const index = parseInt(e.target.dataset.index);
            cart.splice(index, 1); // Xóa sản phẩm khỏi giỏ hàng
            updateCart();
        }
    });

    cartItemsContainer.addEventListener("input", function (e) {
        if (e.target.classList.contains("quantity-input")) {
            const index = parseInt(e.target.dataset.index);
            const newQuantity = parseInt(e.target.value);
            if (newQuantity > 0) {
                cart[index].quantity = newQuantity;
                updateCart();
            }
        }
    });

    // Cập nhật giỏ hàng khi tải trang
    updateCart();
});