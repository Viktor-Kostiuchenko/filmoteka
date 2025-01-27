import { refs } from '../refs/refs';
import { renderFromStorageArray } from './render-storage-array';
import { onFetchAllMovies } from './week-movies';

const {
  headerNav,
  headerBtn,
  libraryBtn,
  queueBtn,
  watchedBtn,
  header,
  headerSearcherEl,
  homeBtn,
  paginationList,
  emptyListImg,
  library,
  filmsEl
} = refs;

headerNav.addEventListener('click', changeHeader);
headerBtn.addEventListener('click', changeActiveHeaderBtn);

function changeHeader(e) {
  switch (e.srcElement.dataset.action) {
    case 'library':
      choseActiveEl(queueBtn, watchedBtn, 'header__item-btn--active');
      selectLibraryBtn();
      renderFromStorageArray('queue')
      paginationList.classList.add('visually-hidden');
      library.classList.remove('visually-hidden');
      filmsEl.classList.add('visually-hidden');
      break;
    case 'home':
      selectHomeBtn();
      onFetchAllMovies(1);
      paginationList.classList.remove('visually-hidden');
      emptyListImg.classList.add('visually-hidden');
      library.classList.add('visually-hidden');
      filmsEl.classList.remove('visually-hidden');
      break;
  }
}

function changeActiveHeaderBtn(e) {
  switch (e.srcElement.dataset.action) {
    case 'watched':
      choseActiveEl(watchedBtn, queueBtn, 'header__item-btn--active');
      break;
    case 'queue':
      choseActiveEl(queueBtn, watchedBtn, 'header__item-btn--active');
      break;
  }
}

function selectLibraryBtn() {
  header.classList.replace('header__main-bckg', 'header__secondary-bckg');
  choseActiveEl(libraryBtn, homeBtn, 'header__nav-item--active');
  choseActiveEl(headerSearcherEl, headerBtn, 'visually-hidden');
}

function selectHomeBtn() {
  header.classList.replace('header__secondary-bckg', 'header__main-bckg');
  choseActiveEl(headerBtn, headerSearcherEl, 'visually-hidden');
  choseActiveEl(homeBtn, libraryBtn, 'header__nav-item--active');
}

function choseActiveEl(activate, deactivate, condition) {
  activate.classList.add(condition);
  deactivate.classList.remove(condition);
}
