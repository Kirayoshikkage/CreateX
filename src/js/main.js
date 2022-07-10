import { heroSlider, selectedProjectsSlider, reviewsSlider } from './helpers/sliders';
import createsCircularProgressbar from './helpers/createsCircularProgressbar';
import addElementsEventKeydown from './helpers/addElementsEventKeydown';

const { page } = document.body.dataset;

if (page === 'index') {
  heroSlider();

  selectedProjectsSlider();

  reviewsSlider();

  createsCircularProgressbar('.facts-figures .progressbar__circle');

  addElementsEventKeydown(document.querySelectorAll('.custom-checkbox'), 'Enter', (currentTarget) => {
    const input = currentTarget.querySelector('input');
    input.checked = !input.checked;
  });

  addElementsEventKeydown(document.querySelectorAll('.card-project'), 'Enter', (currentTarget) => {
    const link = currentTarget.querySelector('.card-project__button');
    const linkHref = link.getAttribute('href');

    window.location.href = linkHref;
  });
}
