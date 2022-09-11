/**
 * @jest-environment jsdom
 */

import Accordion from '../Accordion';

describe('Тестирование аккордиона', () => {
  beforeEach(() => {
    document.body.innerHTML = '';

    const accordion = `
    <ul class="accordion">
      <li class="accordion__item accordion__item_one">
        <button class="btn-reset accordion__trigger" type="button">
          <span class="accordion__subtitle">Interior design of apartments</span>
        </button>
        <div class="accordion__body">
          <div class="accordion__content">
            <p class="accordion__text">
              Adipiscing nunc arcu enim elit mattis eu placerat proin. Imperdiet
              elementum faucibus dignissim purus. Fusce parturient diam magna
              ullamcorper morbi semper massa ac facilisis.
            </p>
          </div>
        </div>
      </li>
      <li class="accordion__item accordion__item_two">
        <button class="btn-reset accordion__trigger" type="button">
          <span class="accordion__subtitle">Interior design of apartments</span>
        </button>
        <div class="accordion__body">
          <div class="accordion__content">
            <p class="accordion__text">
              Adipiscing nunc arcu enim elit mattis eu placerat proin. Imperdiet
              elementum faucibus dignissim purus. Fusce parturient diam magna
              ullamcorper morbi semper massa ac facilisis.
            </p>
          </div>
        </div>
      </li>
    </ul>
    `;

    document.body.insertAdjacentHTML('beforeend', accordion);
  });

  describe('Тестирование поведения', () => {
    it('При открытии элемента аккордиона ему добавляется класс активности', () => {
      const sut = new Accordion('.accordion');
      const accordionItem = document.querySelector('.accordion__item_one');
      const lengthClassesAccordionItem = accordionItem.classList.length;
      sut.init();
      sut._open(accordionItem);

      expect(accordionItem.classList.length).not.toBe(lengthClassesAccordionItem);
    });

    it('При закрытии элемента аккордиона у него убирается класс активности', () => {
      const sut = new Accordion('.accordion');
      const accordionItem = document.querySelector('.accordion__item_one');
      sut.init();
      sut._open(accordionItem);
      const lengthClassesAccordionItem = accordionItem.classList.length;
      sut._close(accordionItem);

      expect(accordionItem.classList.length).not.toBe(lengthClassesAccordionItem);
    });
  });

  describe('Тестирование открытых методов', () => {
    it('Метод возвращает открытый элемент аккордиона', () => {
      const sut = new Accordion('.accordion');
      const accordionItem = document.querySelector('.accordion__item_one');
      sut.init();
      sut._open(accordionItem);

      expect(sut.getActiveAccordion()).toBe(accordionItem);
    });

    it('Метод возвращает null, если все элементы аккордиона закрыты', () => {
      const sut = new Accordion('.accordion');
      const accordionItem = document.querySelector('.accordion__item_one');
      sut.init();
      sut._open(accordionItem);
      sut._close(accordionItem);

      expect(sut.getActiveAccordion()).toBeNull();
    });
  });
});
