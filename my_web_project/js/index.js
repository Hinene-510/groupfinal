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
			
			// Hiển thị hộp thoại "Add to Cart thành công"
			const toast = document.getElementById("cart-toast");
			toast.classList.add("show");

			// Ẩn sau 2.5 giây
			setTimeout(() => {
				toast.classList.remove("show");
			}, 1500);
			
		});
	});

	updateCartCountDisplay();

});

// === Animation when item scrolls into view ===
const animatedItems = document.querySelectorAll(".tm-gallery-item");

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // chỉ hiện 1 lần
      }
    });
  },
  {
    threshold: 0.3,
  }
);

animatedItems.forEach(item => {
  item.classList.add("tm-animate"); // gắn class khởi đầu
  observer.observe(item);
});

// Hiển thị nút cuộn lên khi gần cuối trang
window.addEventListener("scroll", function () {
  const btn = document.getElementById("scrollToTopBtn");
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const clientHeight = document.documentElement.clientHeight;

  // Hiện nút khi cuộn gần cuối (ví dụ 75%)
  if (scrollTop + clientHeight >= scrollHeight * 0.75) {
    btn.classList.add("show");
  } else {
    btn.classList.remove("show");
  }
});

// Cuộn mượt lên đầu trang khi click
document.getElementById("scrollToTopBtn").addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});



