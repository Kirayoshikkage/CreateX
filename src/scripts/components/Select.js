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

  _isOpen = false;

  _chosenElement = null;

  getChosenElement() {
    return this._chosenElement;
  }

  isFilled() {
    return Boolean(this._chosenElement);
  }

  isOpen() {
    return this._isOpen;
  }

  init() {
    this._close();

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
    if (this._isOpen) {
      this._close();

      return;
    }

    this._open();
  }

  _open() {
    this._isOpen = true;

    this._setsStyleVisibility();

    this._addsClassActiviteSelect();
  }

  _setsStyleVisibility() {
    if (this._animation) {
      this._animation.setsStyleVisibility(this._select);

      return;
    }

    this._body.style.display = 'block';
  }

  _addsClassActiviteSelect() {
    this._select.classList.add('select_active');
  }

  _close() {
    this._isOpen = false;

    this._setsStyleHiding();

    this._removesClassActiviteAtSelect();
  }

  _setsStyleHiding() {
    if (this._animation) {
      this._animation.setsStyleHiding(this._select);

      return;
    }

    this._body.style.display = 'none';
  }

  _removesClassActiviteAtSelect() {
    this._select.classList.remove('select_active');
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
