import ValidationForm from '../components/ValidationForm.js';
import Modal from '../components/Modal.js';
import FocusLock from '../components/FocusLock.js';

const focusLock = new FocusLock({
  exception: '.modal-successful-sending',
  mutationObserver: true,
});
focusLock.init();

const modalSuccessfulSending = new Modal({
  container: '.modal-successful-sending',
  body: '.modal__body',
  focusLock,
});
modalSuccessfulSending.init();

function nameFieldValidates(formValidation, selectorForm) {
  formValidation.addRuleValidationElements(
    `${selectorForm} .form__input_name`,
    [
      {
        rule: 'text',
        errorMessage: 'The field can only contain letters!',
      },
      {
        rule: 'maxLength',
        value: 21,
        errorMessage: 'Maximum value - 21 characters!',
      },
      {
        rule: 'minLength',
        value: 2,
        errorMessage: 'Minimum value - 2 characters!',
      },
      {
        rule: 'requered',
        errorMessage: 'This field is required!',
      },
    ],
  );
}

function phoneFieldValidates(formValidation, selectorForm) {
  formValidation.addRuleValidationElements(
    `${selectorForm} .form__input_phone`,
    [
      {
        rule: 'phone',
        errorMessage: 'Please enter a valid phone number!',
      },
      {
        rule: 'requered',
        errorMessage: 'This field is required!',
      },
    ],
  );
}

function messageFieldValidates(formValidation, selectorForm) {
  formValidation.addRuleValidationElements(
    `${selectorForm} .form__input_message`,
    [
      {
        rule: 'text',
        errorMessage: 'The field can only contain letters!',
      },
      {
        rule: 'maxLength',
        value: 54,
        errorMessage: 'Maximum value  - 54 characters!',
      },
      {
        rule: 'minLength',
        value: 2,
        errorMessage: 'Minimum value - 2 characters!',
      },
      {
        rule: 'requered',
        errorMessage: 'This field is required!',
      },
    ],
  );
}

function emailFieldValidates(formValidation, selectorForm) {
  formValidation.addRuleValidationElements(
    `${selectorForm} .form__input_email`,
    [
      {
        rule: 'email',
        errorMessage: 'Please enter a valid e-mail!',
      },
      {
        rule: 'maxLength',
        value: 40,
        errorMessage: 'Maximum value  - 40 characters!',
      },
      {
        rule: 'minLength',
        value: 12,
        errorMessage: 'Minimum value - 12 characters!',
      },
      {
        rule: 'requered',
        errorMessage: 'This field is required!',
      },
    ],
  );
}

function showsDeliveryStatusNotification() {
  setTimeout(() => {
    modalSuccessfulSending.open();
  }, 0);

  /*   setTimeout(() => {
      if (modalSuccessfulSending.isOpen()) {
        modalSuccessfulSending.close();
      }
    }, 1500); */
}

/**
 *
 * Forms validation
 *
 */

function questionFormValidation() {
  const selectorForm = '.question-form';
  const formValidation = new ValidationForm(selectorForm);

  formValidation.init();

  nameFieldValidates(formValidation, selectorForm);

  phoneFieldValidates(formValidation, selectorForm);

  messageFieldValidates(formValidation, selectorForm);

  formValidation.submit(() => {
    if (formValidation.isValid()) {
      formValidation.getForm().reset();

      showsDeliveryStatusNotification();
    }
  });
}

function feedbackFormValidation() {
  const selectorForm = '.feedback-form';
  const formValidation = new ValidationForm(selectorForm);

  formValidation.init();

  nameFieldValidates(formValidation, selectorForm);

  phoneFieldValidates(formValidation, selectorForm);

  messageFieldValidates(formValidation, selectorForm);

  emailFieldValidates(formValidation, selectorForm);

  formValidation.submit(() => {
    if (formValidation.isValid()) {
      formValidation.getForm().reset();

      showsDeliveryStatusNotification();
    }
  });
}

function newsletterSubscriptionFormValidation() {
  const selectorForm = '.newsletter-subscription-form';
  const formValidation = new ValidationForm(selectorForm);

  formValidation.init();

  emailFieldValidates(formValidation, selectorForm);

  formValidation.submit(() => {
    if (formValidation.isValid()) {
      formValidation.getForm().reset();

      showsDeliveryStatusNotification();
    }
  });
}

function subscribeModalFormValidation(calledOnSuccessfulSubmission) {
  const selectorForm = '.subscribe-form';
  const formValidation = new ValidationForm(selectorForm);

  formValidation.init();

  nameFieldValidates(formValidation, selectorForm);

  emailFieldValidates(formValidation, selectorForm);

  formValidation.submit(() => {
    if (formValidation.isValid()) {
      formValidation.getForm().reset();

      calledOnSuccessfulSubmission();

      showsDeliveryStatusNotification();
    }
  });
}

function commentFormValidation() {
  const selectorForm = '.comment-form';
  const formValidation = new ValidationForm(selectorForm);

  formValidation.init();

  nameFieldValidates(formValidation, selectorForm);

  emailFieldValidates(formValidation, selectorForm);

  messageFieldValidates(formValidation, selectorForm);

  formValidation.submit(() => {
    if (formValidation.isValid()) {
      formValidation.getForm().reset();

      showsDeliveryStatusNotification();
    }
  });
}

function cvFormValidation(locationSelect, calledOnSuccessfulSubmission) {
  const selectorForm = '.cv-form';
  const formValidation = new ValidationForm(selectorForm);

  formValidation.init();

  nameFieldValidates(formValidation, selectorForm);

  formValidation.addCustomRuleValidateInList('custom-select', ({ errorMessage }) => {
    if (!locationSelect.isFilled()) {
      return {
        validate: false,
        errorMessage,
      };
    }

    return {
      validate: true,
    };
  });

  formValidation.addRuleValidationElements('.location-select', [{
    rule: 'custom-select',
    errorMessage: 'Country of residence required',
  }]);

  formValidation.addRuleValidationElements('.custom-file__input', [{
    rule: 'requered',
    errorMessage: 'You must attach your cv!',
  }]);

  phoneFieldValidates(formValidation, selectorForm);

  emailFieldValidates(formValidation, selectorForm);

  messageFieldValidates(formValidation, selectorForm);

  formValidation.submit(() => {
    if (formValidation.isValid()) {
      formValidation.getForm().reset();

      calledOnSuccessfulSubmission();

      showsDeliveryStatusNotification();
    }
  });
}

function contactsUsFormValidation(locationSelect) {
  const selectorForm = '.contacts-us-form';
  const formValidation = new ValidationForm(selectorForm);

  formValidation.init();

  nameFieldValidates(formValidation, selectorForm);

  phoneFieldValidates(formValidation, selectorForm);

  formValidation.addCustomRuleValidateInList('custom-select', ({ errorMessage }) => {
    if (!locationSelect.isFilled()) {
      return {
        validate: false,
        errorMessage,
      };
    }

    return {
      validate: true,
    };
  });

  formValidation.addRuleValidationElements('.location-select', [{
    rule: 'custom-select',
    errorMessage: 'Country of residence required',
  }]);

  messageFieldValidates(formValidation, selectorForm);

  formValidation.submit(() => {
    if (formValidation.isValid()) {
      formValidation.getForm().reset();

      showsDeliveryStatusNotification();
    }
  });
}

export {
  questionFormValidation,
  feedbackFormValidation,
  newsletterSubscriptionFormValidation,
  subscribeModalFormValidation,
  commentFormValidation,
  cvFormValidation,
  contactsUsFormValidation,
};
