/**
 * @jest-environment jsdom
 */

jest.useFakeTimers();

import FocusLock from "../FocusLock";

describe("Тестирование блокировки фокуса", () => {
  beforeEach(() => {
    document.body.innerHTML = "";

    const elements = `
      <a class="link" href="#">Link</a>

      <div class="container-exception">
        <a class="container-exception__link" href="#">link</a>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", elements);
  });

  describe("Тесирование открытых методов", () => {
    it("Блокировка фокуса", () => {
      const sut = new FocusLock();
      const focusableElement = document.querySelector(".link");
      sut.init();
      jest.runAllTimers();

      sut.blocksFocus();

      expect(focusableElement.getAttribute("tabindex")).toBe("-1");
    });

    it("Разблокировка фокуса", () => {
      const sut = new FocusLock();
      const focusableElement = document.querySelector(".link");
      sut.init();
      jest.runAllTimers();
      sut.blocksFocus();

      sut.unblocksFocus();

      expect(focusableElement.getAttribute("tabindex")).toBe("0");
    });
  });

  describe("Тестирование добавления исключений", () => {
    it("Исключение передается в неверном формате", () => {
      const sut = new FocusLock(document.querySelector("a"));

      expect(() => sut.init()).toThrow();
    });

    it("Исключение передается в виде массивa", () => {
      const sut = new FocusLock([".container-exception"]);
      const link = document.querySelector(".link");
      const linkInContainerException = document.querySelector(
        ".container-exception__link"
      );
      sut.init();
      jest.runAllTimers();

      sut.blocksFocus();

      expect(link.getAttribute("tabindex")).toBe("-1");
      expect(linkInContainerException.getAttribute("tabindex")).not.toBe("-1");
    });

    it("Исключение передается в виде строки", () => {
      const sut = new FocusLock(".container-exception");
      const link = document.querySelector(".link");
      const linkInContainerException = document.querySelector(
        ".container-exception__link"
      );
      sut.init();
      jest.runAllTimers();

      sut.blocksFocus();

      expect(link.getAttribute("tabindex")).toBe("-1");
      expect(linkInContainerException.getAttribute("tabindex")).not.toBe("-1");
    });
  });

  describe("Тестирование поведения", () => {
    it("Новые элементы на странице добавляются в список блокировок, если соответствуют критериям", async () => {
      const sut = new FocusLock();
      const focusableElement = `
        <a class="added-link" href="">new link</a>
      `;
      const unfocusableElement = `<div class="added-div">123</div>`;
      sut.init();
      jest.runAllTimers();

      document.body.insertAdjacentHTML("beforeend", focusableElement);
      document.body.insertAdjacentHTML("beforeend", unfocusableElement);

      // Без этой конструкции не работает, потому что MutationObserver выполняется позже чем блокировка фокуса

      await Promise.resolve().then(() => {
        sut.blocksFocus();
      });

      expect(
        document.querySelector(".added-link").getAttribute("tabindex")
      ).toBe("-1");
      expect(
        document.querySelector(".added-div").getAttribute("tabindex")
      ).toBeNull();
    });
  });
});
