import { projectSlider, projectsSlider } from '../helpers/configuresSliders.js';
import addsCardsProjectRouting from '../helpers/addsCardsProjectRouting.js';
import _common from '../common/_common.js';

_common();

projectSlider();

addsCardsProjectRouting();

projectsSlider('.similar-projects');
