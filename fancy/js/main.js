lightGallery(document.getElementById('gallery'));

//burger menu

const navSlide = () => {
	const burger = document.querySelector('.burger');
	const menu = document.querySelector('.navigation__menu');

	burger.addEventListener('click', () => {
		menu.classList.toggle('nav-active');

		burger.classList.toggle('toggle');
	});
};

navSlide();

//btn go top

let myButton = document.querySelector('.btn-top');
let header = document.querySelector('.header');

var rootElement = document.documentElement;

// When the user scrolls down a bit show the button

const revealButton = function (entries, observer) {
	const [entry] = entries;

	if (entry.isIntersecting) {
		myButton.style.display = 'none';
	} else {
		myButton.style.display = 'block';
	}
};

const goTopBtn = new IntersectionObserver(revealButton, {
	root: null,
	threshold: 0.7,
});
goTopBtn.observe(header);

// When the user clicks on the button, scroll to the top of the document

myButton.addEventListener('click', scrollToTop);

function scrollToTop() {
	// Scroll to top logic
	rootElement.scrollTo({
		top: 0,
		behavior: 'smooth',
	});
}

//filter gallery

//select buttons onclick

let btnFilters = document.querySelectorAll('.btn-filter');
let images = document.querySelectorAll('.gallery__item');

btnFilters.forEach(function (btn, idx) {
	btn.addEventListener('click', function () {
		btn.classList.add('active');
		let tag = btn.getAttribute('data-target');
		removeActiveClassFromOthers(tag);
		filterImages(tag);
	});
});

function removeActiveClassFromOthers(exception) {
	btnFilters.forEach(function (btn, idx) {
		if (btn.getAttribute('data-target') !== exception) {
			btn.classList.remove('active');
		}
	});
}

function filterImages(tag) {
	images.forEach(function (image, idx) {
		if (tag === 'tout') {
			image.classList.add('show');
			image.classList.remove('hide');
			return;
		}

		if (image.getAttribute('data-item') !== tag) {
			image.classList.add('hide');
			image.classList.remove('show');
		} else {
			image.classList.add('show');
			image.classList.remove('hide');
		}
	});

	console.log(images);
}

// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
	const [entry] = entries;

	if (!entry.isIntersecting) return;

	// Replace src with data-src
	// entry.target.src = entry.target.dataset.src;

	// entry.target.addEventListener('load', function () {

	// });
	entry.target.classList.remove('lazy-img');

	observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
	root: null,
	threshold: 0,
	rootMargin: '200px',
});

imgTargets.forEach((img) => imgObserver.observe(img));

///////////////////////////////////////
// Reveal sections
const allSections = document.querySelectorAll('.section-to-reveal');

const revealSection = function (entries, observer) {
	const [entry] = entries;

	if (!entry.isIntersecting) return;

	// launch counters on stats
	if (entry.target.classList.contains('stats')) {
		//counters

		const counters = document.querySelectorAll('.number');
		const speed = 9000; // The lower the slower

		counters.forEach((counter) => {
			const updateCount = () => {
				const target = +counter.getAttribute('data-target');
				const count = +counter.innerText;

				// Lower inc to slow and higher to slow
				const inc = target / speed;

				// Check if target is reached
				if (count < target) {
					// Add inc to count and output in counter
					counter.innerText = Math.ceil(count + inc);
					// Call function every ms
					setTimeout(updateCount, 1);
				} else {
					counter.innerText = target;
				}
			};

			updateCount();
		});
	}

	entry.target.classList.remove('section--hidden');
	observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
	root: null,
	threshold: 0.1,
});

allSections.forEach(function (section) {
	sectionObserver.observe(section);
	section.classList.add('section--hidden');
});

///////////////////////////////////////
// Menu fade animation
const nav = document.querySelector('.navigation');
const handleHover = function (e) {
	if (e.target.classList.contains('link')) {
		console.log('trigred');
		const link = e.target;
		const siblings = link.closest('.navigation').querySelectorAll('.link');
		const logo = link.closest('.navigation').querySelector('.navigation__logo');
		const icons = link.closest('.navigation').querySelector('.icons');

		siblings.forEach((el) => {
			if (el !== link) el.style.opacity = this;
		});

		logo.style.transition = 'all .3s';
		icons.style.transition = 'all .3s';
		logo.style.opacity = this;
		icons.style.opacity = this;
	}
};

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// update main color
const btnColor = document.getElementById('main-color');
btnColor.addEventListener('input', function () {
	document.documentElement.style.setProperty('--color-primary', btnColor.value);
});

// update bg-color
const btnColorBg = document.getElementById('bg-color');
btnColorBg.addEventListener('input', function () {
	document.documentElement.style.setProperty('--color-bg', btnColorBg.value);
});
