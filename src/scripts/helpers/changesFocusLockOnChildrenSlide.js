export default function changesFocusLockOnChildrenSlide(swiper, selector) {
  const elements = document.querySelectorAll(`${selector} .swiper-wrapper *`);
  // eslint-disable-next-line eqeqeq
  const focusableElements = Array.from(elements).filter((element) => element.tabIndex == 0);

  function changesFocusLock() {
    focusableElements.forEach((element) => {
      if (element.closest('.swiper-slide-visible')) {
        element.setAttribute('tabindex', 0);

        return;
      }

      element.setAttribute('tabindex', -1);
    });
  }

  changesFocusLock();

  swiper.on('slideChange', () => {
    changesFocusLock();
  });
}
