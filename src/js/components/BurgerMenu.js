import Alert from "./Alert";

export default class BurgerMenu extends Alert {
  constructor({
    container = null,
    trigger = false,
    breakpoints = false,
    animation = false,
  }) {
    super({ container, trigger, animation });
    this._breakpoints = breakpoints ? breakpoints : false;
  }

  _currentBreakpoint = new Proxy(
    {
      breakpoint: [],
      bind: this,
    },
    {
      set(target, prop, value, context) {
        target.bind._callFunctionsBreakpoint(value);

        return Reflect.set(target, prop, value, context);
      },
    }
  );

  /**
   *
   * Инициализирует класс
   *
   */

  init() {
    super.init();

    this._initCurrentBreakpoint();
  }

  /**
   *
   * Инициализирует текущий брейкпоинт
   *
   */

  _initCurrentBreakpoint() {
    if (!this._breakpoints) return;

    window.addEventListener("resize", () => {
      setTimeout(this._setCurrentBreakpoint.bind(this), 0);
    });

    this._setCurrentBreakpoint();
  }

  /**
   *
   * Возвращает текущий брейкпоинт [брейкпоинт, список функций]
   *
   */

  _getCurrentBreakpoint() {
    const width = document.body.offsetWidth;

    return Object.entries(this._breakpoints).reduce(
      (acc, [breakpoint, listFunctions]) => {
        if (width >= breakpoint) {
          // eslint-disable-next-line no-param-reassign

          acc = [breakpoint, listFunctions];
        }

        return acc;
      },
      []
    );
  }

  /**
   *
   * Устанавливает текущий брейкпоинт в переменную this._currentBreakpoint
   *
   */

  _setCurrentBreakpoint() {
    const [newBreakpoint, listFunctions] = this._getCurrentBreakpoint();
    const [oldBreakpoint] = this._currentBreakpoint.breakpoint;

    if (newBreakpoint === oldBreakpoint) return;

    this._currentBreakpoint.breakpoint = newBreakpoint
      ? [newBreakpoint, listFunctions]
      : [];
  }

  /**
   *
   * Вызывает функции брейкпоинта
   *
   */

  _callFunctionsBreakpoint(breakpoint) {
    if (!breakpoint.length) return;

    const [, listFunctions] = breakpoint;

    for (const func of listFunctions) {
      func();
    }
  }
}
