document.addEventListener("DOMContentLoaded", () => {
  const authBtns = document.querySelectorAll(".auth-button-modal");
  const closeBtns = document.querySelectorAll(".modal .close");

  // Open modal
  authBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const type = btn.dataset.type;
      const modal =
        type === "login"
          ? document.getElementById("loginModal")
          : document.getElementById("registerModal");

      if (modal) modal.classList.add("active");
    });
  });

  // Close modal via "×"
  closeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".modal");
      if (modal) modal.classList.remove("active");
    });
  });

  // Close modal by clicking outside modal content
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      e.target.classList.remove("active");
    }
  });
});
