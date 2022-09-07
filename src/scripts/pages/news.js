import { categoriesTabsSlider } from '../helpers/configuresSliders.js';
import Tabs from '../components/Tabs.js';
import _common from '../common/_common.js';
import errorHandler from '../helpers/errorHandler.js';

errorHandler(() => {
  _common();

  const tabsSlider = categoriesTabsSlider();
  const newsTabs = new Tabs('.categories__tabs');
  newsTabs.on('tabSwitching', () => {
    tabsSlider.update();
  });
  newsTabs.on('showed', ([content]) => {
    if (content.classList.contains('tabs__empty-message')) return;

    content?.classList.add('swiper-slide');
  });
  newsTabs.on('hiding', ([content]) => {
    content?.classList.remove('swiper-slide');
  });
  newsTabs.init();
});
