import { tunesProjectSlider, tunesProjectsSlider } from '../helpers/tunesSliders';
import addsCardsProjectRouting from '../helpers/addsCardsProjectRouting';

export default function project() {
  tunesProjectSlider();

  addsCardsProjectRouting();

  tunesProjectsSlider('.similar-projects');
}
