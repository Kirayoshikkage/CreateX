import forAllPage from './pages/forAllPages';
import index from './pages/index';
import interiorDesign from './pages/interior-design';
import ourWork from './pages/our-work';
import project from './pages/project';
import aboutUs from './pages/about-us';
import availablePositions from './pages/available-positions';
import showsErrorNotification from './helpers/showsErrorNotification';

const { page } = document.body.dataset;

function app() {
  forAllPage();

  if (page === 'index') {
    index();
  } else if (page === 'interior-design') {
    interiorDesign();
  } else if (page === 'our-work') {
    ourWork();
  } else if (page === 'project') {
    project();
  } else if (page === 'about-us') {
    aboutUs();
  } else if (page === 'available-positions') {
    availablePositions();
  }
}

try {
  app();
} catch (error) {
  showsErrorNotification();

  console.log(error);
}
