import { categoriesTabsSlider } from '../helpers/configuresSliders.js';
import Tabs from '../components/Tabs.js';
import _common from '../common/_common.js';
import errorHandler from '../helpers/errorHandler.js';
import FocusLockSliders from '../components/FocusLockSliders.js';

errorHandler(() => {
  _common();

  const sliderTabs = categoriesTabsSlider();
  const sliderWrapperTabs = document.querySelector('.categories .swiper .swiper-wrapper');
  const focusLockSlider = new FocusLockSliders({
    container: sliderWrapperTabs,
    exception: '.swiper-slide-visible',
  });
  focusLockSlider.init();
  sliderTabs.on('slideChange', () => {
    focusLockSlider.updatesFocusLock();
  });
  sliderTabs.on('breakpoint', () => {
    setTimeout(() => {
      focusLockSlider.updatesFocusLock();
    }, 0);
  });

  const newsTabs = new Tabs('.categories__tabs');
  newsTabs.on('tabSwitching', () => {
    sliderTabs.update();
    focusLockSlider.updatesFocusLock();
  });
  newsTabs.on('showed', ([content]) => {
    if (content.classList.contains('tabs__empty-message')) return;

    content?.classList.add('swiper-slide');
  });
  newsTabs.on('hiding', ([content]) => {
    content?.classList.remove('swiper-slide');
    content?.classList.remove('swiper-slide-visible');
  });
  newsTabs.init();
});
