import DropDownAnimation from '../../scripts/components/DropDownAnimation.js';

const sut = new DropDownAnimation();
const test = document.querySelector('.test');
const testTrigger = test.querySelector('.test__trigger');
let flag = false;

testTrigger.addEventListener('pointerup', () => {
  if (!flag) {
    sut.setsStyleVisibility(test);

    flag = true;

    return;
  }

  sut.setsStyleHiding(test);

  flag = false;
});
