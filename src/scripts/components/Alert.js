export default class Alert {
  constructor({
    container = null,
    trigger = false,
    animation = false,
    focusLock,
  } = {}) {
    this._container = document.querySelector(container);

    this._body = `${container ?? ''}__body`;

    this._trigger = trigger ? document.querySelector(trigger) : false;

    this._animation = animation || false;

    this._focusLock = focusLock || false;
  }

  _isOpen = false;

  init() {
    this._addsEventListenersTrigger();

    this._closesWindowOnClickOutside();

    this._setsStyleHiding();
  }

  _addsEventListenersTrigger() {
    if (!this._trigger) return;

    this._trigger.addEventListener('pointerup', () => {
      this.toggle();
    });

    this._trigger.addEventListener('keydown', (e) => {
      if (e.code !== 'Enter') return;

      this.toggle();
    });
  }

  _closesWindowOnClickOutside() {
    this._container.addEventListener('pointerdown', (e) => {
      if (e.target.closest(this._body)) return;

      this.close();
    });
  }

  toggle() {
    if (this._isOpen) {
      this.close();

      return;
    }

    this.open();
  }

  open() {
    this._isOpen = true;

    this._addsPaddingInsteadOfScroll(document.body);

    this._setsStyleVisibility();

    this._switchesBlockScroll();

    this._switchesClassActiveTrigger();

    this._changesAttrDataOpenAtWindow();

    this._blocksFocus();
  }

  _addsPaddingInsteadOfScroll(element) {
    const padding = `${window.innerWidth - document.body.offsetWidth}px`;

    // eslint-disable-next-line no-param-reassign
    element.style.paddingRight = padding;
  }

  _setsStyleVisibility() {
    if (this._animation) {
      this._animation.setStyleVisibility(this._container);

      return;
    }

    this._container.style.visibility = 'visible';
    this._container.style.opacity = 1;
  }

  _switchesBlockScroll() {
    if (this._isOpen) {
      document.body.classList.add('overflow-hidden');

      return;
    }

    document.body.classList.remove('overflow-hidden');
  }

  _switchesClassActiveTrigger() {
    if (!this._trigger) return;

    if (this._isOpen) {
      this._trigger.classList.add('active');

      return;
    }

    this._trigger.classList.remove('active');
  }

  _changesAttrDataOpenAtWindow() {
    if (this._isOpen) {
      this._container.dataset.open = true;

      return;
    }

    this._container.dataset.open = false;
  }

  _blocksFocus() {
    if (!this._focusLock) return;

    this._focusLock.blocksFocus();
  }

  close() {
    this._isOpen = false;

    this._setsStyleHiding();

    this._switchesBlockScroll();

    this._switchesClassActiveTrigger();

    this._changesAttrDataOpenAtWindow();

    this._unblocksFocus();

    this._removesScrollPadding(document.body);
  }

  _setsStyleHiding() {
    if (this._animation) {
      this._animation.setStyleHiding(this._container);

      return;
    }

    this._container.style.visibility = 'hidden';
    this._container.style.opacity = 0;
  }

  _unblocksFocus() {
    if (!this._focusLock) return;

    this._focusLock.unblocksFocus();
  }

  _removesScrollPadding(element) {
    // eslint-disable-next-line no-param-reassign
    element.style.paddingRight = 0;
  }

  isOpen() {
    return this._isOpen;
  }
}
