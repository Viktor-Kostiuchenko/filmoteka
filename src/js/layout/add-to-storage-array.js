import { setToLocalStorage } from './local-storage';
import { getFromLocalStorage } from './local-storage';
import { showNotify } from '../components/notifications';
import { createInnerMarkup } from './render-by-template';
import cardTemplate from '../../partial/templates/film-cards.hbs';
import { fetchById } from './fetch-by-Id';
import { refs } from '../refs/refs';

export const addToStorageArray = (keyName, property) => e => {
  const propCondition = !e.target.dataset.hasOwnProperty(property) ||
  e.target.dataset.hasOwnProperty(property) == undefined
  
  if (propCondition) {
      return;
    }

  const id = e.target.dataset.id;
  const lang = getFromLocalStorage('lang')

  if (!localStorage.getItem(keyName)) {
      const contentToAdd = [];
      contentToAdd.push(id);
      clearFromArrayBtnText(lang, keyName, e)
      showNotify('success', 'Added to List');
      setToLocalStorage(keyName, contentToAdd);
      if (keyName === 'watched') {
        clearWactedFromQueue();
      }
  } else {
      const storageArray = getFromLocalStorage(keyName);
      if (storageArray.includes(id)) {
        const index = storageArray.indexOf(id)
        const deleted = storageArray.splice(index, 1);
        
        let filmArray = [];
        if (filmArray.length === 0) {
          refs.library.innerHTML = ''
        }
      
        storageArray.map(film =>
          fetchById(film).then(result => {
            result.release_date = result.release_date.slice(0, 4);
            filmArray.push(result);
            createInnerMarkup(refs.library, cardTemplate(filmArray))
          }));

          addToArrayBtnText(lang, keyName, e)
          showNotify('warning', 'deleted')
          setToLocalStorage(`${keyName}`, storageArray);

      } else {
        clearWactedFromQueue();
        storageArray.push(id);
        clearFromArrayBtnText(lang, keyName, e)
        showNotify('success', 'Added to List');
        setToLocalStorage(`${keyName}`, storageArray);
      }
    }
}

function clearWactedFromQueue(id) {
  try {
    const parsedArray = JSON.parse(localStorage.getItem('queue'));
    const index = parsedArray.indexOf(id, 0);
    parsedArray.splice(index, 1);
    setToLocalStorage('queue', parsedArray);
  } catch (error) {}
}


function clearFromArrayBtnText(lang, keyName, e) {
  if (lang === 'uk') {
    if(keyName === 'watched') {
      e.target.textContent = `видалити з переглянутих`
    } else {
      e.target.textContent = `видалити з черги`
    }
  }
  if (lang === 'ru') {
    if(keyName === 'watched') {
      e.target.textContent = `удалить из просмотренных`
    } else {
      e.target.textContent = `удалить из очереди`
    }
  }
  if (lang === 'en') {
    e.target.textContent = `delete from ${keyName}`
  }
}


function addToArrayBtnText(lang, keyName, e) {
  if (lang === 'uk') {
    if(keyName === 'watched') {

      e.target.textContent = `переглянуто`
    } else {
      e.target.textContent = `в чергу`
    }
  }
  if (lang === 'ru') {
    if(keyName === 'watched') {
      e.target.textContent = `просмотренные`
    } else {
      e.target.textContent = `в очередь`
    }
  }
  if (lang === 'en') {
    e.target.textContent = `add to ${keyName}`
  }
}