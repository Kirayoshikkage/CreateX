import BurgerMenu from '../components/BurgerMenu.js';
import addsSmoothScroll from '../helpers/addsSmoothScroll.js';
import getFontSizeBody from '../helpers/getFontSizeBody.js';
import { feedbackFormValidation, newsletterSubscriptionFormValidation } from '../helpers/configuresFormValidation.js';

export default function _common() {
  const burgerMenu = new BurgerMenu({
    container: '.burger-menu',
    trigger: '.header .burger-trigger',
    body: '.burger-menu__body',
    breakpoints: {
      // 48rem - 768px
      [getFontSizeBody() * 48]: () => {
        if (burgerMenu.isOpen()) {
          burgerMenu.close();
        }
      },
    },
  });
  burgerMenu.init();

  addsSmoothScroll('.smooth-scroll');

  feedbackFormValidation();

  newsletterSubscriptionFormValidation();
}
