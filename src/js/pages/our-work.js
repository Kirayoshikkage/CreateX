import {
  tunesReviewsSlider,
  tunesTabsSlider,
} from '../helpers/tunesSliders';
import Tabs from '../components/Tabs';
import addsCardsProjectRouting from '../helpers/addsCardsProjectRouting';

export default function ourWork() {
  const tabsSlider = tunesTabsSlider();
  const ourWorkTabs = new Tabs('.our-work__tabs', {
    animation: {
      setsStyleVisibility(content) {
        // eslint-disable-next-line no-param-reassign
        content.style.display = 'block';

        content.classList.add('swiper-slide');
      },
      setsStyleHidding(content) {
        // eslint-disable-next-line no-param-reassign
        content.style.display = 'none';

        content.classList.remove('swiper-slide');
      },
    },
  });
  ourWorkTabs.on('tabSwitching', () => {
    tabsSlider.update();
  });
  ourWorkTabs.init();

  addsCardsProjectRouting();

  tunesReviewsSlider();
}
