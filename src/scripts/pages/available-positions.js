import Modal from '../components/Modal.js';
import FocusLock from '../components/FocusLock.js';
import { subscribeModalFormValidation, cvFormValidation } from '../helpers/configuresFormsValidation.js';
import Select from '../components/Select.js';
import DropDownAnimation from '../components/DropDownAnimation.js';
import customFileInput from '../components/customFileInput.js';
import _common from '../common/_common.js';
import errorHandler from '../helpers/errorHandler.js';

errorHandler(() => {
  _common();

  const focusLock = new FocusLock({
    exception: ['.subscribe-modal', '.cv-modal'],
    mutationObserver: true,
  });
  focusLock.init();

  const subscribeModal = new Modal({
    container: '.subscribe-modal',
    trigger: '.available-positions__subscribe',
    body: '.modal__body',
    focusLock,
  });
  subscribeModal.init();
  subscribeModalFormValidation(() => {
    subscribeModal.close();
  });

  const cvModal = new Modal({
    container: '.cv-modal',
    trigger: '.available-positions__cv',
    body: '.modal__body',
    focusLock,
  });
  cvModal.init();

  const locationSelect = new Select('.location-select', {
    animation: new DropDownAnimation(),
  });
  locationSelect.init();

  customFileInput();

  cvFormValidation(locationSelect, () => {
    cvModal.close();
  });
});
