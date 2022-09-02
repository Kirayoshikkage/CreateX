export default class Tabs {
  constructor(container, {
    initialTab,
    animation,
  } = {}) {
    this._container = document.querySelector(container);
    this._triggerContainer = this._container.querySelector('.tabs__triggers');
    this._triggers = this._container.querySelectorAll('.tabs__trigger');
    this._body = this._container.querySelector('.tabs__body');
    this._emptyMessage = this._container.querySelector('.tabs__empty-message');

    this._initialTab = initialTab ?? this._triggers[0].dataset.tab;

    this._animation = animation;
  }

  _activeTab;

  _activeTrigger;

  _listEventListener = {
    tabSwitching: [],
    showed: [],
    hiding: [],
    _test: [],
  };

  init() {
    this._switchesTabs(this._initialTab);

    this._setsEventListenersTriggers();
  }

  _switchesTabs(tab) {
    this._removesClassActivityAtTrigger();

    this._activeTab = tab;

    this._activeTrigger = this._getActiveTrigger();

    this._addsClassAсtivityTrigger();

    this._changesVisibilityTabContent();

    this._showsMessageIfTabIsEmpty();

    this._dispatchEvent('tabSwitching');
  }

  _removesClassActivityAtTrigger() {
    this._activeTrigger?.classList.remove('tabs__trigger_active');
  }

  _getActiveTrigger() {
    return this._triggerContainer.querySelector(`[data-tab=${this._activeTab}]`);
  }

  _addsClassAсtivityTrigger() {
    this._activeTrigger?.classList.add('tabs__trigger_active');
  }

  _changesVisibilityTabContent() {
    this._iteratesOnContentTabs((content) => {
      const { tab } = content.dataset;

      if (this._activeTab === tab || this._activeTab === 'all') {
        this._setsStyleVisibility(content);

        return;
      }

      this._setsStyleHidding(content);
    });
  }

  _iteratesOnContentTabs(cb) {
    this._container.querySelectorAll('.tabs__content')?.forEach((content, index) => {
      cb(content, index);
    });
  }

  _setsStyleVisibility(content) {
    if (this._animation) {
      this._animation.setsStyleVisibility(content);
    } else {
      // eslint-disable-next-line no-param-reassign
      content.style.display = 'block';
    }

    this._dispatchEvent('showed', content);
  }

  _setsStyleHidding(content) {
    if (this._animation) {
      this._animation.setsStyleHidding(content);
    } else {
      // eslint-disable-next-line no-param-reassign
      content.style.display = 'none';
    }

    this._dispatchEvent('hiding', content);
  }

  _showsMessageIfTabIsEmpty() {
    if (this._tabIsEmpty()) {
      this._setsStyleVisibility(this._emptyMessage);

      return;
    }

    this._setsStyleHidding(this._emptyMessage);
  }

  _tabIsEmpty() {
    if (this._activeTab === 'all') {
      return false;
    }

    return !this._body.querySelector(`[data-tab=${this._activeTab}]`);
  }

  _setsEventListenersTriggers() {
    this._triggers.forEach((trigger) => {
      trigger.addEventListener('pointerup', (e) => {
        this._switchesTabs(this._getTabDatasetOnEvent(e));
      });

      trigger.addEventListener('keydown', (e) => {
        if (e.code !== 'Enter') return;

        this._switchesTabs(this._getTabDatasetOnEvent(e));
      });
    });
  }

  _getTabDatasetOnEvent(e) {
    return e.target.closest('[data-tab]')?.dataset.tab;
  }

  _dispatchEvent(event, ...args) {
    this._listEventListener[event].forEach((func) => func(args));
  }

  on(event, cb) {
    this._listEventListener[event].push(cb);
  }
}
