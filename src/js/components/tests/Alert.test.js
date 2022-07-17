/**
 * @jest-environment jsdom
 */

import Alert from '../Alert';

describe('Тестирование Alert', () => {
  beforeEach(() => {
    document.body.innerHTML = '';

    const alert = `
      <aricle class="alert">
        <div class="alert__body">
          <div class="alert__content">
            Lorem ipsum
          </div>
        </div>
      </aricle>
    `;

    document.body.insertAdjacentHTML('beforeend', alert);
  });

  describe('Тестирование открытого интерфейса', () => {
    it('Проверка метода открытия', () => {
      const sut = new Alert({
        container: '.alert',
      });
      sut.init();

      sut.open();

      expect(sut.isOpen()).toBeTruthy();
    });

    it('Проверка метода закрытия', () => {
      const sut = new Alert({
        container: '.alert',
      });
      sut.init();
      sut.open();

      sut.close();

      expect(sut.isOpen()).toBeFalsy();
    });

    it('Проверка метода открытия / закрытия', () => {
      const sut = new Alert({
        container: '.alert',
      });
      sut.init();

      sut.toggle();

      expect(sut.isOpen()).toBeTruthy();

      sut.toggle();

      expect(sut.isOpen()).toBeFalsy();
    });
  });
});
