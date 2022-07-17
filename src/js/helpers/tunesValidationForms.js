import ValidationForm from '../components/ValidationForm';
import Modal from '../components/Modal';
import FocusLock from '../components/FocusLock';

const focusLock = new FocusLock('.modal-successful-sending');
const modalSuccessfulSending = new Modal({
  container: '.modal-successful-sending',
  focusLock,
});

focusLock.init();

modalSuccessfulSending.init();

function validatesNameField(formValidation, selectorForm) {
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

function validatesPhoneField(formValidation, selectorForm) {
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

function validatesMessageField(formValidation, selectorForm) {
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

function validatesEmailField(formValidation, selectorForm) {
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
  modalSuccessfulSending.open();

  setTimeout(() => {
    if (modalSuccessfulSending.isOpen()) {
      modalSuccessfulSending.close();
    }
  }, 2500);
}

function tunesValidationQuestionForm() {
  const selectorForm = '.question-form';
  const questionFormValidation = new ValidationForm(selectorForm);

  questionFormValidation.init();

  validatesNameField(questionFormValidation, selectorForm);

  validatesPhoneField(questionFormValidation, selectorForm);

  validatesMessageField(questionFormValidation, selectorForm);

  questionFormValidation.submit(() => {
    if (questionFormValidation.isValid()) {
      questionFormValidation.getForm().reset();

      showsDeliveryStatusNotification();
    }
  });
}

function tunesValidationFeedbackForm() {
  const selectorForm = '.feedback-form';
  const feedbackFormValidation = new ValidationForm(selectorForm);

  feedbackFormValidation.init();

  validatesNameField(feedbackFormValidation, selectorForm);

  validatesPhoneField(feedbackFormValidation, selectorForm);

  validatesMessageField(feedbackFormValidation, selectorForm);

  validatesEmailField(feedbackFormValidation, selectorForm);

  feedbackFormValidation.submit(() => {
    if (feedbackFormValidation.isValid()) {
      feedbackFormValidation.getForm().reset();

      showsDeliveryStatusNotification();
    }
  });
}

function tunesValidationNewsletterSubscriptionForm() {
  const selectorForm = '.newsletter-subscription-form';
  const subscribeFormValidation = new ValidationForm(selectorForm);

  subscribeFormValidation.init();

  validatesEmailField(subscribeFormValidation, selectorForm);

  subscribeFormValidation.submit(() => {
    if (subscribeFormValidation.isValid()) {
      subscribeFormValidation.getForm().reset();

      showsDeliveryStatusNotification();
    }
  });
}

export {
  tunesValidationQuestionForm,
  tunesValidationFeedbackForm,
  tunesValidationNewsletterSubscriptionForm,
};
