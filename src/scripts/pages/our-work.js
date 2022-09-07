import {
  reviewsSlider,
  ourWorkTabsSlider,
} from '../helpers/configuresSliders.js';
import Tabs from '../components/Tabs.js';
import addsCardsProjectRouting from '../helpers/addsCardsProjectRouting.js';
import _common from '../common/_common.js';
import errorHandler from '../helpers/errorHandler.js';

errorHandler(() => {
  _common();

  const tabsSlider = ourWorkTabsSlider();
  const ourWorkTabs = new Tabs('.our-work__tabs');
  ourWorkTabs.on('tabSwitching', () => {
    tabsSlider.update();
  });
  ourWorkTabs.on('showed', ([content]) => {
    content?.classList.add('swiper-slide');
  });
  ourWorkTabs.on('hiding', ([content]) => {
    content?.classList.remove('swiper-slide');
  });
  ourWorkTabs.init();

  addsCardsProjectRouting();

  reviewsSlider();
});
