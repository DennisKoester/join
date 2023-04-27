/**
 * Maximum width for mobile screen
 */
const MOBILE_MAX_WIDTH = 940;
/**
 * Delay for fade-out of welcome message on mobile device
 */
const WELCOME_MSG_DELAY = 800;
/**
 * Fade-out time for welcome message on mobile device
 */
const WELCOME_MSG_TRANS = 400;
/**
 * Fade-in/fade-out time for context menu in header
 */
const HEADER_CTX_MENU_ANIM_TIME = 220;

let alphabet = [
	"A",
	"B",
	"C",
	"D",
	"E",
	"F",
	"G",
	"H",
	"I",
	"J",
	"K",
	"L",
	"M",
	"N",
	"O",
	"P",
	"Q",
	"R",
	"S",
	"T",
	"U",
	"V",
	"W",
	"X",
	"Y",
	"Z",
	"Ä",
	"Ö",
	"Ü",
];

setURL("https://denniskoester.com/smallest_backend_ever");

/**
 * Initiates the main page
 */
async function init() {
	await includeHTML();
	await loadDataFromServer();
	loadCurrentUser();
	hasTouch();
	setHeaderUserBadge();
	controlMenuHighlighting();
}

/**
 * Loads all data from the server
 */
async function loadDataFromServer() {
	await downloadFromServer();
	users = await loadFromServer("users");
	tasks = await loadFromServer("tasks");
	categories = await loadFromServer("categories");
}

/**
 * Loads the current user from localStorage
 */
function loadCurrentUser() {
	currentUser = JSON.parse(localStorage.getItem("currentUser")) || guestUser;
}

/**
 * Saves the current user in localStorage
 */
function saveCurrentUser() {
	userAsString = JSON.stringify(currentUser);
	localStorage.setItem("currentUser", userAsString);
}

/**
 * Loads the requested data from server
 * @param {string} key
 * @returns Data from server as Array
 */
async function loadFromServer(key) {
	let item = [];
	item = JSON.parse(backend.getItem(key)) || [];
	return Array.from(item);
}

/**
 * Saves the data to the server
 * @param {String} key
 * @param {Array} item
 */
async function saveOnServer(key, item) {
	itemAsString = JSON.stringify(item);
	await backend.setItem(key, itemAsString);
}

/**
 * Reads the page name and converts it to a container ID
 * @returns String
 */
function getPageName() {
	let path = window.location.pathname;
	path = path.split("/").pop();
	path = path.split(".").shift();
	path = "menu-" + path;

	return path;
}

/**
 * Highlightes the menu item for the current page
 */
function controlMenuHighlighting() {
	const path = getPageName();

	if (path != "menu-help") {
		let menuToActivate = document.getElementById(path);
		menuToActivate.classList.add("nav-item-active");
	}
}

/**
 * Toggles the visibility of the context menu
 * @param {Object} ctxMenuId The ID of the context menu
 */
function toggleContextMenu(ctxMenuId) {
	const ctxMenu = document.getElementById(ctxMenuId);

	if (ctxMenu.classList.contains("d-none")) {
		showCtxMenu(ctxMenu);
	} else {
		hideCtxMenu(ctxMenu);
	}
}

/**
 * Shows the context menu
 * @param {Object} ctxMenu The context menu
 */
function showCtxMenu(ctxMenu) {
	ctxMenu.classList.remove("d-none");
	setTimeout(() => {
		ctxMenu.classList.add("context--show");
	}, 1);
}

/**
 * Hides the context menu
 * @param {Object} ctxMenu The context menu
 */
function hideCtxMenu(ctxMenu) {
	ctxMenu.classList.remove("context--show");
	setTimeout(() => {
		ctxMenu.classList.add("d-none");
	}, HEADER_CTX_MENU_ANIM_TIME);
}

/**
 * Logout and reset currentUser
 */
async function logout() {
	currentUser = [];
	saveCurrentUser();
	window.location.href = "./index.html";
}

/**
 * Sets the user badge in the header
 */
function setHeaderUserBadge() {
	const img = document.getElementById("header-img-user");
	const badge = document.getElementById("header-badge-user");
	if (currentUser["name"] == "Guest") {
		img.classList.remove("d-none");
		badge.classList.add("d-none");
	} else {
		badge.innerHTML = currentUser["short_name"];
		badge.style.backgroundColor = currentUser["color"];
		badge.classList.remove("d-none");
		img.classList.add("d-none");
	}
}

/**
 * Removes all :hover stylesheets for use on mobile device
 * @returns
 */
function hasTouch() {
	return (
		"ontouchstart" in document.documentElement ||
		navigator.maxTouchPoints > 0 ||
		navigator.msMaxTouchPoints > 0
	);
}

if (hasTouch()) {
	// remove all the :hover stylesheets
	try {
		// prevent exception on browsers not supporting DOM styleSheets properly
		for (let si in document.styleSheets) {
			const styleSheet = document.styleSheets[si];
			if (!styleSheet.rules) continue;

			for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
				if (!styleSheet.rules[ri].selectorText) continue;

				if (styleSheet.rules[ri].selectorText.match(":hover")) {
					styleSheet.deleteRule(ri);
				}
			}
		}
	} catch (ex) {}
}

/**
 * Validating that full name is given
 * @param {Object} username The input field for the user name
 * @param {String} msgElemId The ID of the HTML message element
 * @param {String} className The CSS class name to be used
 * @returns Boolean
 */
function nameValidation(username, msgElemId, className) {
	if (!username.value.trim().includes(" ")) {
		document.getElementById(msgElemId).classList.remove(className);
		return false;
	} else {
		document.getElementById(msgElemId).classList.add(className);
		return true;
	}
}

/**
 * Create initials from first letters of ssername
 * @param {String} name The full name of the user
 * @returns String
 */
function getInitials(name) {
	const fullName = name.split(" ");
	const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
	return initials.toUpperCase();
}

/**
 * Generate random color for User initials background
 * @returns HSL color as String
 */
function generateColors() {
	let h = Math.floor(Math.random() * 359);
	return (color = `hsl(${h}, 100%, 50%)`);
}

/**
 * Getting the first letter of the last name
 * @param {number} j Index of the user
 * @returns "surename letter of the last name
 */
function getFirstLetterOfLastName(j) {
	let user = users[j]["name"];
	let names = user.split(" ");
	let surname = names[names.length - 1];

	return surname[0].toUpperCase();
}

/**
 * Replaces specific signs and symbols in a string
 * @param {string} string Specific string
 * @returns Converted string
 */
function escapeHTML(string) {
	return string
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
}

/**
 * Shows the popup "Task added to board" with animation
 */
function showPopup(id) {
	let popup = document.getElementById(id);

	popup.classList.add("animation");
	setTimeout(function () {
		removeAnimate(popup);
	}, 3000);
}

/**
 * Removes the animation class from the little popup
 * @param {string} popup Little Popup
 */
function removeAnimate(popup) {
	popup.classList.remove("animation");
}
