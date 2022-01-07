import { setToLocalStorage } from './local-storage';
import { getFromLocalStorage } from './local-storage';
import { showNotify } from '../components/notifications';

import { createInnerMarkup } from './render-by-template';
import cardTemplate from '../../partial/templates/film-cards.hbs';
import { fetchById } from './fetch-by-Id';
import { refs } from '../refs/refs';

export function addToStorageArray(keyName, property) {
  return function closureFunc(e) {

    if (
      !e.target.dataset.hasOwnProperty(property) ||
      e.target.dataset.hasOwnProperty(property) == undefined
      ) {
        return;
      }
      const id = e.target.dataset.id;
      const lang = getFromLocalStorage('lang')

      switch (!localStorage.getItem(keyName)) {
        case true:
          const contentToAdd = [];
          contentToAdd.push(id);
          
          if (lang === 'uk') {
            if(keyName === 'watched') {
              e.currentTarget.textContent = `видалити з переглянутих`
            } else {
              e.currentTarget.textContent = `видалити з черги`
            }
          }
          if (lang === 'ru') {
            if(keyName === 'watched') {
              e.currentTarget.textContent = `удалить из просмотренных`
            } else {
              e.currentTarget.textContent = `удалить из очереди`
            }
          }
          if (lang === 'en') {
            e.currentTarget.textContent = `delete from ${keyName}`
          }

          showNotify('success', 'Added to List');
          setToLocalStorage(keyName, contentToAdd);
          if (keyName === 'watched') {
            clearWactedFromQueue();
          }
          break;


        case false:
          const storageArray = getFromLocalStorage(keyName);
          if (storageArray.includes(id)) {
            const index = storageArray.indexOf(id)
            const deleted = storageArray.splice(index, 1);
            
            let filmArray = [];
            if (filmArray = []) {
              refs.library.innerHTML = ''
            }
          
            storageArray.map(film =>
              fetchById(film).then(result => {
                result.release_date = result.release_date.slice(0, 4);
                filmArray.push(result);
                createInnerMarkup(refs.library, cardTemplate(filmArray))
              }));

              if (lang === 'uk') {
                if(keyName === 'watched') {
                  e.currentTarget.textContent = `переглянуто`
                } else {
                  e.currentTarget.textContent = `в чергу`
                }
              }
              if (lang === 'ru') {
                if(keyName === 'watched') {
                  e.currentTarget.textContent = `просмотренные`
                } else {
                  e.currentTarget.textContent = `в очередь`
                }
              }
              if (lang === 'en') {
                e.currentTarget.textContent = `add to ${keyName}`
              }
              showNotify('warning', 'deleted')
              setToLocalStorage(`${keyName}`, storageArray);

          } else {
            clearWactedFromQueue();
            storageArray.push(id);
            if (lang === 'uk') {
              if(keyName === 'watched') {
                e.currentTarget.textContent = `видалити з переглянутих`
              } else {
                e.currentTarget.textContent = `видалити з черги`
              }
            }
            if (lang === 'ru') {
              if(keyName === 'watched') {
                e.currentTarget.textContent = `удалить из просмотренных`
              } else {
                e.currentTarget.textContent = `удалить из очереди`
              }
            }
            if (lang === 'en') {
              e.currentTarget.textContent = `delete from ${keyName}`
            }
            showNotify('success', 'Added to List');
            setToLocalStorage(`${keyName}`, storageArray);
          }
    }
  };
}

function clearWactedFromQueue(id) {
  try {
    const parsedArray = JSON.parse(localStorage.getItem('queue'));
    const index = parsedArray.indexOf(id, 0);
    parsedArray.splice(index, 1);
    setToLocalStorage('queue', parsedArray);
  } catch (error) {}
}
