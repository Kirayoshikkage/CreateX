export default function addsElementsEventKeydown(
  elements = null,
  keyButton = null,
  cb = null,
) {
  if (!elements || !keyButton || !cb) { throw new Error('Invalid number of arguments passed'); }

  elements.forEach((element) => {
    element.addEventListener('keydown', (e) => {
      if (e.key === keyButton && e.target === e.currentTarget) {
        cb(e.currentTarget);
      }
    });
  });
}
