/**
 * @jest-environment jsdom
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import { jest } from '@jest/globals';
import FocusLockSliders from '../FocusLockSliders';

describe('Тестирование блокировки фокуса для слайдеров', () => {
  beforeEach(() => {
    document.body.innerHTML = '';

    const elements = `
      <div class="slider">
        <div class="slide slide_active">
          <div class="slide__content">
            Lorem
          </div>
          <a href="#" class="slide__link">
            Link
          </a>
        </div>
        <div class="slide">
          <div class="slide__content">
            Lorem
          </div>
          <a href="#" class="slide__link">
            Link
          </a>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', elements);
  });

  describe('Тестирование поведения', () => {
    it('При инициализации блокируются фокусируемые элементы', () => {
      const sut = new FocusLockSliders({
        container: document.querySelector('.slider'),
      });
      const focusableElement = document.querySelector('.slide .slide__link');
      const notFocusableElement = document.querySelector('.slide .slide__content');

      sut.init();

      expect(focusableElement.getAttribute('tabindex')).toBe('-1');
      expect(notFocusableElement.getAttribute('tabindex')).toBeNull();
    });

    it('При инициализации не блокируются исключения', () => {
      const sut = new FocusLockSliders({
        container: document.querySelector('.slider'),
        exception: '.slide_active',
      });
      const focusableElement = document.querySelector('.slide_active .slide__link');

      sut.init();

      expect(focusableElement.getAttribute('tabindex')).not.toBe('-1');
    });
  });

  describe('Тестирование открытых методов', () => {
    it('Метод обновляет блокировку фокуса', () => {
      const sut = new FocusLockSliders({
        container: document.querySelector('.slider'),
        exception: '.slide_active',
      });
      const activeSlide = document.querySelector('.slide_active');
      const activeSlideLink = activeSlide.querySelector('.slide__link');
      const notActiveSlide = document.querySelector('.slide:not(.slide_active)');
      const notActiveSlideLink = notActiveSlide.querySelector('.slide__link');
      sut.init();

      /**
       * Действие
       */
      activeSlide.classList.remove('slide_active');
      notActiveSlide.classList.add('slide_active');
      sut.updatesFocusLock();
      /**
       * Проверка
       */
      expect(activeSlideLink.tabIndex).toBe(-1);
      expect(notActiveSlideLink.tabIndex).toBe(0);

      /**
       * Действие
       */
      activeSlide.classList.add('slide_active');
      notActiveSlide.classList.remove('slide_active');
      sut.updatesFocusLock();
      /**
       * Проверка
       */
      expect(activeSlideLink.tabIndex).toBe(0);
      expect(notActiveSlideLink.tabIndex).toBe(-1);
    });

    it('Метод не обновляет значение tabindex, если оно не было изменено', () => {
      const sut = new FocusLockSliders({
        container: document.querySelector('.slider'),
        exception: '.slide_active',
      });
      sut.init();
      const spyUnblocksFocusElement = jest.spyOn(sut, '_unblocksFocusElement');
      const spyBlocksFocusElement = jest.spyOn(sut, '_blocksFocusElement');

      sut.updatesFocusLock();

      expect(spyUnblocksFocusElement).not.toHaveBeenCalled();
      expect(spyBlocksFocusElement).not.toHaveBeenCalled();
    });
  });
});
