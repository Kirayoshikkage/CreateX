import showsErrorNotification from './showsErrorNotification.js';

export default function errorHandler(cb) {
  window.addEventListener('error', showsErrorNotification);

  try {
    cb();
  } catch (error) {
    showsErrorNotification();
  }
}
