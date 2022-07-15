/**
 * @jest-environment jsdom
 */

import SliderProgressbar from "../SliderProgressbar";

describe("Тестирование прогрессбара слайдера", () => {
  beforeEach(() => {
    document.body.innerHTML = "";

    let sliderProgressbar = `
      <div class="slider-progressbar">
        <ul class="slider-progressbar__list"></ul>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", sliderProgressbar);
  });

  describe("Тестирование поведения", () => {
    it("При инициализации элементы добавляются на страницу", () => {
      let sut = new SliderProgressbar(".slider-progressbar__list", 1);
      sut.init();

      let rezult = document.querySelector(".slider-progressbar__list").children
        .length;

      expect(rezult).not.toBe(0);
    });
  });

  describe("Тестирование открытых методов", () => {
    it("Получение элементов", () => {
      let sut = new SliderProgressbar(".slider-progressbar__list", 1);
      sut.init();

      let rezult = sut.getElements();

      expect(rezult.length).not.toBe(0);
    });

    it("Получение элемента по индексу, элемент под этим индексом существует", () => {
      let sut = new SliderProgressbar(".slider-progressbar__list", 1);
      sut.init();

      let rezult = sut.getElementOnIndex(0);

      expect(rezult).toBe(document.querySelector(".slider-progressbar__item"));
    });

    it("Получение элемента по индексу, элемент под этим индексом не существует", () => {
      let sut = new SliderProgressbar(".slider-progressbar__list", 1);
      sut.init();

      let rezult = sut.getElementOnIndex("э");

      expect(rezult).toBe("");
    });

    it("Получение элемента по индексу, индекс не передан", () => {
      let sut = new SliderProgressbar(".slider-progressbar__list", 1);
      sut.init();

      expect(() => {
        sut.getElementOnIndex();
      }).toThrow();
    });

    it("Делает элемент активным, передан html элемент", () => {
      let sut = new SliderProgressbar(".slider-progressbar__list", 2);
      sut.init();
      let element = sut.getElementOnIndex(1);
      let classLength = element.classList.length;

      sut.makesElementActive(element);

      expect(classLength).not.toBe(element.classList.length);
    });

    it("Делает элемент активным, элемент не передан", () => {
      let sut = new SliderProgressbar(".slider-progressbar__list", 2);
      sut.init();

      expect(() => sut.makesElementActive()).toThrow();
    });

    it("Делает элемент активным, передан не html элемент", () => {
      let sut = new SliderProgressbar(".slider-progressbar__list", 2);
      sut.init();

      expect(() => sut.makesElementActive(123)).toThrow();
    });

    it("Делает элемент неактивным, передан html элемент", () => {
      let sut = new SliderProgressbar(".slider-progressbar__list", 2);
      sut.init();
      let element = sut.getElementOnIndex(1);
      let classLength = element.classList.length;

      sut.makesElementInactive(element);

      expect(classLength).not.toBe(element.classList.length);
    });

    it("Делает элемент неактивным, элемент не передан", () => {
      let sut = new SliderProgressbar(".slider-progressbar__list", 2);
      sut.init();

      expect(() => sut.makesElementInactive()).toThrow();
    });

    it("Делает элемент неактивным, передан не html элемент", () => {
      let sut = new SliderProgressbar(".slider-progressbar__list", 2);
      sut.init();

      expect(() => sut.makesElementInactive(123)).toThrow();
    });

    it("Устанавливает элементам обработчик события, аргументы переданы", () => {
      let sut = new SliderProgressbar(".slider-progressbar__list", 2);
      let flag = false;
      let event = new Event("click");
      sut.init();

      sut.setsElementsEventListener("click", () => {
        flag = true;
      });
      sut.getElementOnIndex(0).dispatchEvent(event);

      expect(flag).toBeTruthy();
    });

    it("Устанавливает элементам обработчик события, аргументы не переданы", () => {
      let sut = new SliderProgressbar(".slider-progressbar__list", 2);
      sut.init();

      expect(() => {
        sut.setsElementsEventListener();
      }).toThrow();
    });

    it("Устанавливает элементам обработчик события, переданы некорректные аргументы", () => {
      let sut = new SliderProgressbar(".slider-progressbar__list", 2);
      sut.init();

      expect(() => {
        sut.setsElementsEventListener(123, 10);
      }).toThrow();
    });
  });
});
