import {
  tunesHeroSlider,
  tunesProjectsSlider,
  tunesReviewsSlider,
} from '../helpers/tunesSliders';
import {
  tunesValidationQuestionForm,
} from '../helpers/tunesValidationForms';
import CircularProgressbar from '../components/CircularProgressbar';
import addsCardsProjectRouting from '../helpers/addsCardsProjectRouting';

export default function index() {
  tunesHeroSlider();

  tunesValidationQuestionForm();

  tunesProjectsSlider('.selected-projects');

  tunesReviewsSlider();

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
}
