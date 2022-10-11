/**
 * @jest-environment jsdom
 */

import FormValidation from '../FormValidation';

describe('Тестирование валидации формы', () => {
  beforeEach(() => {
    document.body.innerHTML = '';

    const form = `
      <form class="form" novalidate>
        <div class="form__item">
          <label for="name">Введите ваше имя</label>
          <input
            type="text"
            id="name"
            name="name"
            aria-describedby="name-error-message"
            aria-required="true"
          />
          <p id="name-error-message"></p>
        </div>
        <div class="form__item">
          <label for="surname">Введите вашу фамилию</label>
          <input
            type="text"
            id="surname"
            name="surname"
            aria-describedby="surname-error-message"
            aria-required="true"
          />
          <p id="surname-error-message"></p>
        </div>
        <div class="form__item">
          <label for="phone">Введите ваш номер телефона</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            aria-describedby="phone-error-message"
            aria-required="true"
          />
          <p id="phone-error-message"></p>
        </div>
      </form>
    `;

    document.body.insertAdjacentHTML('beforeend', form);
  });

  describe('Тестирование поведения', () => {
    it('Если все элементы, которые были переданы, валидны - форма валидна', () => {
      const sut = new FormValidation('.form');
      const nameInput = sut.getForm().querySelector('#name');
      const surnameInput = sut.getForm().querySelector('#surname');
      sut.addElementForValidation('#name', {
        required: {
          errorMessage: 'Необходимо ввести ваше имя!',
        },
        text: {
          errorMessage: 'Неверный формат!',
        },
      });
      sut.addElementForValidation('#surname', {
        required: {
          errorMessage: 'Необходимо ввести вашу почту!',
        },
        text: {
          errorMessage: 'Неверный формат!',
        },
      });
      nameInput.value = 'Loh';
      surnameInput.value = 'Loh';

      sut.validates();

      expect(sut.isValid()).toBeTruthy();
    });

    it('Если хотя-бы один элемент, который был передан, невалиден - форма невалидна', () => {
      const sut = new FormValidation('.form');
      const nameInput = sut.getForm().querySelector('#name');
      const surnameInput = sut.getForm().querySelector('#surname');
      sut.addElementForValidation('#name', {
        required: {
          errorMessage: 'Необходимо ввести ваше имя!',
        },
        text: {
          errorMessage: 'Неверный формат!',
        },
      });
      sut.addElementForValidation('#surname', {
        required: {
          errorMessage: 'Необходимо ввести вашу почту!',
        },
        text: {
          errorMessage: 'Неверный формат!',
        },
      });
      nameInput.value = 'Loh';
      surnameInput.value = '123';

      sut.validates();

      expect(sut.isValid()).toBeFalsy();
    });

    it('Добавление класса невалидности элементу, если он невалиден', () => {
      const sut = new FormValidation('.form');
      const nameInput = sut.getForm().querySelector('#name');
      const classLengthNameInput = nameInput.classList.length;
      sut.addElementForValidation('#name', {
        required: {
          errorMessage: 'Необходимо ввести ваше имя!',
        },
      });
      nameInput.value = '';

      sut.validates();

      expect(nameInput.classList.length).not.toBe(classLengthNameInput);
    });

    it('Удаление класса невалидности у элемента, если он валиден', () => {
      const sut = new FormValidation('.form');
      const nameInput = sut.getForm().querySelector('#name');
      sut.addElementForValidation('#name', {
        required: {
          errorMessage: 'Необходимо ввести ваше имя!',
        },
      });
      nameInput.value = '';
      sut.validates();
      const classLengthNameInput = nameInput.classList.length;

      nameInput.value = 'Loh';
      sut.validates();

      expect(nameInput.classList.length).not.toBe(classLengthNameInput);
    });

    it('Если элемент невалиден, показывается текст с ошибкой', () => {
      const sut = new FormValidation('.form');
      const nameInput = sut.getForm().querySelector('#name');
      const errorMessage = 'Необходимо ввести ваше имя!';
      const fieldForErrorMessage = nameInput.nextElementSibling;
      sut.addElementForValidation('#name', {
        required: {
          errorMessage: 'Необходимо ввести ваше имя!',
        },
        minLength: {
          errorMessage: 'Минимальное количество символов - 2!',
          value: 2,
        },
      });
      nameInput.value = '';

      sut.validates();

      expect(fieldForErrorMessage.textContent).toBe(errorMessage);
    });

    it('Если элемент валиден, текст с ошибкой убирается', () => {
      const sut = new FormValidation('.form');
      const nameInput = sut.getForm().querySelector('#name');
      const fieldForErrorMessage = nameInput.nextElementSibling;
      sut.addElementForValidation('#name', {
        required: {
          errorMessage: 'Необходимо ввести ваше имя!',
        },
        minLength: {
          errorMessage: 'Минимальное количество символов - 2!',
          value: 2,
        },
      });
      nameInput.value = '';
      sut.validates();

      nameInput.value = 'Loh';
      sut.validates();

      expect(fieldForErrorMessage.textContent).toBe('');
    });

    // Required

    it('Если поле пустое - поле невалидно', () => {
      const sut = new FormValidation('.form');
      const nameInput = sut.getForm().querySelector('#name');
      sut.addElementForValidation('#name', {
        required: {
          errorMessage: 'Необходимо ввести ваше имя!',
        },
      });
      nameInput.value = ' ';

      sut.validates();

      expect(sut.isValid()).toBeFalsy();
    });

    it('Если поле содержит какой-либо символ - поле валидно', () => {
      const sut = new FormValidation('.form');
      const nameInput = sut.getForm().querySelector('#name');
      sut.addElementForValidation('#name', {
        required: {
          errorMessage: 'Необходимо ввести ваше имя!',
        },
      });
      nameInput.value = 'Loh';

      sut.validates();

      expect(sut.isValid()).toBeTruthy();
    });

    // maxLength

    it('Если количество символов больше указанного числа - поле невалидно', () => {
      const sut = new FormValidation('.form');
      const nameInput = sut.getForm().querySelector('#name');
      sut.addElementForValidation('#name', {
        maxLength: {
          errorMessage: 'Максимальное количество символов - 3',
          value: 3,
        },
      });
      nameInput.value = ' loh123 ';

      sut.validates();

      expect(sut.isValid()).toBeFalsy();
    });

    it('Если количество символов меньше или равно указанному числу - поле валидно', () => {
      const sut = new FormValidation('.form');
      const nameInput = sut.getForm().querySelector('#name');
      const surnameInput = sut.getForm().querySelector('#surname');
      sut.addElementForValidation('#name', {
        maxLength: {
          errorMessage: 'Максимальное количество символов - 3',
          value: 3,
        },
      });
      sut.addElementForValidation('#surname', {
        maxLength: {
          errorMessage: 'Максимальное количество символов - 3',
          value: 3,
        },
      });
      nameInput.value = ' loh ';
      surnameInput.value = ' lo ';

      sut.validates();

      expect(sut.isValid()).toBeTruthy();
    });

    // minLength

    it('Если количество символов меньше указанного числа - поле невалидно', () => {
      const sut = new FormValidation('.form');
      const nameInput = sut.getForm().querySelector('#name');
      sut.addElementForValidation('#name', {
        minLength: {
          errorMessage: 'Минимальное количество символов - 3',
          value: 3,
        },
      });
      nameInput.value = ' 12 ';

      sut.validates();

      expect(sut.isValid()).toBeFalsy();
    });

    it('Если количество символов больше или равно указанному числу - поле валидно', () => {
      const sut = new FormValidation('.form');
      const nameInput = sut.getForm().querySelector('#name');
      const surnameInput = sut.getForm().querySelector('#surname');
      sut.addElementForValidation('#name', {
        minLength: {
          errorMessage: 'Минимальное количество символов - 3',
          value: 3,
        },
      });
      sut.addElementForValidation('#surname', {
        minLength: {
          errorMessage: 'Минимальное количество символов - 3',
          value: 3,
        },
      });
      nameInput.value = ' loh123 ';
      surnameInput.value = ' loh ';

      sut.validates();

      expect(sut.isValid()).toBeTruthy();
    });

    // Text

    it('Если поле содержит только кириллицу или латиницу - поле валидно', () => {
      const sut = new FormValidation('.form');
      const nameInput = sut.getForm().querySelector('#name');
      sut.addElementForValidation('#name', {
        text: {
          errorMessage: 'Только текст!',
        },
      });
      const tests = [
        'Loh',
        'Лох',
        'LohЛох',
      ];

      const resultsTests = tests.map((test) => {
        nameInput.value = test;

        sut.validates();

        return sut.isValid();
      });

      expect(resultsTests.every((result) => result)).toBeTruthy();
    });

    // Phone

    it('Если поле содержит корректный номер телефона - поле валидно', () => {
      const sut = new FormValidation('.form');
      const phoneInput = sut.getForm().querySelector('#phone');
      sut.addElementForValidation('#phone', {
        phone: {
          errorMessage: 'Только текст!',
        },
      });
      const tests = [
        '+79261234567',
        '89261234567',
        '79261234567',
        '+7 926 123 45 67',
        '8(926)123-45-67',
        '123-45-67',
        '9261234567',
        '79261234567',
        '(495)1234567',
        '(495) 123 45 67',
        '89261234567',
        '8-926-123-45-67',
        '8 927 1234 234',
        '8 927 12 12 888',
        '8 927 12 555 12',
        '8 927 123 8 123',
      ];

      const resultsTests = tests.map((test) => {
        phoneInput.value = test;

        sut.validates();

        return sut.isValid();
      });

      expect(resultsTests.every((result) => result)).toBeTruthy();
    });
  });

  describe('Тестирование открытых методов', () => {
    it('Возвращает элемент формы', () => {
      const sut = new FormValidation('.form');
      const form = document.querySelector('.form');

      expect(sut.getForm()).toBe(form);
    });

    it('Добавляет кастомное правило для валидации', () => {
      const sut = new FormValidation('.form');
      const nameInput = sut.getForm().querySelector('#name');
      nameInput.value = ' Loh ';

      sut.addCustomValidationRule('onlyLoh', ({ element, errorMessage }) => {
        const inputValue = element.value.trim();

        return inputValue === 'Loh'
          ? {
            isValid: true,
          }
          : {
            isValid: false,
            errorMessage,
          };
      });
      sut.addElementForValidation('#name', {
        onlyLoh: {
          errorMessage: 'Only loh',
        },
      });
      sut.validates();

      expect(sut.isValid()).toBeTruthy();
    });

    it('Добавляет кастомное правило валидации, если такое правило существует - ошибка', () => {
      const sut = new FormValidation('.form');
      sut.addCustomValidationRule('onlyLoh', () => { });

      expect(() => {
        sut.addCustomValidationRule('onlyLoh', () => { });
      }).toThrow();
    });
  });
});
