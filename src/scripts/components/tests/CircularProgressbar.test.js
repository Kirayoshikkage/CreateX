/**
 * @jest-environment jsdom
 */

import CircularProgressbar from '../CircularProgressbar';

describe('Тестирование кругового прогрессбара', () => {
  beforeEach(() => {
    document.body.innerHTML = '';

    const circularProgressbar = `
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

    document.body.insertAdjacentHTML('beforeend', circularProgressbar);
  });

  describe('Тестирование поведения', () => {
    it('Прогресс передан в процентах', () => {
      const sut = new CircularProgressbar({
        container: '.circle-progressbar',
        progress: 10,
        isPercent: true,
        to: 150,
      });
      sut.init();

      const { percent, value } = sut.getProgress();

      expect(percent).toBe(10);
      expect(value).toBe(15);
    });

    it('Прогресс передан в значении', () => {
      const sut = new CircularProgressbar({
        container: '.circle-progressbar',
        progress: 10,
        isPercent: false,
        to: 120,
      });
      sut.init();

      const { percent, value } = sut.getProgress();

      expect(percent).toBe(8);
      expect(value).toBe(10);
    });

    it('Прогресс выводится в процентах', () => {
      const sut = new CircularProgressbar({
        container: '.circle-progressbar',
        progress: 10,
        to: 120,
        showPercent: true,
      });
      sut.init();

      const rezult = document.querySelector(
        '.circle-progressbar__value',
      ).textContent;

      expect(rezult).toBe('10%');
    });

    it('Прогресс выводится в значении', () => {
      const sut = new CircularProgressbar({
        container: '.circle-progressbar',
        progress: 10,
        to: 120,
        showPercent: false,
      });
      sut.init();

      const rezult = document.querySelector(
        '.circle-progressbar__value',
      ).textContent;

      expect(rezult).toBe('12');
    });
  });

  describe('Тестирование открытых методов', () => {
    it('Получение прогресса', () => {
      const sut = new CircularProgressbar({
        container: '.circle-progressbar',
        progress: 10,
        to: 120,
      });
      sut.init();

      const { percent, value } = sut.getProgress();

      expect(percent).toBe(10);
      expect(value).toBe(12);
    });

    it('Обновление прогресса, прогресс передан в процентах', () => {
      const sut = new CircularProgressbar({
        container: '.circle-progressbar',
        progress: 10,
        to: 150,
        isPercent: true,
      });
      sut.init();

      sut.updatesProgress(50);
      const { percent, value } = sut.getProgress();

      expect(percent).toBe(50);
      expect(value).toBe(75);
    });

    it('Обновление прогресса, прогресс передан в значении', () => {
      const sut = new CircularProgressbar({
        container: '.circle-progressbar',
        progress: 10,
        to: 150,
        isPercent: false,
      });
      sut.init();

      sut.updatesProgress(75);
      const { percent, value } = sut.getProgress();

      expect(percent).toBe(50);
      expect(value).toBe(75);
    });

    it('Обновление прогресса, переданы некорректные данные', () => {
      const sut = new CircularProgressbar({
        container: '.circle-progressbar',
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

    it('Обновление прогресса, прогресс не передан', () => {
      const sut = new CircularProgressbar({
        container: '.circle-progressbar',
        progress: 10,
        to: 100,
      });
      sut.init();

      expect(() => {
        sut.updatesProgress();
      }).toThrow();
    });
  });
});
