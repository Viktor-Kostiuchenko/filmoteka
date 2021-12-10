let loader = document.querySelector('.preloader')

window.onload = function () {

  loader.classList.add('loaded_hiding');
  window.setTimeout(function () {
    loader.classList.remove('loaded_hiding');
    loader.classList.add('loaded');
  }, 500);
}

