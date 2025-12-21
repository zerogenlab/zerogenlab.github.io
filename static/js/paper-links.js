document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".paper-link").forEach(link => {
    link.addEventListener("click", () => {
      link.classList.add("is-clicked");
    });
  });
});
