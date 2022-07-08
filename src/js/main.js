import { heroSlider, selectedProjectsSlider, reviewsSlider } from './helpers/sliders';
import createsCircularProgressbar from './helpers/createsCircularProgressbar';

const { page } = document.body.dataset;

if (page === 'index') {
  heroSlider();

  selectedProjectsSlider();

  reviewsSlider();

  createsCircularProgressbar('.facts-figures .progressbar__circle');
}
