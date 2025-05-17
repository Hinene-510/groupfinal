document.addEventListener("DOMContentLoaded", function () {
	const cartContainer = document.querySelector(".cart-items");
	const totalPriceElement = document.querySelector(".total-price .text-right");
	const cartCount = document.querySelector(".san-pham-trong-ro-hang");
	const cartSection = document.querySelector(".col.cart");
	const thanksSection = document.querySelector(".col.thanks");
	const checkoutButton = document.getElementById("checkout-btn");

	let cart = JSON.parse(localStorage.getItem("cart")) || [];

	function updateCartCountDisplay() {
		const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
		if (cartCount) {
			cartCount.textContent = totalCount;
		}
	}

	function updateCart() {
		cartContainer.innerHTML = "";

		if (cart.length === 0) {
			cartContainer.innerHTML = `<p class="empty-cart-message text-center">Your cart is currently empty.</p>`;
			totalPriceElement.textContent = "$0.00";
			updateCartCountDisplay();
			localStorage.setItem("cart", JSON.stringify(cart));
			return;
		}

		let total = 0;

		cart.forEach((item, index) => {
			const productDiv = document.createElement("div");
			productDiv.classList.add("product");

			const itemTotal = item.price * item.quantity;
			total += itemTotal;

			productDiv.innerHTML = `
				<img src="${item.image}" alt="${item.title}" class="product-image" />
				<div class="name-product">${item.title}</div>
				<div class="quantity">
					<div class="quantity-control">
						<button class="btn-qty minus" data-index="${index}">-</button>
						<span class="qty-value">${item.quantity}</span>
						<button class="btn-qty plus" data-index="${index}">+</button>
					</div>
				</div>
				<div class="price-product single-price">$${item.price.toFixed(2)}</div>
			`;

			cartContainer.appendChild(productDiv);
		});

		totalPriceElement.textContent = `$${total.toFixed(2)}`;
		bindQuantityButtons();
		updateCartCountDisplay();
		localStorage.setItem("cart", JSON.stringify(cart));
	}

	function bindQuantityButtons() {
		document.querySelectorAll(".btn-qty").forEach((btn) => {
			const index = parseInt(btn.dataset.index);
			btn.addEventListener("click", () => {
				if (btn.classList.contains("plus")) {
					cart[index].quantity++;
				} else if (btn.classList.contains("minus")) {
					cart[index].quantity--;
					if (cart[index].quantity <= 0) {
						cart.splice(index, 1);
					}
				}
				updateCart();
			});
		});
	}

	if (checkoutButton) {
		checkoutButton.addEventListener("click", function () {
			// Ẩn giỏ hàng, hiện cảm ơn
			if (cartSection) cartSection.style.display = "none";
			if (thanksSection) thanksSection.style.display = "flex";

			// Xóa giỏ hàng
			localStorage.removeItem("cart");
			if (cartCount) cartCount.textContent = "0";
		});
	}

	updateCart();
});
