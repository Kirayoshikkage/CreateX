import BurgerMenu from '../components/BurgerMenu';
import addsElementsEventKeydown from '../helpers/addsElementsEventKeydown';
import {
  tunesValidationFeedbackForm,
  tunesValidationNewsletterSubscriptionForm,
} from '../helpers/tunesValidationForms';
import addsSmoothScroll from '../helpers/addsSmoothScroll';

export default function forAllPage() {
  const burgerMenu = new BurgerMenu({
    container: '.burger-menu',
    trigger: '.header .burger-trigger',
    breakpoints: {
      768: [() => {
        if (burgerMenu.isOpen()) {
          burgerMenu.close();
        }
      }],
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

  tunesValidationFeedbackForm();

  tunesValidationNewsletterSubscriptionForm();
}
