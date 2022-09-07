import Alert from '../../scripts/components/Alert.js';

const alert = new Alert({
  container: '.alert',
  trigger: '.trigger',
  body: '.alert__body',
});

alert.init();
