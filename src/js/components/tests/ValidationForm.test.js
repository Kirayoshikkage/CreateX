/**
 * @jest-environment jsdom
 */

import ValidationForm from '../ValidationForm';

describe('Тестирование валидации формы', () => {
  beforeEach(() => {
    document.body.innerHTML = '';

    const form = `
      <form action="#" class="form">
        <label>
          <input type="text" class="text" name="name" />
          <span class="validate-error-message"></span>
        </label>
        <label>
          <input type="tel" class="phone" name="phone" />
          <span class="validate-error-message"></span>
        </label>
        <label>
          <input type="text" class="email" name="email" />
          <span class="validate-error-message"></span>
        </label>
        <label>
          <input type="text" class="ru" name="ru" />
          <span class="validate-error-message"></span>
        </label>
        <button class="submit" type="submit">
          Отправить
        </button>
        <label>
          <input name="agreement" type="checkbox" class="checkbox" />
          <span class="validate-error-message"></span>
        </label>
      </form>
    `;

    document.body.insertAdjacentHTML('beforeend', form);
  });

  it('Переданы корректные значения', () => {
    const sut = new ValidationForm('.form');

    expect(() => sut.init()).not.toThrow();
  });

  it('Переданы некорректные значения', () => {
    const sut = new ValidationForm({}, 123, 59);

    expect(() => sut.init()).toThrow();
  });

  it('Ввод корректных значений в текстовое поле', () => {
    const text = document.querySelector('.text');
    const sut = new ValidationForm('.form');
    const testList = ['MaxGraph cool dev', 'Ya loh', 'Бу', 'Дааа'];
    sut.init();
    sut.addRuleValidationElements('.text', [
      {
        rule: 'text',
        errorMessage: 'Поле может содержать только буквы!',
      },
    ]);

    for (const test of testList) {
      text.value = test;

      expect(sut.isValid()).toBe(true);
    }
  });

  it('Ввод некорректных значений в текстовое поле', () => {
    const text = document.querySelector('.text');
    const sut = new ValidationForm('.form');
    const testList = ['ba123', 'ba!@#$%', 'by()', 'by_&#$', 'ру_329'];
    sut.init();
    sut.addRuleValidationElements('.text', [
      {
        rule: 'text',
        errorMessage: 'Поле может содержать только буквы!',
      },
    ]);

    for (const test of testList) {
      text.value = test;

      expect(sut.isValid()).toBe(false);
    }
  });

  it('Ввод корректных значений в поле для телефона', () => {
    const phone = document.querySelector('.phone');
    const sut = new ValidationForm('.form');
    const testList = [
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
    sut.init();
    sut.addRuleValidationElements('.phone', [
      {
        rule: 'phone',
        errorMessage: 'Введите корректный номер телефона!',
      },
    ]);

    for (const test of testList) {
      phone.value = test;

      expect(sut.isValid()).toBe(true);
    }
  });

  it('Ввод некорректных значений в поле для телефона', () => {
    const phone = document.querySelector('.phone');
    const sut = new ValidationForm('.form');
    const testList = [
      '+79f261234567',
      '89ав2612fddf34567',
      '7926#!@@#1234567',
      '7926#!@@#123_!@4567',
    ];
    sut.init();
    sut.addRuleValidationElements('.phone', [
      {
        rule: 'phone',
        errorMessage: 'Введите корректный номер телефона!',
      },
    ]);

    for (const test of testList) {
      phone.value = test;

      expect(sut.isValid()).toBe(false);
    }
  });

  it('Ввод корректных значений в поле для почты', () => {
    const email = document.querySelector('.email');
    const sut = new ValidationForm('.form');
    const testList = [
      'andrew4uni@yandex.ru',
      'andrey@lionnet.pp.ua',
      'ohnsmith@lionnet.pp.ua',
      'sergey777@mail.ry',
      'validtest7@gmail.co',
      'test@example.org ',
      'btiusembassy@bti-sitaindia.com',
      'norwegenkoch@hugin-versand.de',
      'zeydodetro@enayu.com',
    ];
    sut.init();
    sut.addRuleValidationElements('.email', [
      {
        rule: 'email',
        errorMessage: 'Введите корректный e-mail!',
      },
    ]);

    for (const test of testList) {
      email.value = test;

      expect(sut.isValid()).toBe(true);
    }
  });

  it('Ввод некорректных значений в поле для почты', () => {
    const email = document.querySelector('.email');
    const sut = new ValidationForm('.form');
    const testList = [
      '@mail.ru',
      'te#!@()(@)(ВВВВst@mail.ru',
      'пппппппВВВВ@mail.ru',
      'te#st@mail.ru',
      "te#s))_)_)В''t@mail.ru",
      'te#аааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааst@mail.ru',
    ];
    sut.init();
    sut.addRuleValidationElements('.email', [
      {
        rule: 'email',
        errorMessage: 'Введите корректный e-mail!',
      },
    ]);

    for (const test of testList) {
      email.value = test;

      expect(sut.isValid()).toBe(false);
    }
  });

  it('Нажатие на чекбокс', () => {
    const checkbox = document.querySelector('.checkbox');
    const sut = new ValidationForm('.form');
    sut.init();
    sut.addRuleValidationElements('.checkbox', [
      {
        rule: 'checkbox',
        errorMessage: 'Необходимо отметить чекбокс!',
      },
    ]);

    checkbox.checked = true;

    expect(sut.isValid()).toBe(true);
  });

  it('Ввод максимально допустимого значения', () => {
    const text = document.querySelector('.text');
    const sut = new ValidationForm('.form');
    sut.init();
    sut.addRuleValidationElements('.text', [
      {
        rule: 'text',
        errorMessage: 'Поле может содержать только буквы!',
      },
      {
        rule: 'maxLength',
        value: 6,
        errorMessage: 'Максимальное значениe - 6 символов!',
      },
    ]);

    text.value = 'Ya loh';

    expect(sut.isValid()).toBe(true);
  });

  it('Ввод значения превышающего максимальное значение', () => {
    const text = document.querySelector('.text');
    const sut = new ValidationForm('.form');
    sut.init();
    sut.addRuleValidationElements('.text', [
      {
        rule: 'text',
        errorMessage: 'Поле может содержать только буквы!',
      },
      {
        rule: 'maxLength',
        value: 3,
        errorMessage: 'Максимальное значениe - 3 символа!',
      },
    ]);

    text.value = 'Ya loh';

    expect(sut.isValid()).toBe(false);
  });

  it('Ввод значения не достигшего порога минимума', () => {
    const text = document.querySelector('.text');
    const sut = new ValidationForm('.form');
    sut.init();
    sut.addRuleValidationElements('.text', [
      {
        rule: 'text',
        errorMessage: 'Поле может содержать только буквы!',
      },
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Минимальное значениe - 3 символа!',
      },
    ]);

    text.value = 'Ya';

    expect(sut.isValid()).toBe(false);
  });

  it('Ввод минимально допустимого значения', () => {
    const text = document.querySelector('.text');
    const sut = new ValidationForm('.form');
    sut.init();
    sut.addRuleValidationElements('.text', [
      {
        rule: 'text',
        errorMessage: 'Поле может содержать только буквы!',
      },
      {
        rule: 'minLength',
        value: 6,
        errorMessage: 'Минимальное значениe - 6 символов!',
      },
    ]);

    text.value = 'Ya loh';

    expect(sut.isValid()).toBe(true);
  });

  it('Ввод промежуточного значения между максимальным и минимальным', () => {
    const text = document.querySelector('.text');
    const sut = new ValidationForm('.form');
    sut.init();
    sut.addRuleValidationElements('.text', [
      {
        rule: 'text',
        errorMessage: 'Поле может содержать только буквы!',
      },
      {
        rule: 'maxLength',
        value: 12,
        errorMessage: 'Максимальное значениe - 12 символов!',
      },
      {
        rule: 'minLength',
        value: 6,
        errorMessage: 'Минимальное значениe - 6 символов!',
      },
    ]);

    text.value = 'Ya loh boo';

    expect(sut.isValid()).toBe(true);
  });

  it('Ввод обязательного значения', () => {
    const text = document.querySelector('.text');
    const sut = new ValidationForm('.form');
    sut.init();
    sut.addRuleValidationElements('.text', [
      {
        rule: 'text',
        errorMessage: 'Поле может содержать только буквы!',
      },
      {
        rule: 'requered',
        errorMessage: 'Необходимо заполнить это поле!',
      },
    ]);

    text.value = 'Ya loh';

    expect(sut.isValid()).toBe(true);
  });

  it('Игнорирование обязательного значения', () => {
    const text = document.querySelector('.text');
    const sut = new ValidationForm('.form');
    sut.init();
    sut.addRuleValidationElements('.text', [
      {
        rule: 'text',
        errorMessage: 'Поле может содержать только буквы!',
      },
      {
        rule: 'requered',
        errorMessage: 'Необходимо заполнить это поле!',
      },
    ]);

    expect(sut.isValid()).toBe(false);
  });

  it('Отправка формы если она валидна', () => {
    const text = document.querySelector('.text');
    const sut = new ValidationForm('.form');
    const eventSubmit = new Event('submit');
    let flag = false;
    sut.init();
    sut.addRuleValidationElements('.text', [
      {
        rule: 'text',
        errorMessage: 'Поле может содержать только буквы!',
      },
      {
        rule: 'maxLength',
        value: 12,
        errorMessage: 'Максимальное значениe - 12 символов!',
      },
      {
        rule: 'minLength',
        value: 6,
        errorMessage: 'Минимальное значениe - 6 символов!',
      },
    ]);
    text.value = 'Ya loh boo';

    sut.submit(() => {
      if (sut.isValid()) {
        flag = true;
      }
    });
    sut.getForm().dispatchEvent(eventSubmit);

    expect(flag).toBe(true);
  });

  it('Переданы некорректные значения в добавлении валидируемого поля', () => {
    const sut = new ValidationForm({}, 123, 59);

    expect(() => sut.addRuleValidationElements(62176, 'loh123')).toThrow();
  });

  it('Добавление кастомного валидатора', () => {
    const sut = new ValidationForm('.form');
    sut.init();

    sut.addCustomRuleValidateInList('ru', ({ element, errorMessage }) => {
      const inputValue = element.value.trim();
      const regexp = /[^А-Яа-я\s]/;

      if (regexp.test(inputValue) && inputValue !== '') {
        return {
          validate: false,
          errorMessage,
        };
      }

      return {
        validate: true,
      };
    });

    expect(() => {
      sut.addRuleValidationElements('.ru', [
        {
          rule: 'ru',
          errorMessage: 'Доступны только русские буквы',
        },
      ]);
    }).not.toThrow();
  });

  it('Добавление кастомного валидатора, ввод корректных значений', () => {
    const ru = document.querySelector('.ru');
    const sut = new ValidationForm('.form');
    const testList = ['Да', 'Нет', 'йцукенгшщзхъфывапролджэячсмитьбю'];
    sut.init();
    sut.addCustomRuleValidateInList('ru', ({ element, errorMessage }) => {
      const inputValue = element.value.trim();
      const regexp = /[^А-Яа-я\s]/;

      if (regexp.test(inputValue) && inputValue !== '') {
        return {
          validate: false,
          errorMessage,
        };
      }

      return {
        validate: true,
      };
    });
    sut.addRuleValidationElements('.ru', [
      {
        rule: 'ru',
        errorMessage: 'Доступны только русские буквы',
      },
    ]);

    for (const test of testList) {
      ru.value = test;

      expect(sut.isValid()).toBe(true);
    }
  });

  it('Добавление кастомного валидатора, ввод некорректных значений', () => {
    const ru = document.querySelector('.ru');
    const sut = new ValidationForm('.form');
    const testList = ['Da', '123', 'Ned', 'Да1', 'nВ', 'q#@wertyuioR$#pasdghjkvn'];
    sut.init();
    sut.addCustomRuleValidateInList('ru', ({ element, errorMessage }) => {
      const inputValue = element.value.trim();
      const regexp = /[^А-Яа-я\s]/;

      if (regexp.test(inputValue) && inputValue !== '') {
        return {
          validate: false,
          errorMessage,
        };
      }

      return {
        validate: true,
      };
    });
    sut.addRuleValidationElements('.ru', [
      {
        rule: 'ru',
        errorMessage: 'Доступны только русские буквы',
      },
    ]);

    for (const test of testList) {
      ru.value = test;

      expect(sut.isValid()).toBe(false);
    }
  });
});
