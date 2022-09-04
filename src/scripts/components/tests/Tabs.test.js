/**
 * @jest-environment jsdom
 */

import Tabs from '../Tabs';

describe('Тестирование табов', () => {
  beforeEach(() => {
    document.body.innerHTML = '';

    const sut = `
        <div class="tabs">
      <ul class="tabs__triggers">
        <li>
          <button class="tabs__trigger" type="button" data-tab="one">
            One
          </button>
        </li>
        <li>
          <button class="tabs__trigger" type="button" data-tab="two">
            two
          </button>
        </li>
      </ul>
      <div class="tabs__body">
        <p class="text-reset tabs__empty-message">Empty</p>
        <li class="tabs__content" data-tab="one">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit
            unde minus saepe reiciendis dolorem maxime rem explicabo officia
            corrupti blanditiis, perspiciatis repudiandae voluptatibus non sequi
            optio asperiores, eaque molestiae ducimus?
          </p>
        </li>
        <li class="tabs__content" data-tab="two">
          <p>loh</p>
        </li>
      </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', sut);
  });

  describe('Тестирование поведения', () => {
    it('Добавление активному табу класса активности', () => {
      const sut = new Tabs('.tabs', {
        initialTab: 'one',
      });
      sut.init();
      const trigger = document.querySelector('.tabs__triggers [data-tab=two]');
      const lengthClassesAtTrigger = trigger.classList.length;
      const event = new Event('pointerup');
      trigger.dispatchEvent(event);

      expect(trigger.classList.length).not.toBe(lengthClassesAtTrigger);
    });

    it('Наличие класса активности только у активного таба', () => {
      const sut = new Tabs('.tabs', {
        initialTab: 'one',
      });
      sut.init();
      const oneTrigger = document.querySelector('.tabs__triggers [data-tab=one]');
      const twoTrigger = document.querySelector('.tabs__triggers [data-tab=two]');
      const lengthClassesOneTrigger = oneTrigger.classList.length;
      const event = new Event('pointerup');
      twoTrigger.dispatchEvent(event);

      expect(oneTrigger.classList.length).not.toBe(lengthClassesOneTrigger);
    });
  });

  describe('Тестирование открытых методов', () => {
    it('Добавление обработчика события, переданы некорректные данные', () => {
      const sut = new Tabs('.tabs');
      sut.init();

      expect(() => {
        sut.on(123, []);
      }).toThrow();
    });

    it('Добавление обработчика события, такого события нет', () => {
      const sut = new Tabs('.tabs');
      sut.init();

      expect(() => {
        sut.on('init', () => { });
      }).toThrow();
    });

    it('Подписка на событие переключение табов (tabSwitching)', () => {
      const sut = new Tabs('.tabs', {
        initialTab: 'one',
      });
      const trigger = document.querySelector('.tabs__triggers [data-tab=two]');
      const event = new Event('pointerup');
      let flag = false;
      sut.init();

      sut.on('tabSwitching', () => {
        flag = true;
      });
      trigger.dispatchEvent(event);

      expect(flag).toBeTruthy();
    });

    it('Подписка на событие показа (showed)', () => {
      const sut = new Tabs('.tabs', {
        initialTab: 'one',
      });
      const trigger = document.querySelector('.tabs__triggers [data-tab=two]');
      let showedContent;
      const event = new Event('pointerup');
      sut.init();

      sut.on('showed', ([el]) => {
        showedContent = el;
      });
      trigger.dispatchEvent(event);

      expect(showedContent).toEqual(document.querySelector('.tabs__body [data-tab=two]'));
    });

    it('Подписка на событие скрытия (hiding)', () => {
      const sut = new Tabs('.tabs', {
        initialTab: 'one',
      });
      const trigger = document.querySelector('.tabs__triggers [data-tab=two]');
      let hidingContent;
      let flag = false;
      const event = new Event('pointerup');
      sut.init();

      sut.on('hiding', ([el]) => {
        if (!flag) {
          hidingContent = el;
          flag = true;
        }
      });
      trigger.dispatchEvent(event);

      expect(hidingContent).toEqual(document.querySelector('.tabs__body [data-tab=one]'));
    });
  });
});
