import {
  reviewsSlider,
  ourWorkTabsSlider,
} from '../helpers/configuresSliders.js';
import Tabs from '../components/Tabs.js';
import addsCardsProjectRouting from '../helpers/addsCardsProjectRouting.js';
import _common from '../common/_common.js';
import errorHandler from '../helpers/errorHandler.js';
import FocusLockSliders from '../components/FocusLockSliders.js';

errorHandler(() => {
  _common();

  const sliderTabs = ourWorkTabsSlider();
  const sliderWrapperTabs = document.querySelector('.our-work .swiper .swiper-wrapper');
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

  const ourWorkTabs = new Tabs('.our-work__tabs');
  ourWorkTabs.on('tabSwitching', () => {
    sliderTabs.update();
    focusLockSlider.updatesFocusLock();
  });
  ourWorkTabs.on('showed', ([content]) => {
    content?.classList.add('swiper-slide');
  });
  ourWorkTabs.on('hiding', ([content]) => {
    content?.classList.remove('swiper-slide');
    content?.classList.remove('swiper-slide-visible');
  });
  ourWorkTabs.init();

  addsCardsProjectRouting();

  reviewsSlider();
});
