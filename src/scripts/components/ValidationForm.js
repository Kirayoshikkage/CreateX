export default class ValidationForm {
  constructor(form = null) {
    this._form = typeof form === 'string' ? document.querySelector(form) : null;
  }

  _listOfValidationRules = new Map([
    ['minLength', this._minLength],
    ['maxLength', this._maxLength],
    ['text', this._text],
    ['requered', this._requered],
    ['email', this._email],
    ['phone', this._phone],
    ['checkbox', this._checkbox],
  ]);

  _listElementsToCheck = new Map();

  _isValid = false;

  submit(cb) {
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();

      cb(e);
    });
  }

  getForm() {
    return this._form;
  }

  addRuleValidationElements(selector, rules) {
    if (typeof selector !== 'string') { throw new Error('The transmitted data is not correct'); }

    if (!Array.isArray(rules)) { throw new Error('The transmitted data is not correct'); }

    document.querySelectorAll(selector)?.forEach((element) => {
      this._setRuleForElement(element, rules);
    });
  }

  addCustomRuleValidateInList(name, cb) {
    if (typeof name !== 'string') { throw new Error('The transmitted data is not correct'); }

    if (typeof cb !== 'function') { throw new Error('The transmitted data is not correct'); }

    this._listOfValidationRules.set(name, cb);
  }

  _setRuleForElement(element, rules) {
    const listValidationFunctions = [];

    rules.forEach(({ rule, ...arg }) => {
      const func = this._listOfValidationRules.get(rule);

      listValidationFunctions.push(func.bind(this, { ...arg, element }));
    });

    this._listElementsToCheck.set(element, listValidationFunctions);
  }

  init() {
    if (!this._form || this._form.tagName !== 'FORM') { throw new Error('The transmitted data is not correct'); }
  }

  isValid() {
    this._checkValidationAllElementsForm();

    return this._isValid;
  }

  _checkValidationAllElementsForm() {
    let flag = true;

    for (const element of this._listElementsToCheck.keys()) {
      if (!this._validationOneElement(element)) {
        flag = false;
      }
    }

    this._isValid = flag;
  }

  _validationOneElement(element) {
    let errorMessage;
    let flag = true;

    this._listElementsToCheck.get(element).every((func) => {
      const { validate, errorMessage: message } = func();

      if (!validate) {
        flag = !flag;
        errorMessage = message;
      }

      return validate;
    });

    if (!flag) {
      this._showErrorMessage(element, errorMessage);
    } else {
      this._hideErrorMessage(element);
    }

    return flag;
  }

  _showErrorMessage(element, errorMessage) {
    const errorMessageElement = element.nextElementSibling;

    this._searchElementErrorMessage(errorMessageElement, (errorElement) => {
      errorElement.textContent = errorMessage;
      element.classList.add('validate-error');
      errorElement.classList.add('validate-error-message_show');
    });
  }

  _hideErrorMessage(element) {
    const errorMessageElement = element.nextElementSibling;

    this._searchElementErrorMessage(errorMessageElement, (errorElement) => {
      element.classList.remove('validate-error');
      errorElement.classList.remove('validate-error-message_show');
    });
  }

  _searchElementErrorMessage(errorElement, cb) {
    if (errorElement.classList.contains('validate-error-message')) {
      cb(errorElement);

      return;
    }

    this._searchElementErrorMessage(errorElement.nextElementSibling, cb);
  }

  _minLength({ element, value, errorMessage = null }) {
    const inputValue = element.value.trim();

    if (inputValue.length < value && inputValue !== '') {
      return {
        validate: false,
        errorMessage,
      };
    }

    return {
      validate: true,
    };
  }

  _maxLength({ element, value, errorMessage = null }) {
    const inputValue = element.value.trim();

    if (inputValue.length > value) {
      return {
        validate: false,
        errorMessage,
      };
    }

    return {
      validate: true,
    };
  }

  _requered({ element, errorMessage = null }) {
    const inputValue = element.value.trim();

    if (inputValue == '') {
      return {
        validate: false,
        errorMessage,
      };
    }

    return {
      validate: true,
    };
  }

  _text({ element, errorMessage = null }) {
    const inputValue = element.value.trim();
    const regexp = /[^a-zA-ZА-Яа-я\s]/;

    if (regexp.test(inputValue) && inputValue !== '') {
      return {
        validate: false,
        errorMessage,
      };
    }

    return {
      validate: true,
    };
  }

  _email({ element, errorMessage = null }) {
    const inputValue = element.value.trim();
    const regexp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (regexp.test(inputValue) == false && inputValue !== '') {
      return {
        validate: false,
        errorMessage,
      };
    }

    return {
      validate: true,
    };
  }

  _phone({ element, errorMessage = null }) {
    const inputValue = element.value.trim();
    const regexp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

    if (regexp.test(inputValue) == false && inputValue !== '') {
      return {
        validate: false,
        errorMessage,
      };
    }

    return {
      validate: true,
    };
  }

  _checkbox({ element, errorMessage }) {
    const { checked } = element;

    if (!checked) {
      return {
        validate: false,
        errorMessage,
      };
    }

    return {
      validate: true,
    };
  }
}
