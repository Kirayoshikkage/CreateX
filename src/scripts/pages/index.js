import {
  heroSlider,
  projectsSlider,
  reviewsSlider,
} from '../helpers/configuresSliders.js';
import {
  questionFormValidation,
} from '../helpers/configuresFormsValidation.js';
import CircularProgressbar from '../components/CircularProgressbar.js';
import addsCardsProjectRouting from '../helpers/addsCardsProjectRouting.js';
import _common from '../common/_common.js';
import errorHandler from '../helpers/errorHandler.js';

errorHandler(() => {
  _common();

  heroSlider();

  questionFormValidation();

  projectsSlider('.selected-projects');

  reviewsSlider();

  addsCardsProjectRouting();

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
});
