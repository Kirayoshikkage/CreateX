export default function insertsErrorNotificationInHTML() {
  const modal = `
    <div class="modal error-notification">
      <div class="modal__body error-notification__body">
        <div class="modal__content error-notification__content">
          <p class="error-notification__text">Произошла ошибка, перезагрузите страницу!</p>
          <button class="btn-reset modal__close" type="button">
            <svg class="modal__icon">
              <use xlink:href="img/sprite.svg#close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modal);
}
