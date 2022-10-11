import Select from '../components/Select.js';
import DropDownAnimation from '../components/DropDownAnimation.js';
import _common from '../common/_common.js';
import errorHandler from '../helpers/errorHandler.js';
import { contactsUsFormValidation } from '../helpers/configuresFormValidation.js';

errorHandler(() => {
  _common();

  contactsUsFormValidation();

  const interestedSelect = new Select('.interested-select', {
    animation: new DropDownAnimation(),
  });
  interestedSelect.init();

  const locationSelect = new Select('.location-select', {
    animation: new DropDownAnimation(),
  });
  locationSelect.init();
});
