// Clock functionality

let hr = document.querySelector("section .hr");
let min = document.querySelector("section .min");
let sec = document.querySelector("section #sec");

setInterval(() => {
	hr.style.transform = `rotateZ(${new Date().getHours() * 30}deg)`;
	min.style.transform = `rotateZ(${new Date().getMinutes() * 6}deg)`;
	sec.style.transform = `rotateZ(${new Date().getSeconds() * 6}deg)`;
}, 1000);

//check if mobile device
function isMobileDevice() {
	if (
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent
		) ||
		window.innerWidth <= 600
	) {
		return true;
	} else {
		return false;
	}
}

// Mobile menu functionality
function toggleMenu() {
	document.querySelector("aside").classList.toggle("active");
}


// Classlist changes selector helpers
const remove = (el, option) => {
	el.classList.remove(option);
};
const add = (el, option) => {
	el.classList.add(option);
};

// Color theme functionality
let colormode = localStorage.getItem("colormode");
let colorButtons = document.querySelectorAll("section aside ul.modes li");

for (let i = 0; i < colorButtons.length; i++) {
	colorButtons[i].addEventListener("click", () => {
		if (i === 0) {
			remove(colorButtons[1], "active");
			localStorage.setItem("colormode", "light");
			remove(document.body, "dark");
		} else {
			remove(colorButtons[0], "active");
			localStorage.setItem("colormode", "dark");
			add(document.body, "dark");
		}
		if (isMobileDevice()) {
			toggleMenu();
		}
		colorButtons[i].classList.add("active");
	});
}
if (colormode === "dark") {
	add(document.body, "dark");
	remove(colorButtons[0], "active");
	add(colorButtons[1], "active");
}

// Themes functionality
let theme = localStorage.getItem("theme");
let themeButtons = document.querySelectorAll("section aside ul.themes li");
let themeContainer = document.querySelector("section article");

for (let i = 0; i < themeButtons.length; i++) {
	themeButtons[i].addEventListener("click", () => {
		let currentTheme = themeButtons[i].getAttribute("data-theme")
		for (let j = 0; j < themeButtons.length; j++) {
			remove(themeButtons[j], "active");
		}
		add(themeButtons[i], "active");
		themeContainer.setAttribute( "data-theme", currentTheme );

		if (isMobileDevice()) {
			toggleMenu();
		}
		localStorage.setItem("theme", currentTheme);
		document.querySelector("section article .name").textContent = currentTheme;
	});
}
// Get the theme when app loads
themeContainer.setAttribute("data-theme", theme);
document.querySelector("section article .name").textContent = theme;

for (let i = 0; i < themeButtons.length; i++) {
	let currentTheme = themeButtons[i].getAttribute("data-theme")
	remove(themeButtons[i], "active");
	if (currentTheme === theme) {
		add(themeButtons[i], "active");
	}
}

// Footer year
document.querySelector("footer .footer-year").textContent =
	new Date().getFullYear();
