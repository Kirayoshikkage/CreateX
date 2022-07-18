import addsElementsEventKeydown from './addsElementsEventKeydown';

export default function addsCardsProjectRouting() {
  addsElementsEventKeydown(
    document.querySelectorAll('.card-project'),
    'Enter',
    (currentTarget) => {
      const link = currentTarget.querySelector('.card-project__button');
      const linkHref = link.getAttribute('href');

      window.location.href = linkHref;
    },
  );
}
