import BurgerMenu from './components/BurgerMenu';
import {
  tunesHeroSlider,
  tunesSelectedProjectsSlider,
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

    tunesSelectedProjectsSlider();

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

    addsElementsEventKeydown(
      document.querySelectorAll('.card-project'),
      'Enter',
      (currentTarget) => {
        const link = currentTarget.querySelector('.card-project__button');
        const linkHref = link.getAttribute('href');

        window.location.href = linkHref;
      },
    );
  }
}

try {
  app();
} catch (error) {
  showsErrorNotification();

  console.log(error);
}
