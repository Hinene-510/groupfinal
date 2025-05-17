document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".tm-contact-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const messageBox = document.getElementById("message-box");
    messageBox.style.display = "block";

    setTimeout(() => {
      messageBox.style.opacity = "0"; // Mờ dần
    }, 1000);

    setTimeout(() => {
      window.location.href = "index.html"; // Chuyển trang sau 2 giây
    }, 2000);
  });
});
