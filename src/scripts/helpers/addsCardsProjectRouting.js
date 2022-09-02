import addsElementsEventKeydown from './addsElementsEventKeydown.js';

export default function addsCardsProjectRouting() {
  addsElementsEventKeydown(
    document.querySelectorAll('.card-project'),
    'Enter',
    (currentTarget) => {
      const link = currentTarget.querySelector('.button');
      const linkHref = link.getAttribute('href');

      window.location.href = linkHref;
    },
  );
}
