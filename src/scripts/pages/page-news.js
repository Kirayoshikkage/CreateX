import _common from '../common/_common.js';
import errorHandler from '../helpers/errorHandler.js';
import { commentFormValidation } from '../helpers/configuresFormValidation.js';

errorHandler(() => {
  _common();

  commentFormValidation();
});
