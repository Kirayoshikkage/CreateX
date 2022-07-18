import BurgerMenu from './components/BurgerMenu';
import {
  tunesHeroSlider,
  tunesProjectsSlider,
  tunesReviewsSlider,
} from './helpers/tunesSliders';
import addsElementsEventKeydown from './helpers/addsElementsEventKeydown';
import CircularProgressbar from './components/CircularProgressbar';
import {
  tunesValidationQuestionForm,
  tunesValidationFeedbackForm,
  tunesValidationNewsletterSubscriptionForm,
} from './helpers/tunesValidationForms';
import addsSmoothScroll from './helpers/addsSmoothScroll';
import showsErrorNotification from './helpers/showsErrorNotification';
import Accordion from './components/Accordion';
import addsCardsProjectRouting from './helpers/addsCardsProjectRouting';

const { page } = document.body.dataset;

function app() {
  addsSmoothScroll('.smooth-scroll');

  const burgerMenu = new BurgerMenu({
    container: '.burger-menu',
    trigger: '.header .burger-trigger',
    breakpoints: {
      768: [() => burgerMenu.close()],
    },
  });

  burgerMenu.init();

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

  if (page === 'index') {
    tunesHeroSlider();

    tunesValidationQuestionForm();

    tunesProjectsSlider('.selected-projects');

    tunesReviewsSlider();

    const totallySatisfiedClientsCircularProgressbar = new CircularProgressbar({
      container: '.facts-figures__item_totally-satisfied-clients',
      progress: 98,
    });

    totallySatisfiedClientsCircularProgressbar.init();

    const yearsExperienceCircularProgressbar = new CircularProgressbar({
      container: '.facts-figures__item_years-experience',
      progress: 20,
      isPercent: false,
      to: 26,
      showPercent: false,
    });

    yearsExperienceCircularProgressbar.init();

    const workingHoursSpentCircularProgressbar = new CircularProgressbar({
      container: '.facts-figures__item_working-hours-spent',
      progress: 9452,
      isPercent: false,
      to: 11500,
      showPercent: false,
    });

    workingHoursSpentCircularProgressbar.init();

    const succeededProjectsCircularProgressbar = new CircularProgressbar({
      container: '.facts-figures__item_succeeded-projects',
      progress: 100,
    });

    succeededProjectsCircularProgressbar.init();

    addsCardsProjectRouting();
  } else if (page === 'interior-design') {
    const weOfferAccordion = new Accordion('.we-offer__accordion');

    weOfferAccordion.init();

    tunesProjectsSlider('.related-projects');

    addsCardsProjectRouting();
  }
}

try {
  app();
} catch (error) {
  showsErrorNotification();

  console.log(error);
}
