import FormValidation from '../components/FormValidation.js';
import Modal from '../components/Modal.js';
import FocusLock from '../components/FocusLock.js';

const animationsForErrors = {
  showAnimationError(fieldForErrorMessage, cbInsertsError) {
    cbInsertsError();

    // eslint-disable-next-line no-param-reassign
    fieldForErrorMessage.style.opacity = 1;
  },
  hidingAnimationError(fieldForErrorMessage, cbRemovesError) {
    // eslint-disable-next-line no-param-reassign
    fieldForErrorMessage.style.opacity = 0;

    setTimeout(() => {
      cbRemovesError();
    }, 400);
  },
};
const focusLock = new FocusLock({
  exception: ['.form-status'],
  mutationObserver: true,
  disableOnMobileDevice: true,
});
const formStatusModal = new Modal({
  container: '.form-status',
  body: '.modal__body',
  focusLock,
});
focusLock.init();
formStatusModal.init();

function emailValidation(formValidation, selector) {
  formValidation.addElementForValidation(selector, {
    required: {
      errorMessage: 'This field is required!',
    },
    email: {
      errorMessage: 'Wrong format! Example: example@bk.ru',
    },
  });
}

function nameValidation(formValidation, selector) {
  formValidation.addElementForValidation(selector, {
    required: {
      errorMessage: 'This field is required!',
    },
    text: {
      errorMessage: 'Wrong format! Example: Matthew',
    },
  });
}

function phoneValidation(formValidation, selector) {
  formValidation.addElementForValidation(selector, {
    required: {
      errorMessage: 'This field is required!',
    },
    phone: {
      errorMessage: 'Wrong format! Example: +7 923 678 56 70',
    },
  });
}

function messageValidation(formValidation, selector) {
  formValidation.addElementForValidation(selector, {
    required: {
      errorMessage: 'This field is required!',
    },
    text: {
      errorMessage: 'Invalid format, only letters allowed!',
    },
  });
}

function definesStatusOfForm(isValid) {
  const modal = document.querySelector('.form-status');

  modal.dataset.status = isValid ? 'success' : 'error';
}

function submit(formValidation) {
  formValidation.submit(() => {
    formValidation.validates();

    const isValid = formValidation.isValid();
    definesStatusOfForm(isValid);

    if (isValid) {
      formValidation.getForm().reset();
    }

    formStatusModal.open();

    setTimeout(() => {
      if (!formStatusModal.isOpen()) return;

      formStatusModal.close();
    }, 2500);
  });
}

function feedbackFormValidation() {
  const formValidation = new FormValidation('.feedback-form', animationsForErrors);

  nameValidation(formValidation, '#feedback-name');
  phoneValidation(formValidation, '#feedback-phone');
  emailValidation(formValidation, '#feedback-email');
  messageValidation(formValidation, '#feedback-message');

  submit(formValidation);
}

function newsletterSubscriptionFormValidation() {
  const formValidation = new FormValidation('.newsletter-sub', animationsForErrors);

  emailValidation(formValidation, '#newsletter-sub-email');

  submit(formValidation);
}

function questionFormValidation() {
  const formValidation = new FormValidation('.question-form', animationsForErrors);

  nameValidation(formValidation, '#question-name');
  phoneValidation(formValidation, '#question-phone');
  messageValidation(formValidation, '#question-message');

  submit(formValidation);
}

function commentFormValidation() {
  const formValidation = new FormValidation('.comment-form', animationsForErrors);

  nameValidation(formValidation, '#comment-name');
  emailValidation(formValidation, '#comment-email');
  messageValidation(formValidation, '#comment-message');

  submit(formValidation);
}

function contactsUsFormValidation() {
  const formValidation = new FormValidation('.contacts-us-form', animationsForErrors);

  nameValidation(formValidation, '#contacts-us-name');
  phoneValidation(formValidation, '#contacts-us-phone');
  emailValidation(formValidation, '#contacts-us-email');
  messageValidation(formValidation, '#contacts-us-message');

  submit(formValidation);
}

function subscribeFormValidation() {
  const formValidation = new FormValidation('.subscribe-form', animationsForErrors);

  nameValidation(formValidation, '#subscribe-name');
  emailValidation(formValidation, '#subscribe-email');

  submit(formValidation);
}

function cvFormValidation() {
  const formValidation = new FormValidation('.cv-form', animationsForErrors);

  nameValidation(formValidation, '#cv-name');
  phoneValidation(formValidation, '#cv-phone');
  emailValidation(formValidation, '#cv-email');
  messageValidation(formValidation, '#cv-message');
  formValidation.addElementForValidation('#cv-file', {
    required: {
      errorMessage: 'You must attach your cv!',
    },
  });

  submit(formValidation);
}

export {
  feedbackFormValidation,
  newsletterSubscriptionFormValidation,
  questionFormValidation,
  commentFormValidation,
  subscribeFormValidation,
  contactsUsFormValidation,
  cvFormValidation,
};
