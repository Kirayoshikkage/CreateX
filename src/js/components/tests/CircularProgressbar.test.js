/**
 * @jest-environment jsdom
 */

import CircularProgressbar from "../CircularProgressbar";

describe("Тестирование кругового прогрессбара", () => {
  beforeEach(() => {
    document.body.innerHTML = "";

    let circularProgressbar = `
      <div class="circle-progressbar">
        <div class="circle-progressbar__circle">
          <svg class="circle-progressbar__svg" viewBox="-10 -10 320 320">
            <circle
              class="circle-progressbar__line"
              r="150"
              cx="150"
              cy="150"
              fill="none"
              stroke-width="15"
            ></circle>
            <circle
              class="circle-progressbar__line-progress"
              r="150"
              cx="150"
              cy="150"
              fill="none"
              stroke-width="15"
            ></circle>
          </svg>
          <div class="circle-progressbar__value"></div>
        </div>
        <p class="circle-progressbar__text">
          Totally satisfied clients
        </p>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", circularProgressbar);
  });

  describe("Тестирование открытых методов", () => {
    it("Получение прогресса", () => {
      let sut = new CircularProgressbar({
        container: ".circle-progressbar",
        progress: 10,
        to: 120,
      });
      sut.init();

      let { percent, value } = sut.getProgress();

      expect(percent).toBe(10);
      expect(value).toBe(12);
    });

    it("Обновление прогресса, прогресс передан", () => {
      let sut = new CircularProgressbar({
        container: ".circle-progressbar",
        progress: 10,
        to: 100,
      });
      sut.init();

      sut.updatesProgress(20);
      let { percent, value } = sut.getProgress();

      expect(percent).toBe(20);
      expect(value).toBe(20);
    });

    it("Обновление прогресса, прогресс не передан", () => {
      let sut = new CircularProgressbar({
        container: ".circle-progressbar",
        progress: 10,
        to: 100,
      });
      sut.init();

      expect(() => {
        sut.updatesProgress();
      }).toThrow();
    });

    it("Обновление прогресса, переданы некорректные данные", () => {
      let sut = new CircularProgressbar({
        container: ".circle-progressbar",
        progress: 10,
        to: 100,
      });
      sut.init();

      expect(() => {
        sut.updatesProgress({
          percent: 10,
          value: 10,
        });
      }).toThrow();
    });
  });

  describe("Тестирование поведения", () => {
    it("Прогресс передан в процентах", () => {
      let sut = new CircularProgressbar({
        container: ".circle-progressbar",
        progress: 10,
        isPercent: true,
        to: 150,
      });
      sut.init();

      let { percent, value } = sut.getProgress();

      expect(percent).toBe(10);
      expect(value).toBe(15);
    });

    it("Прогресс передан в значениях", () => {
      let sut = new CircularProgressbar({
        container: ".circle-progressbar",
        progress: 10,
        isPercent: false,
        to: 120,
      });
      sut.init();

      let { percent, value } = sut.getProgress();

      expect(percent).toBe(8);
      expect(value).toBe(10);
    });

    it("Прогресс выводится в процентах", () => {
      let sut = new CircularProgressbar({
        container: ".circle-progressbar",
        progress: 10,
        to: 120,
      });
      sut.init();

      let rezult = document.querySelector(
        ".circle-progressbar__value"
      ).textContent;

      expect(rezult).toBe("10%");
    });

    it("Прогресс выводится в значениях", () => {
      let sut = new CircularProgressbar({
        container: ".circle-progressbar",
        progress: 10,
        to: 120,
        showPercent: false,
      });
      sut.init();

      let rezult = document.querySelector(
        ".circle-progressbar__value"
      ).textContent;

      expect(rezult).toBe("12");
    });
  });
});
