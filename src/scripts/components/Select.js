export default class Select {
  constructor(select, {
    animation = null,
  } = {}) {
    this._select = document.querySelector(select);
    this._trigger = this._select.querySelector('.select__trigger');
    this._containerForChosenElement = this._select.querySelector('.select__chosen');
    this._body = this._select.querySelector('.select__body');
    this._content = this._select.querySelector('.select__content');
    this._selectItems = this._select.querySelectorAll('.select__item');

    this._animation = animation;

    this._styleBody = window.getComputedStyle(this._body);
    this._bodyHasTransition = parseFloat(this._styleBody.transitionDuration) != 0;
  }

  _isOpen = false;

  _chosenElement = null;

  _idxSelectItemInFocus = 0;

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

    this._setsFocusOnIdxAfterOpen();
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

  _setsFocusOnIdxAfterOpen() {
    if (this._bodyHasTransition) {
      this._body.addEventListener('transitionend', () => {
        this._selectItems[this._idxSelectItemInFocus]?.focus();
      }, {
        once: true,
      });

      return;
    }

    this._selectItems[this._idxSelectItemInFocus]?.focus();
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

    this._content.addEventListener('keydown', (e) => {
      const { code } = e;

      if (code !== 'ArrowDown') return;

      e.preventDefault();

      this._navigatesDownTheSelectElements();
    });

    this._content.addEventListener('keydown', (e) => {
      const { code } = e;

      if (code !== 'ArrowUp') return;

      e.preventDefault();

      this._navigatesUpTheSelectElements();
    });

    this._content.addEventListener('keyup', (e) => {
      const { target, code } = e;

      if (code !== 'Tab') return;

      this._synchronizesIdxSelectItemInFocus(target);
    });
  }

  _makesElementChosen(element) {
    const dataValue = this._getDataValue(element);

    if (this._checksChosenElementForMatch(dataValue)) return;

    this._removesClassActivityAtSelectItem(
      this._getSelectItemOnDataValue(this._chosenElement),
    );

    this._writesChosenElementInField(dataValue);

    this._addsClassActivitySelectItem(element);

    this._showsChosenElement(element);

    this._close();
  }

  _getDataValue(element) {
    return element.dataset.value;
  }

  _checksChosenElementForMatch(dataValue) {
    return this._chosenElement === dataValue;
  }

  _removesClassActivityAtSelectItem(element) {
    element?.classList.remove('select__item_selected');
  }

  _getSelectItemOnDataValue(dataValue) {
    if (!dataValue) return null;

    return Array.from(this._selectItems)
      .find((item) => item.dataset.value === dataValue);
  }

  _writesChosenElementInField(dataValue) {
    this._chosenElement = dataValue;
  }

  _addsClassActivitySelectItem(element) {
    element?.classList.add('select__item_selected');
  }

  _showsChosenElement(element) {
    this._containerForChosenElement.textContent = element.textContent;
  }

  _navigatesDownTheSelectElements() {
    if (this._selectItems.length - 1 === this._idxSelectItemInFocus) return;

    this._idxSelectItemInFocus += 1;

    this._selectItems[this._idxSelectItemInFocus]?.focus();
  }

  _navigatesUpTheSelectElements() {
    if (this._idxSelectItemInFocus === 0) return;

    this._idxSelectItemInFocus -= 1;

    this._selectItems[this._idxSelectItemInFocus]?.focus();
  }

  _synchronizesIdxSelectItemInFocus(selectItem) {
    this._idxSelectItemInFocus = Array.from(this._selectItems).indexOf(selectItem);
  }
}
