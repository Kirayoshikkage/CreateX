import Alert from './Alert.js';

export default class Modal extends Alert {
  constructor({
    container = null,
    trigger = false,
    animation = false,
    focusLock = false,
  }) {
    super({
      container, trigger, animation, focusLock,
    });

    this._closeBtn = this._container.querySelector('.modal__close');
  }

  init() {
    super.init();

    this._addsEventListenersButtonClose();
  }

  _addsEventListenersButtonClose() {
    this._closeBtn.addEventListener('pointerup', () => {
      this.close();
    });

    this._closeBtn.addEventListener('keydown', (e) => {
      if (e.code !== 'Enter') return;

      this.close();
    });
  }
}
