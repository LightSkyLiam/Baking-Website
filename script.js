'use strict';

///////////////////////////////////////
// Elements
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector(`.header`);
const smoothScrollBtn = document.querySelector(`.btn--scroll-to`);
const section1 = document.getElementById(`section--1`);
const links = document.querySelectorAll(`.nav__link`);
const linksParent = document.querySelector(`.nav__links`);
const navBar = document.querySelector(`.nav`);
const message = document.createElement(`div`);
const operationsTab = document.querySelector(`.operations__tab-container`);
const cookieButton = document.createElement(`button`);
const featuresImages = document.querySelectorAll(`img[data-src]`);
const allSections = document.querySelectorAll(`.section`);
const btnRight = document.querySelector(`.slider__btn--right`);
const btnLeft = document.querySelector(`.slider__btn--left`);
///////////////////////////////////////
// Cookie Message
message.classList.add(`cookie-message`);
message.textContent = `We use cookies to improve your user experience in the site`;
message.style.backgroundColor = `#37383d`;
message.style.width = `100vw`;
cookieButton.classList.add(`btn`, `btn--close-cookie`);
cookieButton.textContent = `Got It`;
header.append(message);
message.append(cookieButton);

document.querySelector(`.btn--close-cookie`).addEventListener(`click`, () => {
  message.remove();
});
///////////////////////////////////////
// Nav Link Fade on hover effect

const handleNavEffect = function (e, opacity) {
  if (e.target.classList.contains(`nav__link`)) {
    const link = e.target;
    const logo = link.closest(`.nav`).querySelector(`img`);
    const otherLinks = link.closest(`.nav`).querySelectorAll(`.nav__link`);
    otherLinks.forEach(li => {
      if (li !== link) li.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
navBar.addEventListener(`mouseover`, handleNavEffect.bind(0.5));
navBar.addEventListener(`mouseout`, handleNavEffect.bind(1));

///////////////////////////////////////
// Nav Links Smooth Scroll

linksParent.addEventListener(`click`, e => {
  e.preventDefault();
  if (e.target.classList.contains(`nav__link`)) {
    document
      .querySelector(e.target.getAttribute(`href`))
      .scrollIntoView({ behavior: `smooth` });
  }
});

///////////////////////////////////////
// Modal window
const openModal = e => {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
///////////////////////////////////////
// sticky navigation
const obsCallBack = entries => {
  const [entry] = entries;
  entry.isIntersecting
    ? navBar.classList.remove(`sticky`)
    : navBar.classList.add(`sticky`);
};

const headerObserver = new IntersectionObserver(obsCallBack, {
  root: null,
  threshold: 0,
  rootMargin: `-${navBar.getBoundingClientRect().height}px`,
});
headerObserver.observe(header);
///////////////////////////////////////
// Learn More Smooth Scroll
smoothScrollBtn.classList.add(`smooth-scroll`);
smoothScrollBtn.addEventListener(`click`, e => {
  section1.scrollIntoView({ behavior: `smooth` });
});

///////////////////////////////////////
// Sections reveal effect

const sectionObsCallBack = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove(`section--hidden`);
  observer.unobserve(entry.target);
};

const sectionObs = new IntersectionObserver(sectionObsCallBack, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  sectionObs.observe(section);
  // section.classList.add(`section--hidden`);
});
///////////////////////////////////////
// lazy Loading Images

const lazyLoad = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.addEventListener(`load`, () => {
    entry.target.classList.remove(`lazy-img`);
  });
  entry.target.setAttribute(`src`, `${entry.target.dataset.src}`);
  observer.unobserve(entry.target);
};

const featuresImagesObs = new IntersectionObserver(lazyLoad, {
  root: null,
  threshold: 0.01,
  rootMargin: `200px`,
});

featuresImages.forEach(img => featuresImagesObs.observe(img));

///////////////////////////////////////
// Operations Tabbed Element

// Default Tabs & Content
let ActiveTabBtn = document.querySelector(`.operations__tab--1`);
let ActiveTabContent = document.querySelector(`.operations__content--1`);

const alternateTabs = e => {
  const clicked = e.target.closest(`.operations__tab`);
  // if null (click not on button) retunr
  if (!clicked) return;

  if (clicked !== ActiveTabBtn) {
    // Switch Button Active Class
    ActiveTabBtn.classList.remove(`operations__tab--active`);
    ActiveTabBtn = clicked;
    ActiveTabBtn.classList.add(`operations__tab--active`);
    // Switch Content Area
    ActiveTabContent.classList.remove(`operations__content--active`);
    ActiveTabContent = document.querySelector(
      `.operations__content--${+clicked.dataset.tab}`
    );
    ActiveTabContent.classList.add(`operations__content--active`);
  }
};
operationsTab.addEventListener(`click`, alternateTabs);

///////////////////////////////////////
// slider section

const sliderHandle = () => {
  const slides = document.querySelectorAll(`.slide`);
  const dotDiv = document.querySelector(`.dots`);

  // Creating dots based on slider length
  const createDots = () => {
    slides.forEach((_, i) => {
      const dot = document.createElement(`button`);
      dotDiv.append(dot);
      dot.classList.add(`dots__dot`);
      dot.dataset.slide = +i;
    });
  };
  createDots();
  // activating default dot
  dotDiv.firstChild.classList.add(`dots__dot--active`);

  let currentSlide = 0;
  const changeSlidePlace = e => {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${(i - currentSlide) * 100}%)`;
    });
  };
  const activateDot = slide => {
    document
      .querySelectorAll(`.dots__dot`)
      .forEach(dot => dot.classList.remove(`dots__dot--active`));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add(`dots__dot--active`);
  };
  changeSlidePlace();
  const changeSlide = e => {
    // if clicked on dot
    if (e.target.classList.contains(`dots__dot`)) {
      currentSlide = e.target.dataset.slide;
      changeSlidePlace();
      activateDot(currentSlide);
    }
    // if clicked on right arrow or right button
    else if (
      e.target.classList.contains(`slider__btn--right`) ||
      e.key === `ArrowRight`
    ) {
      if (currentSlide < slides.length - 1) {
        currentSlide++;
        changeSlidePlace();
        activateDot(currentSlide);
      }
    }
    // if clicked on left arrow or left button
    else if (
      e.target.classList.contains(`slider__btn--left`) ||
      e.key === `ArrowLeft`
    ) {
      if (currentSlide > 0) {
        currentSlide--;
        changeSlidePlace();
        activateDot(currentSlide);
      }
    }
  };

  dotDiv.addEventListener(`click`, function (e) {
    if (e.target.classList.contains(`dots__dot`)) {
      currentSlide = Number(e.target.dataset.slide);
      changeSlide(e);
    }
  });
  btnRight.addEventListener(`click`, changeSlide);
  btnLeft.addEventListener(`click`, changeSlide);
  document.addEventListener(`keydown`, function (e) {
    e.key === `ArrowLeft` && changeSlide(e);
    e.key === `ArrowRight` && changeSlide(e);
  });
};
sliderHandle();
