import debounce from '../helpers/debounce.js';

export default class Accordion {
  constructor(container, {
    apiAnimation = null,
  } = {}) {
    this._container = document.querySelector(container);
    this._accordions = this._container.querySelectorAll('.accordion__item');
    this._triggers = this._container.querySelectorAll('.accordion__trigger');
    this._apiAnimation = apiAnimation;
  }

  _activeAccordion = null;

  getActiveAccordion() {
    return this._activeAccordion;
  }

  init() {
    this._setsEventListenersTriggers();

    this._initUpdate();

    this._closesAllAccordions();
  }

  _setsEventListenersTriggers() {
    this._triggers.forEach((trigger) => {
      trigger.addEventListener('pointerup', this._toggle.bind(this));

      trigger.addEventListener('keydown', (e) => {
        if (e.code !== 'Enter') return;

        this._toggle(e);
      });
    });
  }

  _toggle(e) {
    const accordion = this._getAccordionOnEvent(e);
    const accordionIsOpen = this._accordionIsOpen(accordion);

    if (accordionIsOpen) {
      this._close(accordion);

      return;
    }

    this._open(accordion);
  }

  _getAccordionOnEvent(e) {
    return e.target.closest('.accordion__item');
  }

  _accordionIsOpen(accordion) {
    return accordion.classList.contains('accordion__item_active');
  }

  _open(accordion) {
    this._closesActiveAccordion();

    this._activeAccordion = accordion;

    this._addsClassActiviteAccordion(accordion);

    this._setsStyleVisibility(accordion);
  }

  _closesActiveAccordion() {
    const activeAccordion = this.getActiveAccordion();

    if (!activeAccordion) return;

    this._close(activeAccordion);
  }

  _close(accordion) {
    this._removesClassActiviteAccordion(accordion);

    this._setsStyleHiding(accordion);

    this._activeAccordion = null;
  }

  _removesClassActiviteAccordion(accordion) {
    accordion.classList.remove('accordion__item_active');
  }

  _setsStyleHiding(accordion) {
    if (this._apiAnimation) {
      this._apiAnimation.setsStyleHiding(accordion);

      return;
    }

    const accordionBody = accordion.querySelector('.accordion__body');

    accordionBody.style.display = 'none';
  }

  _addsClassActiviteAccordion(accordion) {
    accordion.classList.add('accordion__item_active');
  }

  _setsStyleVisibility(accordion) {
    if (this._apiAnimation) {
      this._apiAnimation.setsStyleVisibility(accordion);

      return;
    }

    const accordionBody = accordion.querySelector('.accordion__body');

    accordionBody.style.display = 'block';
  }

  _closesAllAccordions() {
    this._accordions.forEach((accordion) => this._close(accordion));
  }

  _initUpdate() {
    const update = debounce(() => {
      this._update();
    }, 500);

    window.addEventListener('resize', update);
  }

  _update() {
    const activeAccordion = this.getActiveAccordion();

    if (!activeAccordion) return;

    this._setsStyleVisibility(activeAccordion);
  }
}
