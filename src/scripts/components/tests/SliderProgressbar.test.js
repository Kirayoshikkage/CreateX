/**
 * @jest-environment jsdom
 */

import SliderProgressbar from '../SliderProgressbar';

describe('Тестирование прогрессбара слайдера', () => {
  beforeEach(() => {
    document.body.innerHTML = '';

    const sliderProgressbar = `
      <div class="slider-progressbar">
        <ul class="slider-progressbar__list"></ul>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', sliderProgressbar);
  });

  describe('Тестирование поведения', () => {
    it('При инициализации элементы добавляются на страницу', () => {
      const sut = new SliderProgressbar('.slider-progressbar__list', 1);
      sut.init();

      const rezult = document.querySelector('.slider-progressbar__list').children
        .length;

      expect(rezult).not.toBe(0);
    });
  });

  describe('Тестирование открытых методов', () => {
    it('Получение элементов', () => {
      const sut = new SliderProgressbar('.slider-progressbar__list', 1);
      sut.init();

      const rezult = sut.getElements();

      expect(rezult.length).not.toBe(0);
    });

    it('Получение элемента по индексу, элемент под этим индексом существует', () => {
      const sut = new SliderProgressbar('.slider-progressbar__list', 1);
      sut.init();

      const rezult = sut.getElementOnIndex(0);

      expect(rezult).toBe(document.querySelector('.slider-progressbar__item'));
    });

    it('Получение элемента по индексу, элемент под этим индексом не существует', () => {
      const sut = new SliderProgressbar('.slider-progressbar__list', 1);
      sut.init();

      const rezult = sut.getElementOnIndex('э');

      expect(rezult).toBe('');
    });

    it('Получение элемента по индексу, индекс не передан', () => {
      const sut = new SliderProgressbar('.slider-progressbar__list', 1);
      sut.init();

      expect(() => {
        sut.getElementOnIndex();
      }).toThrow();
    });

    it('Делает элемент активным, передан html элемент', () => {
      const sut = new SliderProgressbar('.slider-progressbar__list', 2);
      sut.init();
      const element = sut.getElementOnIndex(1);

      sut.makesElementActive(element);
      const isActive = sut.elementIsActive(element);

      expect(isActive).toBeTruthy();
    });

    it('Делает элемент активным, элемент не передан', () => {
      const sut = new SliderProgressbar('.slider-progressbar__list', 2);
      sut.init();

      expect(() => sut.makesElementActive()).toThrow();
    });

    it('Делает элемент активным, передан не html элемент', () => {
      const sut = new SliderProgressbar('.slider-progressbar__list', 2);
      sut.init();

      expect(() => sut.makesElementActive(123)).toThrow();
    });

    it('Делает элемент неактивным, передан html элемент', () => {
      const sut = new SliderProgressbar('.slider-progressbar__list', 2);
      sut.init();
      const element = sut.getElementOnIndex(1);
      sut.makesElementActive(element);

      sut.makesElementInactive(element);
      const isActive = sut.elementIsActive(element);

      expect(isActive).toBeFalsy();
    });

    it('Делает элемент неактивным, элемент не передан', () => {
      const sut = new SliderProgressbar('.slider-progressbar__list', 2);
      sut.init();

      expect(() => sut.makesElementInactive()).toThrow();
    });

    it('Делает элемент неактивным, передан не html элемент', () => {
      const sut = new SliderProgressbar('.slider-progressbar__list', 2);
      sut.init();

      expect(() => sut.makesElementInactive(123)).toThrow();
    });

    it('Устанавливает элементам обработчик события, аргументы переданы', () => {
      const sut = new SliderProgressbar('.slider-progressbar__list', 2);
      let flag = false;
      const event = new Event('click');
      sut.init();

      sut.setsElementsEventListener('click', () => {
        flag = true;
      });
      sut.getElementOnIndex(0).dispatchEvent(event);

      expect(flag).toBeTruthy();
    });

    it('Устанавливает элементам обработчик события, аргументы не переданы', () => {
      const sut = new SliderProgressbar('.slider-progressbar__list', 2);
      sut.init();

      expect(() => {
        sut.setsElementsEventListener();
      }).toThrow();
    });

    it('Устанавливает элементам обработчик события, переданы некорректные аргументы', () => {
      const sut = new SliderProgressbar('.slider-progressbar__list', 2);
      sut.init();

      expect(() => {
        sut.setsElementsEventListener(123, 10);
      }).toThrow();
    });

    it('Проверяет активен ли элемент, элемент не передан', () => {
      const sut = new SliderProgressbar('.slider-progressbar__list', 1);
      sut.init();

      expect(() => {
        sut.elementIsActive();
      }).toThrow();
    });
  });
});
