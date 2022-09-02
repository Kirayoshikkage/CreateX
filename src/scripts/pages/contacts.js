import Select from '../components/Select.js';
import DropDownAnimation from '../components/DropDownAnimation.js';
import { contactsUsFormValidation } from '../helpers/configuresFormsValidation.js';
import _common from '../common/_common.js';

_common();

const interestedSelect = new Select('.interested-select', {
  animation: new DropDownAnimation(),
});
interestedSelect.init();

const locationSelect = new Select('.location-select', {
  animation: new DropDownAnimation(),
});
locationSelect.init();

contactsUsFormValidation(locationSelect);
