
document.querySelector(".login-form").addEventListener("submit", function (e) {
	e.preventDefault(); // prevent form from submitting

	// Show the popup
	const popup = document.getElementById("success-popup");
	popup.style.display = "block";

	// Fade out after 3 seconds
	setTimeout(() => {
		popup.style.opacity = "0";
	}, 3000);

	// Redirect to homepage after 4 seconds
	setTimeout(() => {
		window.location.href = "index.html";
	}, 4000);
});

