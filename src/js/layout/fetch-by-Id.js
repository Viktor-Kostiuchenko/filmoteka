import { getApiData } from '../api/api-service.js';
import { createInnerMarkup } from './render-by-template';
import { changeModalLanguage } from './language.js';
import makeModalFilm from '../../partial/templates/modal-film.hbs';
import { openModalWindow } from '../components/modal.js';
import { refs } from '../refs/refs.js';
import { addToStorageArray } from './add-to-storage-array';
import { openVideo } from '../components/video-player';
import { getFromLocalStorage } from './local-storage.js';


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

    const lang = getFromLocalStorage('lang')
    const inQueue = getFromLocalStorage('queue').find(el => el === filmId)
    const inWatched = getFromLocalStorage('watched').find(el => el === filmId)
    const addToQueueBtn = document.querySelector('[data-queue]');
    const addToWatchedBtn = document.querySelector('[data-watched]');

    openModalWindow(backdrop);
    changeModalLanguage();

    if(inQueue) {
      switch (lang) {
        case 'uk':
          addToQueueBtn.textContent = `видалити з черги`
          break;
        case 'ru':
          addToQueueBtn.textContent = `удалить из очереди`
          break;
        case 'en':
          addToQueueBtn.textContent = `delete from queue`
          break;
        default:
          break;
      }
    }
    if(inWatched) {
      switch (lang) {
        case 'uk':
          addToWatchedBtn.textContent = `видалити з переглянутих`
          break;
        case 'ru':
          addToWatchedBtn.textContent = `удалить из просмотренных`
          break;
        case 'en':
          addToWatchedBtn.textContent = `delete from watched`
          break;
        default:
          break;
      }
    }

    addToQueueBtn.addEventListener('click', addToStorageArray('queue', 'queue'));
    addToWatchedBtn.addEventListener('click', addToStorageArray('watched', 'watched'));

  });
}
