window.addEventListener("DOMContentLoaded", () => {
	// WEBP -----------------------------------------------------

function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {

	if (support == true) {
		document.querySelector('body').classList.add('webp');
	} else {
		document.querySelector('body').classList.add('no-webp');
	}
});


// BURGER -----------------------------------------------------

const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
if (hamburger) {
	hamburger.addEventListener('click', function () {
		document.body.classList.toggle('lock');
		hamburger.classList.toggle('active');
		menu.classList.toggle('active');
	});
}

// SMOOTH SCROLL -----------------------------------------------------

const menuLinks = document.querySelectorAll('.menu__link[data-scroll]');

if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener('click', onMenuLinkClick);
	});

	function onMenuLinkClick(e) {
		const menuLink = e.target;
		if (menuLink.dataset.scroll && document.querySelector(menuLink.dataset.scroll)) {
			const scrollTo = document.querySelector(menuLink.dataset.scroll);
			const scrollToValue = scrollTo.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

			if (hamburger.classList.contains('active')) {
				document.body.classList.remove('lock');
				hamburger.classList.remove('active');
				menu.classList.remove('active');
			}

			window.scrollTo({
				top: scrollToValue,
				behavior: "smooth"
			});
			e.preventDefault();
		}
	}
}

// TABS -----------------------------------------------------

const tabsParent = document.querySelectorAll('.tabs');
if (tabsParent.length > 0) {
	tabsParent.forEach(element => {
		const tabs = element.querySelectorAll('.tab-btn'),
			tabsContent = element.querySelectorAll('.tab-content');
		function hideTabsContent() {
			tabsContent.forEach(item => {
				item.classList.remove('active');
			});
			tabs.forEach(item => {
				item.classList.remove('active');
			});
		};
		const showTabsContent = (i = 0) => {
			tabsContent[i].classList.add('active');
			tabs[i].classList.add('active');
		}
		hideTabsContent();
		showTabsContent(0);
		element.addEventListener('click', (event) => {
			const targetElement = event.target;
			if (targetElement && targetElement.classList.contains('tab-btn') || targetElement && targetElement.closest('.tab-btn')) {
				hideTabsContent();
				tabs.forEach((item, i) => {
					if (targetElement.closest('.tab-btn') == item) {
						showTabsContent(i);
					}
				});
			};
		});
	});
};


// POPUP -----------------------------------------------------

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockScroll = document.querySelectorAll('.lock-scroll');

let unlock = true;

const timeout = 700;

if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener('click', function (e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		});
	}
}

const popupCloseIcon = document.querySelectorAll('.popup-close');
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function (e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(curentPopup) {
	if (curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive, false)
		} else {
			bodyLock();
		}
		curentPopup.classList.add('open');
		curentPopup.addEventListener('click', function (e) {
			if (!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'));
			}
		});
	}
}

function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
		if (doUnlock) {
			bodyUnLock();
		}
	}
}

function bodyLock() {
	const lockScrollValue = window.innerWidth - document.querySelector('.page').offsetWidth + 'px';

	if (lockScroll.length > 0) {
		for (let index = 0; index < lockScroll.length; index++) {
			const el = lockScroll[index];
			el.style.paddingRight = lockScrollValue;
		}
	}
	body.style.paddingRight = lockScrollValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnLock() {
	setTimeout(function () {
		if (lockScroll.length > 0) {
			for (let index = 0; index < lockScroll.length; index++) {
				const el = lockScroll[index];
				el.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function (e) {
	if (e.which === 27) {
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});

(function () {
	if (!Element.prototype.closest) {
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();

(function () {
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();
	const headerBtn = document.querySelector('.contacts-header__btn');
headerBtn.addEventListener('click', () => {
	menu.classList.remove('active');
	hamburger.classList.remove('active');
});

// -----------------------------------------------------

const inputs = document.querySelectorAll('input[type="tel"]');
const im = new Inputmask('+7 (999) 999-99-99');
im.mask(inputs);
});