export default class FormValidation {
  constructor(form, {
    showAnimationError,
    hidingAnimationError,
  } = {}) {
    this._form = document.querySelector(form);

    this._showAnimationError = showAnimationError;
    this._hidingAnimationError = hidingAnimationError;
  }

  _listElementsToValidate = new Map();

  _listValidationRules = {
    required: this._required,
    maxLength: this._maxLength,
    minLength: this._minLength,
    text: this._text,
    phone: this._phone,
    email: this._email,
  };

  _isValid;

  isValid() {
    return this._isValid;
  }

  submit(cb) {
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();

      cb(e);
    });
  }

  getForm() {
    return this._form;
  }

  addCustomValidationRule(ruleName, rule) {
    if (this._listValidationRules[ruleName]) throw new Error('This rule already exists');

    this._listValidationRules[ruleName] = rule;
  }

  addElementForValidation(selector, settings) {
    this._form.querySelectorAll(selector).forEach((element) => {
      const rules = this._definesRulesForElementValidation(element, settings);

      this._listElementsToValidate.set(element, rules);
    });
  }

  _definesRulesForElementValidation(element, settings) {
    return Object.keys(settings).reduce((rules, rule) => {
      rules.push(
        this._configuresValidationRuleForElement(element, rule, settings[rule]),
      );

      return rules;
    }, []);
  }

  _configuresValidationRuleForElement(element, rule, settings) {
    if (!this._listValidationRules[rule]) throw new Error(`Rule ${rule} does not exist`);

    return this._listValidationRules[rule]
      .bind(null, { element, ...settings });
  }

  validates() {
    const validationResults = Array.from(this._listElementsToValidate.keys())
      .map((element) => {
        const { isValid, errorMessage } = this._checksValidityAnElement(element);

        if (isValid) {
          this._removesInvalidClass(element);

          this._removesErrorText(element);
        }

        if (!isValid) {
          this._addsInvalidClass(element);

          this._insertsErrorText(element, errorMessage);
        }

        return isValid;
      });

    this._isValid = validationResults.every((validationResult) => validationResult);
  }

  _checksValidityAnElement(element) {
    const validationRules = this._listElementsToValidate.get(element);
    let errorMessage = null;
    const isValid = validationRules.every((rule) => {
      const validationResult = rule();

      errorMessage = validationResult.errorMessage;

      return validationResult.isValid;
    });

    return {
      errorMessage,
      isValid,
    };
  }

  _addsInvalidClass(element) {
    element.classList.add('invalid');
  }

  _removesErrorText(element) {
    const fieldForErrorMessage = element.nextElementSibling;

    if (!this._hidingAnimationError) {
      fieldForErrorMessage.textContent = '';

      return;
    }

    this._hidingAnimationError(fieldForErrorMessage, () => {
      fieldForErrorMessage.textContent = '';
    });
  }

  _removesInvalidClass(element) {
    element.classList.remove('invalid');
  }

  _insertsErrorText(element, text) {
    const fieldForErrorMessage = element.nextElementSibling;

    if (!this._showAnimationError) {
      fieldForErrorMessage.textContent = text;

      return;
    }

    this._showAnimationError(fieldForErrorMessage, () => {
      fieldForErrorMessage.textContent = text;
    });
  }

  // Rules for validation

  _required({ element, errorMessage }) {
    const { checked } = element;
    const inputValue = element.value.trim();

    return inputValue || checked
      ? {
        isValid: true,
      }
      : {
        isValid: false,
        errorMessage,
      };
  }

  _maxLength({ element, errorMessage, value }) {
    const inputValue = element.value.trim();

    return inputValue.length <= value
      ? {
        isValid: true,
      }
      : {
        isValid: false,
        errorMessage,
      };
  }

  _minLength({ element, errorMessage, value }) {
    const inputValue = element.value.trim();

    return inputValue.length >= value
      ? {
        isValid: true,
      }
      : {
        isValid: false,
        errorMessage,
      };
  }

  _text({ element, errorMessage }) {
    const inputValue = element.value.trim();
    const regexp = /[^a-zA-ZА-Яа-я\s]/;

    return !regexp.test(inputValue)
      ? {
        isValid: true,
      }
      : {
        isValid: false,
        errorMessage,
      };
  }

  _phone({ element, errorMessage }) {
    const inputValue = element.value.trim();
    const regexp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

    return regexp.test(inputValue)
      ? {
        isValid: true,
      }
      : {
        isValid: false,
        errorMessage,
      };
  }

  _email({ element, errorMessage }) {
    const inputValue = element.value.trim();
    const regexp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    return regexp.test(inputValue)
      ? {
        isValid: true,
      }
      : {
        isValid: false,
        errorMessage,
      };
  }
}
