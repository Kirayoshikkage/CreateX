import Alert from './Alert.js';

export default class BurgerMenu extends Alert {
  constructor({
    container = null,
    body = null,
    trigger = false,
    breakpoints = false,
    animation = null,
    focusLock = null,
  }) {
    super({
      container, body, trigger, animation, focusLock,
    });

    this._breakpoints = breakpoints || false;
  }

  _currentBreakpoint = new Proxy(
    {
      breakpoint: [],
      bind: this,
    },
    {
      set(target, prop, value, context) {
        target.bind._causesFunctionsBreakpoint(value);

        return Reflect.set(target, prop, value, context);
      },
    },
  );

  init() {
    super.init();

    this._initCurrentBreakpoint();
  }

  _initCurrentBreakpoint() {
    if (!this._breakpoints) return;

    window.addEventListener('resize', () => {
      setTimeout(this._setsCurrentBreakpoint.bind(this), 0);
    });

    this._setsCurrentBreakpoint();
  }

  _setsCurrentBreakpoint() {
    const [newBreakpoint, listFunctions] = this._getCurrentBreakpoint();
    const [oldBreakpoint] = this._currentBreakpoint.breakpoint;

    if (newBreakpoint === oldBreakpoint) return;

    this._currentBreakpoint.breakpoint = newBreakpoint
      ? [newBreakpoint, listFunctions]
      : [];
  }

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
      [],
    );
  }

  _causesFunctionsBreakpoint(breakpoint) {
    if (!breakpoint.length) return;

    const [, listFunctions] = breakpoint;

    listFunctions.forEach((func) => {
      func();
    });
  }
}
