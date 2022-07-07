import { sliderInSectionSelectedProjects, sliderInSectionReviews } from './helpers/sliders';

const { page } = document.body.dataset;

if (page === 'index') {
  sliderInSectionSelectedProjects();

  sliderInSectionReviews();
}
