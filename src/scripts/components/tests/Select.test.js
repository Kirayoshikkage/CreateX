/**
 * @jest-environment jsdom
 */

import Select from '../Select';

describe('Тестирование селекта', () => {
  beforeEach(() => {
    document.body.innerHTML = '';

    const select = `
    <div class="select">
      <button class="btn-reset select__trigger" type="button">
        <span class="select__chosen">Choose a value</span>
      </button>
      <div class="select__body">
        <div class="select__content">
          <ul class="list-reset select__list" tabindex="-1">
            <li>
              <button
                class="btn-reset select__item"
                type="button"
                data-value="interior-design"
              >
                Interior Design
              </button>
            </li>
            <li>
              <button
                class="btn-reset select__item"
                type="button"
                data-value="system-programmer"
              >
                System programmer
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', select);
  });

  describe('Тестирование поведения', () => {
    it('При открытии селекту добавляется класс активности', () => {
      const sut = new Select('.select');
      const select = document.querySelector('.select');
      const lengthClassesSelect = select.classList.length;
      sut.init();
      sut._open();

      expect(select.classList.length).not.toBe(lengthClassesSelect);
    });

    it('При закрытии у селекта убирается класс активности', () => {
      const sut = new Select('.select');
      const select = document.querySelector('.select');
      sut.init();
      sut._open();
      const lengthClassesSelect = select.classList.length;
      sut._close();

      expect(select.classList.length).not.toBe(lengthClassesSelect);
    });

    it('При выборе элемента ему добавляется класс активности', () => {
      const sut = new Select('.select');
      const selectItem = document.querySelector('.select__item');
      const lengthClassesSelectItem = selectItem.classList.length;
      sut.init();

      sut._makesElementChosen(selectItem);

      expect(selectItem.classList.length).not.toBe(lengthClassesSelectItem);
    });

    it('При выборе элемента у активного элемента убирается класс активности', () => {
      const sut = new Select('.select');
      const initialActiveElement = document.querySelector('[data-value=interior-design]');
      const futureActiveElement = document.querySelector('[data-value=system-programmer]');
      sut.init();
      sut._makesElementChosen(initialActiveElement);
      const lengthClassesInitialActiveElement = initialActiveElement.classList.length;

      sut._makesElementChosen(futureActiveElement);

      expect(initialActiveElement.classList.length).not.toBe(lengthClassesInitialActiveElement);
    });
  });

  describe('Тестирование открытых методов', () => {
    it('Если селект открыт, метод возвращает истину', () => {
      const sut = new Select('.select');
      sut.init();
      sut._open();

      expect(sut.isOpen()).toBe(true);
    });

    it('Если селект закрыт, метод возвращает ложь', () => {
      const sut = new Select('.select');
      sut.init();
      sut._close();

      expect(sut.isOpen()).toBe(false);
    });

    it('Метод возвращает истину, если выбран элемент', () => {
      const sut = new Select('.select');
      const selectedElement = document.querySelector('[data-value=interior-design]');
      sut.init();
      sut._makesElementChosen(selectedElement);

      expect(sut.isFilled()).toBeTruthy();
    });

    it('Метод возвращает ложь, если элемент не выбран', () => {
      const sut = new Select('.select');
      sut.init();

      expect(sut.isFilled()).toBeFalsy();
    });

    it('Метод возвращает выбранный элемент', () => {
      const sut = new Select('.select');
      const dataValue = 'interior-design';
      const selectedElement = document.querySelector(`[data-value=${dataValue}]`);
      sut.init();
      sut._makesElementChosen(selectedElement);

      expect(sut.getChosenElement()).toBe(dataValue);
    });
  });
});
