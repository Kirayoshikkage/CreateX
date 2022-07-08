// Создание круговых прогрессбаров

const createsCircularProgressbar = function (selectors) {
  const progressbarCircles = document.querySelectorAll(selectors);

  progressbarCircles.forEach((circle) => {
    const progress = circle.querySelector('.progressbar__progress');
    const textValue = circle.querySelector('.progressbar__value');
    const radius = progress.getAttribute('r');
    const circleLength = 2 * Math.PI * radius;
    const { full, value, percent } = circle.dataset;
    let percentageProgress;

    if (circle.dataset.percentage === 'true') {
      percentageProgress = Math.floor(percent);
      textValue.textContent = `${percent}%`;
    } else {
      percentageProgress = Math.floor((value / full) * 100);
      textValue.textContent = value;
    }

    progress.setAttribute('stroke-dasharray', circleLength);
    progress.setAttribute(
      'stroke-dashoffset',
      circleLength - (circleLength * percentageProgress) / 100,
    );
  });
};

export default createsCircularProgressbar;
