export default class Accordion {
  constructor(container) {
    this._container = document.querySelector(container);
    this._accordions = this._container.querySelectorAll('.accordion__item');
    this._triggers = this._container.querySelectorAll('.accordion__trigger');
  }

  init() {
    this._setsEventListenersTriggers();
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
    const activeAccordion = Array.from(this._accordions)
      .find((accordion) => this._isOpen(accordion));

    if (!activeAccordion) return;

    this._close(activeAccordion);
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
}
