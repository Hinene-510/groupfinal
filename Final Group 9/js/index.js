document.addEventListener("DOMContentLoaded", function () {
	const cartCount = document.querySelector(".san-pham-trong-ro-hang");

	function updateCartCountDisplay() {
		const cart = JSON.parse(localStorage.getItem("cart")) || [];
		const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
		if (cartCount) {
			cartCount.textContent = totalCount;
		}
	}

	document.querySelectorAll(".add-to-cart").forEach(function (btn) {
		btn.addEventListener("click", function () {
			const title = btn.getAttribute("data-title") || "Unknown";
			const price = parseFloat(btn.getAttribute("data-price")) || 0;
			const image = btn.getAttribute("data-image") || "";

			const product = {
				title,
				price,
				image,
				quantity: 1,
			};

			let cart = JSON.parse(localStorage.getItem("cart")) || [];

			const existingProduct = cart.find((item) => item.title === product.title);
			if (existingProduct) {
				existingProduct.quantity++;
			} else {
				cart.push(product);
			}

			localStorage.setItem("cart", JSON.stringify(cart));
			updateCartCountDisplay();

			setTimeout(() => {
				window.location.href = "cart.html";
			}, 100);
		});
	});

	updateCartCountDisplay();
});
