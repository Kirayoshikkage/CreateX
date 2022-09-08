/**
 * @jest-environment jsdom
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import { jest } from '@jest/globals';
import BurgerMenu from '../BurgerMenu';

jest.useFakeTimers();

function setsInnerWidth(width) {
  Object.defineProperties(window, {
    innerWidth: {
      get() {
        return width;
      },
    },
  });
}

describe('Тестирование бургер меню', () => {
  beforeEach(() => {
    document.body.innerHTML = '';

    const burgerMenu = `
      <div class="burger-menu">
        <div class="burger-menu__body">
          <div class="burger-menu__content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo labore dolores sit sed eius, architecto placeat repudiandae voluptates quam nam eligendi amet ipsam, quisquam provident fugit, sunt maiores ullam expedita.
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', burgerMenu);
  });

  describe('Тестирование конструктора', () => {
    it('Если брейкпоинты не переданы, ошибки нет', () => {
      const sut = new BurgerMenu({
        container: '.burger-menu',
        body: '.burger-menu__body',
      });

      expect(() => sut.init()).not.toThrow();
    });
  });

  describe('Тестирование брейкпоинтов', () => {
    it('При инициализации устанавливается текущий брейкпоинт', () => {
      setsInnerWidth(1920);
      const sut = new BurgerMenu({
        container: '.burger-menu',
        body: '.burger-menu__body',
        breakpoints: {
          768: () => {
            sut.open();
          },
        },
      });
      sut.init();

      expect(sut.isOpen()).toBeTruthy();
    });

    it('При увеличении ширины, брейкпоинт обновляется', () => {
      setsInnerWidth(320);
      const resize = new Event('resize');
      const sut = new BurgerMenu({
        container: '.burger-menu',
        body: '.burger-menu__body',
        breakpoints: {
          320: () => {
            sut.open();
          },
          768: () => {
            sut.close();
          },
        },
      });
      sut.init();

      setsInnerWidth(768);
      window.dispatchEvent(resize);
      jest.runAllTimers();

      expect(sut.isOpen()).toBeFalsy();
    });

    it('При уменьшении ширины, брейкпоинт обновляется', () => {
      setsInnerWidth(1024);
      const resize = new Event('resize');
      const sut = new BurgerMenu({
        container: '.burger-menu',
        body: '.burger-menu__body',
        breakpoints: {
          320: () => {
            sut.open();
          },
          768: () => {
            sut.close();
          },
        },
      });
      sut.init();

      setsInnerWidth(320);
      window.dispatchEvent(resize);
      jest.runAllTimers();

      expect(sut.isOpen()).toBeTruthy();
    });
  });
});
