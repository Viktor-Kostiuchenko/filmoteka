import { refs } from '../refs/refs';
import { setToLocalStorage, getFromLocalStorage} from './local-storage';
import { setGenresToLocalStorage } from './genre-local-storage';
import headerLng from '../../data/header.json'
import mainLng from '../../data/main.json'
import { renderFromStorageArray } from './render-storage-array';
import { onFetchAllMovies } from './week-movies';

const { select, filmsEl, queueBtn, watchedBtn } = refs;

select.addEventListener('change', changeLanguage);

export function changeLanguage() {
  const isFilms = !filmsEl.classList.contains('visually-hidden')
  const isQueue = queueBtn.classList.contains('header__item-btn--active')
  const isWatched = watchedBtn.classList.contains('header__item-btn--active')

  let lang = select.value;
  setToLocalStorage('lang', lang)

  setHeaderData(lang)
  setGenresToLocalStorage()

  if(isFilms) {
    onFetchAllMovies(1)
  } else if(isQueue) {
    renderFromStorageArray('queue')
  } else if(isWatched) {
    renderFromStorageArray('watched')
  }

}

let langLS = getFromLocalStorage('lang')
if (langLS === 'uk') {
  setHeaderData('uk')
  setGenresToLocalStorage()
}

if (langLS === 'ru') {
  setHeaderData('ru')
}
  

export function changeModalLanguage() {
    const watchedBtn = document.querySelector('.lng-modal-watched')
    const queueBtn = document.querySelector('.lng-modal-queue')
    const popularity = document.querySelector('.lng-modal-popularity')
    const genres = document.querySelector('.lng-modal-genres')
    const votes = document.querySelector('.lng-modal-votes')
    const title = document.querySelector('.lng-modal-title')
    const about = document.querySelector('.lng-modal-about')

  switch (select.value) {
    case "ru":
      watchedBtn.textContent = `${mainLng.modalWatched.ru}`;
      queueBtn.textContent = `${mainLng.modalQueue.ru}`;
      popularity.textContent = `${mainLng.popularity.ru}`;
      genres.textContent = `${mainLng.genres.ru}`;
      votes.textContent = `${mainLng.votes.ru}`;
      title.textContent = `${mainLng.title.ru}`;
      about.textContent = `${mainLng.about.ru}`;
      break;
    case "uk":
      watchedBtn.textContent = `${mainLng.modalWatched.uk}`;
      queueBtn.textContent = `${mainLng.modalQueue.uk}`;
      popularity.textContent = `${mainLng.popularity.uk}`;
      genres.textContent = `${mainLng.genres.uk}`;
      votes.textContent = `${mainLng.votes.uk}`;
      title.textContent = `${mainLng.title.uk}`;
      about.textContent = `${mainLng.about.uk}`;
      break
  }
}

function setHeaderData(lang) {
  for (let key in headerLng) {
    document.querySelector('.lng-' + key).textContent = `${headerLng[key][`${lang}`]}`;
  }
  document.querySelector('.lng-year').placeholder = `${mainLng.yearInput[`${lang}`]}`;
  document.querySelector('.lng-input').placeholder = `${mainLng.mainInput[`${lang}`]}`;
  document.querySelector(`.change-lng__item--${ lang }`).setAttribute('selected', ' ')
}
