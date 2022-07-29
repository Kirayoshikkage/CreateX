import Modal from '../components/Modal';
import FocusLock from '../components/FocusLock';
import { tunesValidationSubscribeModalForm } from '../helpers/tunesValidationForms';

export default function availablePositions() {
  const focusLock = new FocusLock('.subscribe-modal');
  const triggerSubscribeModal = '.available-positions__subscribe';
  const subscribeModal = new Modal({
    container: '.subscribe-modal',
    trigger: triggerSubscribeModal,
    focusLock,
  });

  focusLock.init();
  subscribeModal.init();

  tunesValidationSubscribeModalForm(() => {
    subscribeModal.close();
  });
}
