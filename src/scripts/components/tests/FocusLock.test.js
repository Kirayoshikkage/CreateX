/**
 * @jest-environment jsdom
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import { jest } from '@jest/globals';
import FocusLock from '../FocusLock';

jest.useFakeTimers();

describe('Тестирование блокировки фокуса', () => {
  beforeEach(() => {
    document.body.innerHTML = '';

    const elements = `
      <a class="single-link" href="#">Link</a>
      <a class="tabindex-link" tabindex="-1" href="#">Link</a>

      <div class="container">
        <a class="container__link" href="#">link</a>
        <div class="container__body"></div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', elements);
  });

  describe('Тестирование поведения', () => {
    it('Блокировка фокуса', () => {
      const sut = new FocusLock();
      const singleLink = document.querySelector('.single-link');
      sut.init();
      jest.runAllTimers();

      sut.blocksFocus();
      const tabIndexSingleLink = singleLink.tabIndex;

      expect(tabIndexSingleLink).toBe(-1);
    });

    it('Разблокировка фокуса', () => {
      const sut = new FocusLock();
      const singleLink = document.querySelector('.single-link');
      sut.init();
      jest.runAllTimers();
      sut.blocksFocus();

      sut.unblocksFocus();
      const tabIndexSingleLink = singleLink.tabIndex;

      expect(tabIndexSingleLink).toBe(0);
    });

    it('Блокировка фокуса в определенном контейнере', () => {
      const sut = new FocusLock({
        container: '.container',
      });
      const containerLink = document.querySelector('.container__link');
      const singleLink = document.querySelector('.single-link');
      sut.init();
      jest.runAllTimers();

      sut.blocksFocus();
      const tabIndexContainerLink = containerLink.tabIndex;
      const tabIndexSingleLink = singleLink.tabIndex;

      expect(tabIndexContainerLink).toBe(-1);
      expect(tabIndexSingleLink).toBe(0);
    });

    it('Блокировка фокуса в определенном контейнере, контейнер передан в неверном формате', () => {
      const sut = new FocusLock({
        container: document.querySelector('.container'),
      });

      expect(() => {
        sut.init();
      }).toThrow();
    });

    it('Блокировка фокуса с исключением, исключение - одиночный элемент', () => {
      const sut = new FocusLock({
        exception: '.single-link',
      });
      const singleLink = document.querySelector('.single-link');
      sut.init();
      jest.runAllTimers();

      sut.blocksFocus();
      const tabIndexSingleLink = singleLink.tabIndex;

      expect(tabIndexSingleLink).toBe(0);
    });

    it('Блокировка фокуса с исключением, исключение - контейнер', () => {
      const sut = new FocusLock({
        exception: '.container',
      });
      const containerLink = document.querySelector('.container__link');
      sut.init();
      jest.runAllTimers();

      sut.blocksFocus();
      const tabIndexContainerLink = containerLink.tabIndex;

      expect(tabIndexContainerLink).toBe(0);
    });

    it('Блокировка фокуса с исключением, исключение - одичный элемент, контейнер', () => {
      const sut = new FocusLock({
        exception: ['.container', '.single-link'],
      });
      const containerLink = document.querySelector('.container__link');
      const singleLink = document.querySelector('.single-link');
      sut.init();
      jest.runAllTimers();

      sut.blocksFocus();
      const tabIndexSingleLink = singleLink.tabIndex;
      const tabIndexContainerLink = containerLink.tabIndex;

      expect(tabIndexSingleLink).toBe(0);
      expect(tabIndexContainerLink).toBe(0);
    });

    it('Блокировка фокуса с исключением, исключение передано в неверном формате', () => {
      const sut = new FocusLock({
        exception: document.querySelector('a'),
      });

      expect(() => sut.init()).toThrow();
    });

    it('Новый элемент на странице добавляется в список блокировок, если соответсвует критериям', async () => {
      const sut = new FocusLock({
        mutationObserver: true,
        container: '.container',
      });
      const containerBody = document.querySelector('.container__body');
      const addedLink = '<a class="added-link" href="">new link</a>';
      const addedDiv = '<div class="added-div">123</div>';
      sut.init();
      jest.runAllTimers();
      sut.blocksFocus();

      containerBody.insertAdjacentHTML('beforeend', addedLink);
      containerBody.insertAdjacentHTML('beforeend', addedDiv);
      // Без этой конструкции обработчик MutationObserver будет выполняться позже, чем expect
      await Promise.resolve();
      const tabIndexAddedLink = document.querySelector('.added-link').tabIndex;
      const tabIndexAddedDiv = document.querySelector('.added-div').tabIndex;

      expect(tabIndexAddedLink).toBe(-1);
      expect(tabIndexAddedDiv).toBe(-1);
      sut.disconnectsMutationObserver();
    });

    it('Элемент, у которого изменился атрибут tabindex на 0 добавляется в список блокировок', async () => {
      const sut = new FocusLock({
        mutationObserver: true,
      });
      const link = document.querySelector('.tabindex-link');
      sut.init();
      jest.runAllTimers();

      link.setAttribute('tabindex', 0);
      // Без этой конструкции обработчик MutationObserver будет выполняться позже, чем expect
      await Promise.resolve();
      sut.blocksFocus();

      expect(link.tabIndex).toBe(-1);
      sut.disconnectsMutationObserver();
    });

    it('Элемент, у которого изменился атрибут tabindex на -1 удаляется из списка блокировок', async () => {
      const sut = new FocusLock({
        mutationObserver: true,
      });
      const link = document.querySelector('.single-link');
      sut.init();
      jest.runAllTimers();

      link.setAttribute('tabindex', -1);
      // Без этой конструкции обработчик MutationObserver будет выполняться позже, чем expect
      await Promise.resolve();
      sut.blocksFocus();
      sut.unblocksFocus();

      expect(link.tabIndex).toBe(-1);
      sut.disconnectsMutationObserver();
    });

    it('Обработчик мутации атрибута tabindex не должен выполняться при блокировке фокуса', async () => {
      const sut = new FocusLock({
        mutationObserver: true,
      });
      const link = document.querySelector('.single-link');
      sut.init();
      jest.runAllTimers();

      sut.blocksFocus();
      // Без этой конструкции обработчик MutationObserver будет выполняться позже, чем expect
      await Promise.resolve();

      expect(link.tabIndex).toBe(-1);
      sut.disconnectsMutationObserver();
    });

    it('Обработчик мутации атрибута tabindex не должен выполняться при разблокировке фокуса', async () => {
      const sut = new FocusLock({
        mutationObserver: true,
      });
      sut.init();
      jest.runAllTimers();
      const spy = jest.spyOn(sut, '_checksOneElement');

      sut.blocksFocus();
      sut.unblocksFocus();
      // Без этой конструкции обработчик MutationObserver будет выполняться позже, чем expect
      await Promise.resolve();

      expect(spy).not.toHaveBeenCalled();
      sut.disconnectsMutationObserver();
    });
  });

  describe('Тестирование открытых методов', () => {
    it('Возвращает true, если фокус заблокирован', async () => {
      const sut = new FocusLock();
      sut.init();
      jest.runAllTimers();

      sut.blocksFocus();

      expect(sut.isBlockFocus()).toBeTruthy();
    });

    it('Возвращает false, если фокус разблокирован', () => {
      const sut = new FocusLock();
      sut.init();
      jest.runAllTimers();
      sut.blocksFocus();

      sut.unblocksFocus();

      expect(sut.isBlockFocus()).toBeFalsy();
    });

    it('Отключает отслеживание мутаций', async () => {
      const sut = new FocusLock({
        mutationObserver: true,
      });
      const addedLink = '<a class="added-link" href="">new link</a>';
      sut.init();
      jest.runAllTimers();
      sut.blocksFocus();

      sut.disconnectsMutationObserver();
      document.body.insertAdjacentHTML('beforeend', addedLink);
      await Promise.resolve();
      const tabIndexAddedLink = document.querySelector('.added-link').tabIndex;

      expect(tabIndexAddedLink).toBe(0);
    });
  });
});
