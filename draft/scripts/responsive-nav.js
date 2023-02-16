const burgerToggler = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");

function toggleNav() {
	burgerToggler.classList.toggle("open");
	const ariaToggle = burgerToggler.getAttribute("aria-expanded") === "true" ? "false" : "true";
	burgerToggler.setAttribute("aria-expanded", ariaToggle);
	navLinks.classList.toggle("open");

}


burgerToggler.addEventListener("click", toggleNav);

new ResizeObserver(entries => {
	if (entries[0].contentRect.width <= 755) {
		navLinks.style.transition = "transform 0.3s ease-out";
	} else {
		navLinks.style.transition = "none";
	}
}).observe(document.body);