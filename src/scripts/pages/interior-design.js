import Accordion from '../components/Accordion.js';
import DropDownAnimation from '../components/DropDownAnimation.js';
import {
  projectsSlider, pricingSlider,
} from '../helpers/configuresSliders.js';
import addsCardsProjectRouting from '../helpers/addsCardsProjectRouting.js';
import _common from '../common/_common.js';

_common();

const weOfferAccordion = new Accordion('.we-offer__accordion', {
  apiAnimation: new DropDownAnimation(),
});
weOfferAccordion.init();

projectsSlider('.related-projects');

addsCardsProjectRouting();

pricingSlider();
