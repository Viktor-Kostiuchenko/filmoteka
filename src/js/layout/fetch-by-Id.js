import { getApiData } from '../api/api-service.js';
import { createInnerMarkup } from './render-by-template';
import { changeModalLanguage } from './language.js';
import makeModalFilm from '../../partial/templates/modal-film.hbs';
import { openModalWindow } from '../components/modal.js';
import { refs } from '../refs/refs.js';
import { addToStorageArray } from './add-to-storage-array';
import { openVideo } from '../components/video-player';
import { getFromLocalStorage, setToLocalStorage } from './local-storage.js';


const { filmsEl, modal, backdrop, library } = refs;

// --------- func for search by ID -------------
export function fetchById(id) {
  let query = `/movie/${id}?`;
  return getApiData(query);
}

filmsEl.addEventListener('click', onCardClick);
library.addEventListener('click', onCardClick);

//---------click tracking function----------------
function onCardClick(e) {
  switch (e.srcElement.className) {
    case 'film__trailer':
      openVideo(getId(e));
      break;
    case 'film__trailer-img':
      openVideo(getId(e));
      break;
    case 'films':
      break;
    default:
      openModalCard(getId(e));
  }
}

//-----------getting an ID card------------------------
function getId(e) {
  if (e.target.nodeName === 'UL') {
    return
  }
  return e.target.closest('.films__item').dataset.id;
}
//---------opening a modal window---------------------
function openModalCard(filmId) {
  fetchById(filmId).then(result => {
    result.popularity = result.popularity.toFixed(2);
    const modalContent = makeModalFilm(result);
    createInnerMarkup(modal, modalContent);

    const addToQueueBtn = document.querySelector('[data-queue]');
    const addToWatchedBtn = document.querySelector('[data-watched]');
    addToQueueBtn.addEventListener('click', addToStorageArray('queue', 'queue'));
    addToWatchedBtn.addEventListener('click', addToStorageArray('watched', 'watched'));

    openModalWindow(backdrop);
    changeModalLanguage();

    setTxtToQueueBtn(addToQueueBtn, filmId)
    setTxtToWatchedBtn(addToWatchedBtn, filmId)

  });
}

function setTxtToQueueBtn(btn, filmId) {
  const queue = getFromLocalStorage('queue')
  const lang = getFromLocalStorage('lang')
  let inQueue = false
  if(queue) {
    inQueue = queue.some(el => el === filmId)
  }
  if(inQueue) {
    switch (lang) {
      case 'uk':
        btn.textContent = `видалити з черги`
        break;
      case 'ru':
        btn.textContent = `удалить из очереди`
        break;
      case 'en':
        btn.textContent = `delete from queue`
        break;
      default:
        break;
    }
  }
}

function setTxtToWatchedBtn(btn, filmId) {
  const watched = getFromLocalStorage('watched')
  const lang = getFromLocalStorage('lang')
  let inWatched = false
  if (watched) {
    inWatched = watched.some(el => el === filmId)
  }
  if(inWatched) {
    switch (lang) {
      case 'uk':
        btn.textContent = `видалити з переглянутих`
        break;
      case 'ru':
        btn.textContent = `удалить из просмотренных`
        break;
      case 'en':
        btn.textContent = `delete from watched`
        break;
      default:
        break;
    }
  }
}