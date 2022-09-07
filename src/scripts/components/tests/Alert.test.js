/**
 * @jest-environment jsdom
 */

import Alert from '../Alert';

describe('Тестирование алерта', () => {
  beforeEach(() => {
    document.body.innerHTML = '';

    const alert = `
      <button class="trigger">Click me</button>
      <div class="alert">
        <div class="alert__body">
          <div class="alert__content">
            <p class="alert__text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et,
              deserunt omnis veritatis ad explicabo porro delectus impedit,
              mollitia, quis debitis labore corrupti adipisci reiciendis quibusdam
              quas magni nisi sequi molestias?
            </p>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', alert);
  });

  describe('Тестирование конструктора', () => {
    it('Если триггер не передан, ошибки нет', () => {
      const sut = new Alert({
        container: '.alert',
        body: '.alert__body',
      });

      expect(() => sut.init()).not.toThrow();
    });

    it('Если body не передан, выбрасывается ошибка', () => {
      const sut = new Alert({
        container: '.alert',
      });

      expect(() => sut.init()).toThrow();
    });
  });

  describe('Тестирование поведения', () => {
    it('Триггеру добавляется класс активности при открытии', () => {
      const sut = new Alert({
        container: '.alert',
        trigger: '.trigger',
        body: '.alert__body',
      });
      const trigger = document.querySelector('.trigger');
      sut.init();
      const lengthClassesTrigger = trigger.classList.length;
      sut.open();

      expect(trigger.classList.length).not.toBe(lengthClassesTrigger);
    });

    it('У триггера убирается класса активности при закрытии', () => {
      const sut = new Alert({
        container: '.alert',
        trigger: '.trigger',
        body: '.alert__body',
      });
      const trigger = document.querySelector('.trigger');
      sut.init();
      sut.open();
      const lengthClassesTrigger = trigger.classList.length;
      sut.close();

      expect(trigger.classList.length).not.toBe(lengthClassesTrigger);
    });

    it('Алерту добавляется класс активности при открытии', () => {
      const sut = new Alert({
        container: '.alert',
        trigger: '.trigger',
        body: '.alert__body',
      });
      const alert = document.querySelector('.alert');
      sut.init();
      const lengthClassesAlert = alert.classList.length;
      sut.open();

      expect(alert.classList.length).not.toBe(lengthClassesAlert);
    });

    it('У алерта убирается класс активности при закрытии', () => {
      const sut = new Alert({
        container: '.alert',
        trigger: '.trigger',
        body: '.alert__body',
      });
      const alert = document.querySelector('.alert');
      sut.init();
      sut.open();
      const lengthClassesAlert = alert.classList.length;
      sut.close();

      expect(alert.classList.length).not.toBe(lengthClassesAlert);
    });

    it('При открытии добавляется отступ вместо скролла', () => {
      const sut = new Alert({
        container: '.alert',
        trigger: '.trigger',
        body: '.alert__body',
      });
      const { body } = document;
      body.style.paddingRight = 0;
      sut.init();
      sut.open();

      expect(body.style.paddingRight).not.toMatch('0px');
    });

    it('При закрытии отступ вместо скролла убирается', () => {
      const sut = new Alert({
        container: '.alert',
        trigger: '.trigger',
        body: '.alert__body',
      });
      const event = new Event('transitionend');
      const alert = document.querySelector('.alert');
      const { body } = document;
      sut.init();
      sut.open();
      sut.close();
      alert.dispatchEvent(event);

      expect(body.style.paddingRight).toMatch('0px');
    });
  });

  describe('Тестирование открытых методов', () => {
    it('Метод возвращает истину если алерт открыт', () => {
      const sut = new Alert({
        container: '.alert',
        trigger: '.trigger',
        body: '.alert__body',
      });
      sut.init();
      sut.open();

      expect(sut.isOpen()).toBeTruthy();
    });

    it('Метод возвращает ложь если алерт закрыт', () => {
      const sut = new Alert({
        container: '.alert',
        trigger: '.trigger',
        body: '.alert__body',
      });
      sut.init();
      sut.open();
      sut.close();

      expect(sut.isOpen()).toBeFalsy();
    });
  });
});
