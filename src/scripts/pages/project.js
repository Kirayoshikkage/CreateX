import { projectSlider, projectsSlider } from '../helpers/configuresSliders.js';
import addsCardsProjectRouting from '../helpers/addsCardsProjectRouting.js';
import _common from '../common/_common.js';
import errorHandler from '../helpers/errorHandler.js';

errorHandler(() => {
  _common();

  projectSlider();

  addsCardsProjectRouting();

  projectsSlider('.similar-projects');
});
