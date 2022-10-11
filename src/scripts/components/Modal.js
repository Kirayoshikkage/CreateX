import Alert from './Alert.js';

export default class Modal extends Alert {
  constructor({
    container = null,
    body = null,
    trigger = null,
    animation = null,
    focusLock = null,
  } = {}) {
    super({
      container, body, trigger, animation, focusLock,
    });

    this._closeBtn = this._container.querySelector('.modal__close');
  }

  _activeElementBeforeOpen;

  init() {
    super.init();

    this._addsEventListenersButtonClose();
  }

  _addsEventListenersButtonClose() {
    this._closeBtn.addEventListener('pointerup', () => {
      this.close();
    });

    this._closeBtn.addEventListener('keyup', (e) => {
      if (e.code !== 'Enter') return;

      this.close();
    });
  }

  open() {
    super.open();

    this._activeElementBeforeOpen = document.activeElement;
  }

  close() {
    super.close();

    this._activeElementBeforeOpen?.focus();
    this._activeElementBeforeOpen = null;
  }
}
