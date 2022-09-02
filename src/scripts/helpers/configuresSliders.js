import Swiper, {
  Navigation, Pagination, A11y, Keyboard, Grid, Thumbs,
} from 'swiper';
import changesFocusLockOnChildrenSlide from './changesFocusLockOnChildrenSlide.js';
import SliderProgressbar from '../components/SliderProgressbar.js';
import debounce from './debounce.js';

const heroSlider = function () {
  const slider = '.hero .swiper';
  const buttonNext = '.hero .swiper-button-next';
  const buttonPrev = '.hero .swiper-button-prev';
  // eslint-disable-next-line no-unused-vars
  const swiper = new Swiper(slider, {
    modules: [Navigation, Keyboard, A11y],
    speed: 600,
    keyboard: {
      enabled: true,
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

const projectsSlider = function (selector) {
  const slider = `${selector} .swiper`;
  const buttonNext = `${selector} .swiper-button-next`;
  const buttonPrev = `${selector} .swiper-button-prev`;
  // eslint-disable-next-line no-unused-vars
  const swiper = new Swiper(slider, {
    modules: [Navigation, Keyboard, A11y],
    keyboard: {
      enabled: true,
    },
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

  changesFocusLockOnChildrenSlide(swiper, selector);
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
    },
    navigation: {
      nextEl: buttonNext,
      prevEl: buttonPrev,
    },
  });
};

const pricingSlider = function () {
  const slider = '.pricing .swiper';
  const buttonNext = '.pricing .swiper-button-next';
  const buttonPrev = '.pricing .swiper-button-prev';
  // eslint-disable-next-line no-unused-vars
  const swiper = new Swiper(slider, {
    modules: [Navigation, Keyboard, A11y],
    keyboard: {
      enabled: true,
    },
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

  changesFocusLockOnChildrenSlide(swiper, slider);
};

const ourWorkTabsSlider = function () {
  const sliderSelector = '.our-work .swiper';
  const paginationSelector = '.our-work .swiper-pagination';
  const nextSelector = '.our-work .swiper-button-next';
  const prevSelector = '.our-work .swiper-button-prev';

  // eslint-disable-next-line no-unused-vars
  const swiper = new Swiper(sliderSelector, {
    modules: [Grid, A11y, Keyboard, Pagination, Navigation],
    spaceBetween: 30,
    watchSlidesProgress: true,
    keyboard: {
      enabled: true,
    },
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

const projectSlider = function () {
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

const ourHistorySlider = function () {
  const sliderSelector = '.our-history .swiper';
  const paginationSelector = '.our-history .swiper-pagination';
  const listEvents = ['Present', 'March 2019', 'November 2018', 'July 2015', 'August 2010', 'February 2007', 'May 2004', 'October 2001', 'June 2000'];

  // eslint-disable-next-line no-unused-vars
  const swiper = new Swiper(sliderSelector, {
    modules: [A11y, Keyboard, Pagination],
    spaceBetween: 36,
    keyboard: {
      enabled: true,
    },
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

const ourTeamSlider = function () {
  const slider = '.our-team .swiper';
  const buttonNext = '.our-team .swiper-button-next';
  const buttonPrev = '.our-team .swiper-button-prev';
  // eslint-disable-next-line no-unused-vars
  const swiper = new Swiper(slider, {
    modules: [Navigation, Keyboard, A11y],
    keyboard: {
      enabled: true,
    },
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
      425: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 4,
      },
    },
  });

  changesFocusLockOnChildrenSlide(swiper, slider);
};

function getMaxHeightContent(elements) {
  return Array.from(elements).reduce((maxHeight, element) => {
    const height = element.scrollHeight;

    if (height > maxHeight) {
      // eslint-disable-next-line no-param-reassign
      maxHeight = height;
    }

    return maxHeight;
  }, 0);
}

function calculatesHeight(swiper, maxHeightContent) {
  const { spaceBetween = 0, grid: { rows = 1 } = {} } = swiper.params;

  return (maxHeightContent * rows) + (spaceBetween * (rows - 1));
}

const categoriesTabsSlider = function () {
  const sliderSelector = '.categories .swiper';
  const nextSelector = '.categories .swiper-button-next';
  const prevSelector = '.categories .swiper-button-prev';

  // eslint-disable-next-line no-unused-vars
  const swiper = new Swiper(sliderSelector, {
    modules: [Grid, A11y, Keyboard, Navigation],
    spaceBetween: 45,
    watchSlidesProgress: true,
    navigation: {
      nextEl: nextSelector,
      prevEl: prevSelector,
    },
    keyboard: {
      enabled: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        grid: {
          rows: 2,
        },
      },
      1024: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        grid: {
          rows: 2,
        },
      },
    },
  });
  const normalizesHeightWrapper = function () {
    const swiperElement = document.querySelector(sliderSelector);
    const swiperWrapper = swiperElement.querySelector('.swiper-wrapper');
    const maxHeightContent = getMaxHeightContent(swiperElement.querySelectorAll('.news'));

    if (!maxHeightContent) return;

    swiperWrapper.style.height = `${calculatesHeight(swiper, maxHeightContent)}px`;
  };

  setTimeout(() => {
    normalizesHeightWrapper();
  }, 0);

  const update = debounce(() => {
    normalizesHeightWrapper(swiper);
  }, 500);
  window.addEventListener('resize', update);

  return swiper;
};

export {
  heroSlider, projectsSlider, reviewsSlider,
  ourWorkTabsSlider, projectSlider,
  pricingSlider, ourHistorySlider, ourTeamSlider,
  categoriesTabsSlider,
};
