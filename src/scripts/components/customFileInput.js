export default function customFileInput() {
  const containersFileInput = document.querySelectorAll('.custom-file');

  containersFileInput.forEach((container) => {
    const fileInput = container.querySelector('.custom-file__input');
    const textField = container.querySelector('.custom-file__text');

    fileInput.addEventListener('change', (event) => {
      const { files } = event.target;
      const filesLength = files.length;

      // eslint-disable-next-line eqeqeq
      if (filesLength == 1) {
        textField.textContent = files[0].name;

        return;
      }

      textField.textContent = `${filesLength} files`;
    });
  });
}
