import Modal from '../../scripts/components/Modal.js';

const modal = new Modal({
  container: '.modal',
  body: '.modal__body',
  trigger: '.trigger',
});

modal.init();
