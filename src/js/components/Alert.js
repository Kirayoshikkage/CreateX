export default class Alert {
  constructor({ container = null, trigger = false, animation = false } = {}) {
    this._container = document.querySelector(container);

    this._body = `${container ?? ""}__body`;

    this._trigger = trigger ? document.querySelector(trigger) : false;

    this._animation = animation ? animation : false;
  }

  _isOpen;

  /**
   *
   * Инициализирует класс
   *
   */

  init() {
    this._addEventListenersTrigger();

    this._closeWindowOnClickOutside();

    this.close();
  }

  /**
   *
   * Добавляет обработчики событий триггеру
   *
   */

  _addEventListenersTrigger() {
    if (!this._trigger) return;

    this._trigger.addEventListener("pointerdown", () => {
      this.toggle();
    });

    this._trigger.addEventListener("keydown", (e) => {
      if (e.code !== "Enter") return;

      this.toggle();
    });
  }

  /**
   *
   * Закрывает окно по клику вне
   *
   */

  _closeWindowOnClickOutside() {
    this._container.addEventListener("pointerdown", (e) => {
      if (e.target.closest(this._body)) return;

      this.close();
    });
  }

  /**
   *
   * Открывает / закрывает окно
   *
   */

  toggle() {
    if (this._isOpen) {
      this.close();

      return;
    }

    this.open();
  }

  /**
   *
   * Открывает окно
   *
   */

  open() {
    this._isOpen = true;

    this._setStyleVisibility();

    this._toggleBlockScroll();

    this._toggleClassActiveTrigger();

    this._changeAttrDataOpenAtWindow();
  }

  /**
   *
   * Устанавливает стили видимости
   *
   */

  _setStyleVisibility() {
    if (this._animation) {
      this._animation.setStyleVisibility(this._container);

      return;
    }

    this._container.style.visibility = "visible";
    this._container.style.opacity = 1;
  }

  /**
   *
   * Добавляет блокировку скроллу / снимает блокировку скролла
   *
   */

  _toggleBlockScroll() {
    if (this._isOpen) {
      document.body.classList.add("overflow-hidden");

      return;
    }

    document.body.classList.remove("overflow-hidden");
  }

  /**
   *
   * Добавляет / снимает класс активности у триггера
   *
   */

  _toggleClassActiveTrigger() {
    if (!this._trigger) return;

    if (this._isOpen) {
      this._trigger.classList.add("active");

      return;
    }

    this._trigger.classList.remove("active");
  }

  /**
   *
   * Изменяет атрибут data-open у окна
   *
   */

  _changeAttrDataOpenAtWindow() {
    if (this._isOpen) {
      this._container.dataset.open = true;

      return;
    }

    this._container.dataset.open = false;
  }

  /**
   *
   * Закрывает окно
   *
   */

  close() {
    this._isOpen = false;

    this._setStyleHiding();

    this._toggleBlockScroll();

    this._toggleClassActiveTrigger();

    this._changeAttrDataOpenAtWindow();
  }

  /**
   *
   * Устанавливает стили сокрытия
   *
   */

  _setStyleHiding() {
    if (this._animation) {
      this._animation.setStyleHiding(this._container);

      return;
    }

    this._container.style.visibility = "hidden";
    this._container.style.opacity = 0;
  }

  /**
   *
   * Возвращает true - если окно открыто, false - закрыто
   *
   */

  isOpen() {
    return this._isOpen;
  }
}
