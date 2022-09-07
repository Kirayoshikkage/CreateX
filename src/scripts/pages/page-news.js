import { commentFormValidation } from '../helpers/configuresFormsValidation.js';
import _common from '../common/_common.js';
import errorHandler from '../helpers/errorHandler.js';

errorHandler(() => {
  _common();

  commentFormValidation();
});
