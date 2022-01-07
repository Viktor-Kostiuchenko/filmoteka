let loader = document.querySelector('.preloader')

window.onload = function () {

  window.setTimeout(function () {
    loader.classList.add('loaded_hiding');
  }, 3000);

  window.setTimeout(function () {
    loader.classList.add('loaded');
  }, 4000);
}

