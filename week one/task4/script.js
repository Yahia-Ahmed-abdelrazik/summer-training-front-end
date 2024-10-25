window.onscroll = function () {
  const backToTopBtn = document.getElementById("backToTop");
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
};

document.addEventListener("DOMContentLoaded", function () {
  // Hide the back to top button on page load
  const backToTopBtn = document.getElementById("backToTop");
  backToTopBtn.style.display = "none";
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
