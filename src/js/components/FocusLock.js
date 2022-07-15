export default class FocusLock {
  constructor(exception = false) {
    this._exception = exception;
  }

  _listElementsToBlock = new Set();

  _listChecksToBlock = [
    this._checkingForFocus,
    this._checkingForException.bind(this),
  ];

  blocksFocus() {
    for (let element of this._listElementsToBlock) {
      element.setAttribute("tabindex", -1);
    }
  }

  unblocksFocus() {
    for (let element of this._listElementsToBlock) {
      element.setAttribute("tabindex", 0);
    }
  }

  init() {
    this._throwsErrors();

    setTimeout(() => {
      this._populatesTheListElementsToBlock(
        document.body.querySelectorAll("*")
      );
    }, 0);

    this._addsMutationObserverForBody();
  }

  _throwsErrors() {
    if (
      this._exception &&
      !Array.isArray(this._exception) &&
      typeof this._exception !== "string"
    ) {
      throw new Error("Exception wrong type");
    }
  }

  _populatesTheListElementsToBlock(listElements) {
    listElements.forEach((element) => this._addsElementToBlockList(element));
  }

  _removesElementsFromBlockList(listElements) {
    listElements.forEach((element) =>
      this._listElementsToBlock.delete(element)
    );
  }

  _addsElementToBlockList(element) {
    if (this._checksOneElement(element)) {
      this._listElementsToBlock.add(element);
    }
  }

  _checksOneElement(element) {
    return this._listChecksToBlock.every((func) => func(element));
  }

  _checkingForFocus(element) {
    return element.tabIndex === 0;
  }

  _checkingForException(element) {
    if (!this._exception) {
      return true;
    }

    if (!Array.isArray(this._exception)) {
      return !element.closest(this._exception);
    }

    for (let exception of this._exception) {
      if (element.closest(exception)) {
        return false;
      }
    }

    return true;
  }

  _addsMutationObserverForBody() {
    const observer = new MutationObserver(
      this._handlesMutationObserver.bind(this)
    ).observe(document.body, {
      childList: true,
      subtree: true,
      characterData: false,
    });
  }

  _handlesMutationObserver(listMutation) {
    for (let mutation of listMutation) {
      const { addedNodes, removedNodes } = mutation;
      const filteredAddedNodes = this._filtersElementsFromNodes(addedNodes);
      const filteredRemoveNodes = this._filtersElementsFromNodes(removedNodes);

      this._populatesTheListElementsToBlock(filteredAddedNodes);

      this._removesElementsFromBlockList(filteredRemoveNodes);
    }
  }

  _filtersElementsFromNodes(nodes) {
    return Array.from(nodes).filter((node) => node.nodeType === 1);
  }
}
