import Modal from "../components/Modal";
import FocusLock from "../components/FocusLock";
import insertsErrorNotificationInHTML from "./insertsErrorNotificationInHTML";

export default function showsErrorNotification() {
  insertsErrorNotificationInHTML();

  const focusLock = new FocusLock(".error-notification");
  const errorNotification = new Modal({
    container: ".error-notification",
    focusLock,
  });

  focusLock.init();
  errorNotification.init();

  setTimeout(() => {
    errorNotification.open();
  });
}
