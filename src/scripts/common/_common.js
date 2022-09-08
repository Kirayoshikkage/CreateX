import BurgerMenu from '../components/BurgerMenu.js';
import addsElementsEventKeydown from '../helpers/addsElementsEventKeydown.js';
import {
  feedbackFormValidation,
  newsletterSubscriptionFormValidation,
} from '../helpers/configuresFormsValidation.js';
import addsSmoothScroll from '../helpers/addsSmoothScroll.js';

export default function _common() {
  const burgerMenu = new BurgerMenu({
    container: '.burger-menu',
    trigger: '.header .burger-trigger',
    body: '.burger-menu__body',
    breakpoints: {
      768: () => {
        if (burgerMenu.isOpen()) {
          burgerMenu.close();
        }
      },
    },
  });
  burgerMenu.init();

  addsSmoothScroll('.smooth-scroll');

  addsElementsEventKeydown(
    document.querySelectorAll('.custom-checkbox'),
    'Enter',
    (currentTarget) => {
      const input = currentTarget.querySelector('input');
      input.checked = !input.checked;
    },
  );

  feedbackFormValidation();

  newsletterSubscriptionFormValidation();
}
