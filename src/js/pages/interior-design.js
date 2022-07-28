import Accordion from '../components/Accordion';
import {
  tunesProjectsSlider, tunesPricingSlider,
} from '../helpers/tunesSliders';
import addsCardsProjectRouting from '../helpers/addsCardsProjectRouting';

export default function interiorDesign() {
  const weOfferAccordion = new Accordion('.we-offer__accordion');
  weOfferAccordion.init();

  tunesProjectsSlider('.related-projects');

  addsCardsProjectRouting();

  tunesPricingSlider();
}
