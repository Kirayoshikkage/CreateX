import Swiper, { Navigation, Keyboard, A11y } from 'swiper';

// eslint-disable-next-line func-names
const sliderInSectionSelectedProjects = function () {
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
  });
};

const sliderInSectionReviews = function () {
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

export { sliderInSectionSelectedProjects, sliderInSectionReviews };
