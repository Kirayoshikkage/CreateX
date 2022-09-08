import Alert from './Alert.js';
import debounce from '../helpers/debounce.js';

export default class BurgerMenu extends Alert {
  constructor({
    container = null,
    body = null,
    trigger = null,
    breakpoints = null,
    animation = null,
    focusLock = null,
  } = {}) {
    super({
      container, body, trigger, animation, focusLock,
    });

    this._breakpoints = breakpoints;
  }

  _currentBreakpoint;

  init() {
    super.init();

    this._initBreakpointUpdate();
  }

  _initBreakpointUpdate() {
    if (!this._breakpoints) return;

    this._updatesBreakpoint();

    window.addEventListener('resize', debounce(this._updatesBreakpoint.bind(this), 400));
  }

  _updatesBreakpoint() {
    const breakpoint = this._getCurrentBreakpoint();

    if (this._currentBreakpoint == breakpoint) return;

    this._currentBreakpoint = breakpoint;

    this._callsFunctionsBreakpoint();
  }

  _getCurrentBreakpoint() {
    const width = window.innerWidth;

    return Object.keys(this._breakpoints).reduce((acc, breakpoint) => {
      if (width >= breakpoint) {
        // eslint-disable-next-line no-param-reassign
        acc = breakpoint;
      }

      return acc;
    }, 0);
  }

  _callsFunctionsBreakpoint() {
    const functionsBreakpoint = this._breakpoints[this._currentBreakpoint];

    if (!functionsBreakpoint) return;

    if (typeof functionsBreakpoint === 'function') {
      functionsBreakpoint();

      return;
    }

    functionsBreakpoint?.forEach((func) => {
      func();
    });
  }
}
