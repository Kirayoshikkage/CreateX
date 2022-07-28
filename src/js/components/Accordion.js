import debounce from '../helpers/debounce';

export default class Accordion {
  constructor(container) {
    this._container = document.querySelector(container);
    this._accordions = this._container.querySelectorAll('.accordion__item');
    this._triggers = this._container.querySelectorAll('.accordion__trigger');
  }

  init() {
    this._setsEventListenersTriggers();

    this._initUpdate();
  }

  _setsEventListenersTriggers() {
    this._triggers.forEach((trigger) => {
      trigger.addEventListener('pointerdown', this._toggle.bind(this));

      trigger.addEventListener('keydown', (e) => {
        if (e.code !== 'Enter') return;

        this._toggle(e);
      });
    });
  }

  _toggle(e) {
    const accordion = this._getAccordionOnEvent(e);

    if (!this._isOpen(accordion)) {
      this._open(accordion);

      return;
    }

    this._close(accordion);
  }

  _getAccordionOnEvent(e) {
    return e.target.closest('.accordion__item');
  }

  _isOpen(accordion) {
    return accordion.dataset?.open === 'true';
  }

  _open(accordion) {
    this._closesActiveAccordion();

    // eslint-disable-next-line no-param-reassign
    accordion.dataset.open = true;

    this._setsStyleVisibility(accordion);
  }

  _closesActiveAccordion() {
    const activeAccordion = this._getActiveAccordion();

    if (!activeAccordion) return;

    this._close(activeAccordion);
  }

  _getActiveAccordion() {
    return Array.from(this._accordions)
      .find((accordion) => this._isOpen(accordion));
  }

  _setsStyleVisibility(accordion) {
    const accordionBody = accordion.querySelector('.accordion__body');
    const accordionContent = accordion.querySelector('.accordion__content');
    const contentHeight = accordionContent.scrollHeight;

    accordionBody.style.maxHeight = `${contentHeight}px`;
  }

  _close(accordion) {
    // eslint-disable-next-line no-param-reassign
    accordion.dataset.open = false;

    this._setsStyleHiding(accordion);
  }

  _setsStyleHiding(accordion) {
    const accordionBody = accordion.querySelector('.accordion__body');

    accordionBody.style.maxHeight = '0';
  }

  _initUpdate() {
    const update = debounce(() => {
      this._update();
    }, 500);

    window.addEventListener('resize', update);
  }

  _update() {
    const activeElement = this._getActiveAccordion();

    if (!activeElement) return;

    this._setsStyleVisibility(activeElement);
  }
}
