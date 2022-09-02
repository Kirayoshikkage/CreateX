export default class SliderProgressbar {
  constructor(container = null, amount = null) {
    this._container = document.querySelector(container);
    this._amount = amount;
    this._elements = null;
  }

  makesElementActive(element = null) {
    element.classList.remove('slider-progressbar__item_inactive');

    element.classList.add('slider-progressbar__item_active');
  }

  makesElementInactive(element = null) {
    element.classList.remove('slider-progressbar__item_active');

    element.classList.add('slider-progressbar__item_inactive');
  }

  elementIsActive(element = null) {
    return element.classList.contains('slider-progressbar__item_active');
  }

  init() {
    this._throwsErrors();

    this._insertsElementsIntoTheContainer();

    this._savesElementsInFieldElements();

    this._setsInitialValue();
  }

  _throwsErrors() {
    if (!this._container) throw new Error('Container not found');

    if (!this._amount) throw new Error('Amount not transferred');
  }

  _insertsElementsIntoTheContainer() {
    this._container.insertAdjacentHTML('beforeend', this._createsElements());
  }

  _createsElements() {
    let fragment = '';

    for (let i = 0; i < this._amount; i += 1) {
      fragment += `<li class="slider-progressbar__item" data-id=${i}></li>`;
    }

    return fragment;
  }

  _savesElementsInFieldElements() {
    this._elements = this._container.querySelectorAll(
      '.slider-progressbar__item',
    );
  }

  getElements() {
    return this._elements;
  }

  _setsInitialValue() {
    this.getElementOnIndex(0).classList.add('slider-progressbar__item_active');
  }

  getElementOnIndex(index = null) {
    if (index === null) throw new Error('Index not transferred');

    return this._elements[index] ?? '';
  }

  setsElementsEventListener(event = null, cb = null) {
    if (typeof event !== 'string') throw new Error('Event wrong type');

    this._elements.forEach((element) => {
      element.addEventListener(event, (e) => {
        cb(e);
      });
    });
  }
}
