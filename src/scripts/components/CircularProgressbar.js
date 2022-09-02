export default class CircularProgressbar {
  constructor({
    container = null,
    progress = 0,
    isPercent = true,
    to = 100,
    showPercent = true,
  } = {}) {
    this._container = document.querySelector(container);

    this._startingProgress = +progress;
    this._to = +to;

    this._isPercent = Boolean(isPercent);
    this._showPercent = Boolean(showPercent);

    this._lineProgress = this._container?.querySelector(
      '.circle-progressbar__line-progress',
    );
    this._progressDisplayField = this._container?.querySelector(
      '.circle-progressbar__value',
    );

    this._radius = this._lineProgress?.getAttribute('r');
    this._circleLength = 2 * Math.PI * this._radius;
  }

  _progress = {
    percent: 0,
    value: 0,
  };

  getProgress() {
    return this._progress;
  }

  init() {
    this._throwsErrors();

    this._setsAttrDasharrayLineProgress();

    this._writesValuesInFieldProgress(this._startingProgress);

    this._displaysProgress();
  }

  _throwsErrors() {
    if (!this._container) throw new Error('Container incorrect');
  }

  _setsAttrDasharrayLineProgress() {
    this._lineProgress.setAttribute('stroke-dasharray', this._circleLength);
  }

  _writesValuesInFieldProgress(progress = null) {
    if (!progress) throw new Error('Value not passed');

    const { percent, value } = this._calculatesValuesProgress(progress);

    this._progress.percent = percent;

    this._progress.value = value;
  }

  _calculatesValuesProgress(value) {
    if (!value) throw new Error('Value not passed');

    if (typeof value !== 'string' && typeof value !== 'number') { throw new Error('The passed value has the wrong type'); }

    const progress = +value;

    if (this._isPercent) {
      return {
        percent: progress,
        value: Math.round((this._to / 100) * progress),
      };
    }

    return {
      percent: Math.round((100 * progress) / this._to),
      value: progress,
    };
  }

  _displaysProgress() {
    this._setsAttrDashoffsetLineProgress();

    this._displaysProgressInTextField();
  }

  _setsAttrDashoffsetLineProgress() {
    this._lineProgress.setAttribute(
      'stroke-dashoffset',
      this._circleLength - (this._circleLength * this._progress.percent) / 100,
    );
  }

  _displaysProgressInTextField() {
    const { percent, value } = this._progress;

    this._progressDisplayField.textContent = this._showPercent
      ? `${percent}%`
      : value;
  }

  updatesProgress(progress = null) {
    if (!progress) throw new Error('Value not passed');

    this._writesValuesInFieldProgress(progress);

    this._displaysProgress();
  }
}
