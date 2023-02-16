const burgerButton = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

burgerButton.addEventListener("click", () => {
	navMenu.classList.toggle("show");
	burgerButton.classList.toggle("show");	
});
