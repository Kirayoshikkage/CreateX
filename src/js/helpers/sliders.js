import Swiper, { Navigation, Keyboard, A11y } from 'swiper';

const heroSlider = function () {
  const slider = '.hero .swiper';
  const buttonNext = '.hero .swiper-button-next';
  const buttonPrev = '.hero .swiper-button-prev';
  // eslint-disable-next-line no-unused-vars
  const swiper = new Swiper(slider, {
    modules: [Navigation, Keyboard, A11y],
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    navigation: {
      nextEl: buttonNext,
      prevEl: buttonPrev,
    },
  });
};

// eslint-disable-next-line func-names
const selectedProjectsSlider = function () {
  const slider = '.selected-projects .swiper';
  const buttonNext = '.selected-projects .swiper-button-next';
  const buttonPrev = '.selected-projects .swiper-button-prev';
  // eslint-disable-next-line no-unused-vars
  const swiper = new Swiper(slider, {
    modules: [Navigation, Keyboard, A11y],
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    slidesPerView: 3,
    spaceBetween: 30,
    navigation: {
      nextEl: buttonNext,
      prevEl: buttonPrev,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });
};

const reviewsSlider = function () {
  const slider = '.reviews .swiper';
  const buttonNext = '.reviews .swiper-button-next';
  const buttonPrev = '.reviews .swiper-button-prev';
  // eslint-disable-next-line no-unused-vars
  const swiper = new Swiper(slider, {
    modules: [Navigation, Keyboard, A11y],
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    navigation: {
      nextEl: buttonNext,
      prevEl: buttonPrev,
    },
  });
};

export { selectedProjectsSlider, reviewsSlider, heroSlider };
