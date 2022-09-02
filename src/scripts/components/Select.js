export default class Select {
  constructor(select, {
    animation = null,
  } = {}) {
    this._select = document.querySelector(select);
    this._trigger = this._select.querySelector('.select__trigger');
    this._containerForChosenElement = this._select.querySelector('.select__chosen');
    this._body = this._select.querySelector('.select__body');
    this._content = this._select.querySelector('.select__content');
    this._animation = animation;
  }

  _chosenElement = null;

  getChosenElement() {
    return this._chosenElement;
  }

  isFilled() {
    return Boolean(this._chosenElement);
  }

  init() {
    this._setsEventListenersTrigger();

    this._setsEventListenersElements();
  }

  _setsEventListenersTrigger() {
    this._trigger.addEventListener('pointerup', this._toggle.bind(this));

    this._trigger.addEventListener('keydown', (e) => {
      if (e.code !== 'Enter') return;

      this._toggle();
    });
  }

  _toggle() {
    if (!this.isOpen()) {
      this._open();

      return;
    }

    this._close();
  }

  isOpen() {
    return this._select.dataset.open === 'true';
  }

  _open() {
    this._select.dataset.open = true;

    this._setsStyleVisibility();
  }

  _setsStyleVisibility() {
    if (this._animation) {
      this._animation.setsStyleVisibility(this._select);

      return;
    }

    this._body.style.display = 'block';
  }

  _close() {
    this._select.dataset.open = false;

    this._setsStyleHiding();
  }

  _setsStyleHiding() {
    if (this._animation) {
      this._animation.setsStyleHiding(this._select);

      return;
    }

    this._body.style.display = 'none';
  }

  _setsEventListenersElements() {
    this._content.addEventListener('pointerup', (e) => {
      const { target } = e;

      if (!target.classList.contains('select__item')) return;

      this._makesElementChosen(target);
    });

    this._content.addEventListener('keydown', (e) => {
      const { target } = e;

      if (e.code !== 'Enter') return;

      if (!target.classList.contains('select__item')) return;

      this._makesElementChosen(target);
    });
  }

  _makesElementChosen(element) {
    const dataValue = this._getDataValue(element);

    if (this._checksChosenElementForMatch(dataValue)) return;

    this._writesChosenElementInField(dataValue);

    this._showsChosenElement(element);

    this._close();
  }

  _getDataValue(element) {
    return element.dataset.value;
  }

  _checksChosenElementForMatch(dataValue) {
    return this._chosenElement === dataValue;
  }

  _writesChosenElementInField(dataValue) {
    this._chosenElement = dataValue;
  }

  _showsChosenElement(element) {
    this._containerForChosenElement.textContent = element.textContent;
  }
}
