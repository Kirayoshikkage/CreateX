import Swiper, { Navigation, Keyboard, A11y } from 'swiper';
import SliderProgressbar from '../components/SliderProgressbar';

const tunesHeroSlider = function () {
  const slider = '.hero .swiper';
  const buttonNext = '.hero .swiper-button-next';
  const buttonPrev = '.hero .swiper-button-prev';
  // eslint-disable-next-line no-unused-vars
  const swiper = new Swiper(slider, {
    modules: [Navigation, Keyboard, A11y],
    speed: 600,
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    navigation: {
      nextEl: buttonNext,
      prevEl: buttonPrev,
    },
  });
  const progressbar = new SliderProgressbar(
    '.hero .slider-progressbar__list',
    swiper.slides.length,
  );

  progressbar.init();

  swiper.on('slideChange', (e) => {
    const { activeIndex, previousIndex } = e;
    const activeElement = progressbar.getElementOnIndex(activeIndex);
    const previousElement = progressbar.getElementOnIndex(previousIndex);

    if (previousIndex > activeIndex) {
      progressbar.makesElementInactive(previousElement);
    }

    progressbar.makesElementActive(activeElement);
  });

  progressbar.setsElementsEventListener('pointerdown', (e) => {
    const idElement = e.target.dataset.id;

    swiper.slideTo(idElement);

    progressbar.getElements().forEach((element, index) => {
      if (index > idElement) {
        progressbar.makesElementInactive(element);

        return;
      }

      if (index !== idElement) {
        progressbar.makesElementActive(element);
      }
    });
  });
};

// eslint-disable-next-line func-names
const tunesSelectedProjectsSlider = function () {
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
      320: {
        slidesPerView: 1,
      },
      576: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });
};

const tunesReviewsSlider = function () {
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

export { tunesHeroSlider, tunesSelectedProjectsSlider, tunesReviewsSlider };
