import { renderImages } from './render-main-list';

document.addEventListener('load', onFetchAllMovies());

export function onFetchAllMovies() {
  const searchQuery = `/trending/movie/week?`;
  renderImages(searchQuery);
}