import Swiper, {
  Navigation, Pagination, A11y, Keyboard, Grid, Thumbs,
} from 'swiper';
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
        if (!progressbar.elementIsActive(element)) return;

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
const tunesProjectsSlider = function (selector) {
  const slider = `${selector} .swiper`;
  const buttonNext = `${selector} .swiper-button-next`;
  const buttonPrev = `${selector} .swiper-button-prev`;
  // eslint-disable-next-line no-unused-vars
  const swiper = new Swiper(slider, {
    modules: [Navigation, Keyboard, A11y],
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    slidesPerView: 3,
    spaceBetween: 30,
    watchSlidesProgress: true,
    navigation: {
      nextEl: buttonNext,
      prevEl: buttonPrev,
    },
    breakpoints: {
      0: {
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

const tunesTabsSlider = function () {
  const sliderSelector = '.our-work .swiper';
  const paginationSelector = '.our-work .swiper-pagination';
  const nextSelector = '.our-work .swiper-button-next';
  const prevSelector = '.our-work .swiper-button-prev';

  // eslint-disable-next-line no-unused-vars
  const swiper = new Swiper(sliderSelector, {
    modules: [Grid, A11y, Keyboard, Pagination, Navigation],
    slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: 30,
    grid: {
      rows: 3,
    },
    watchSlidesProgress: true,
    pagination: {
      el: paginationSelector,
      clickable: true,
      renderBullet(index, className) {
        return `<button class="btn-reset ${className}">${index + 1}</button>`;
      },
    },
    navigation: {
      enabled: false,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        grid: {
          rows: 1,
        },
        pagination: {
          enabled: false,
        },
        navigation: {
          nextEl: nextSelector,
          prevEl: prevSelector,
          enabled: true,
        },
      },
      576: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        grid: {
          rows: 3,
        },
        pagination: {
          enabled: true,
        },
        navigation: {
          enabled: false,
        },
      },
      1024: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        grid: {
          rows: 3,
        },
      },
    },
  });

  return swiper;
};

const tunesProjectSlider = function () {
  const sliderSelector = '.project__slider';
  const thumbnailsSelector = '.project__slider-thumbnails';
  const nextSelector = '.project .swiper-button-next';
  const prevSelector = '.project .swiper-button-prev';

  const thumbnailsSlider = new Swiper(thumbnailsSelector, {
    modules: [Keyboard, A11y],
    keyboard: {
      enabled: true,
    },
    spaceBetween: 20,
    slidesPerView: 'auto',
    watchSlidesProgress: true,
  });
  // eslint-disable-next-line no-unused-vars
  const slider = new Swiper(sliderSelector, {
    modules: [Navigation, Keyboard, A11y, Thumbs],
    keyboard: {
      enabled: true,
    },
    navigation: {
      nextEl: nextSelector,
      prevEl: prevSelector,
    },
    thumbs: {
      swiper: thumbnailsSlider,
    },
  });

  thumbnailsSlider.slides.forEach((thumbnail, index) => {
    thumbnail.setAttribute('tabindex', 0);

    thumbnail.addEventListener('keydown', (e) => {
      if (e.code !== 'Enter') return;

      slider.slideTo(index);
    });
  });
};

const tunesPricingSlider = function () {
  const slider = '.pricing .swiper';
  const buttonNext = '.pricing .swiper-button-next';
  const buttonPrev = '.pricing .swiper-button-prev';
  // eslint-disable-next-line no-unused-vars
  const swiper = new Swiper(slider, {
    modules: [Navigation, Keyboard, A11y],
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    slidesPerView: 2,
    spaceBetween: 30,
    watchSlidesProgress: true,
    navigation: {
      nextEl: buttonNext,
      prevEl: buttonPrev,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      1440: {
        slidesPerView: 2,
      },
    },
  });
};

const tunesOurHistorySlider = function () {
  const sliderSelector = '.our-history .swiper';
  const paginationSelector = '.our-history .swiper-pagination';
  const listEvents = ['Present', 'March 2019', 'November 2018', 'July 2015', 'August 2010', 'February 2007', 'May 2004', 'October 2001', 'June 2000'];

  // eslint-disable-next-line no-unused-vars
  const swiper = new Swiper(sliderSelector, {
    modules: [A11y, Keyboard, Pagination],
    direction: 'vertical',
    spaceBetween: 36,
    pagination: {
      el: paginationSelector,
      clickable: true,
      renderBullet(index, className) {
        return `<button class="btn-reset ${className}" type="button">${listEvents[index]}</button>`;
      },
    },
    breakpoints: {
      0: {
        direction: 'horizontal',
      },
      768: {
        direction: 'vertical',
      },
    },
  });
};

const tunesOurTeamSlider = function () {
  const slider = '.our-team .swiper';
  const buttonNext = '.our-team .swiper-button-next';
  const buttonPrev = '.our-team .swiper-button-prev';
  // eslint-disable-next-line no-unused-vars
  const swiper = new Swiper(slider, {
    modules: [Navigation, Keyboard, A11y],
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    slidesPerView: 4,
    spaceBetween: 30,
    navigation: {
      nextEl: buttonNext,
      prevEl: buttonPrev,
    },
    watchSlidesProgress: true,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      425: { slidesPerView: 2 },
      768: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 4,
      },
    },
  });
};

export {
  tunesHeroSlider, tunesProjectsSlider, tunesReviewsSlider, tunesTabsSlider, tunesProjectSlider,
  tunesPricingSlider, tunesOurHistorySlider, tunesOurTeamSlider,
};
