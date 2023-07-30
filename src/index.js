import { PixabayApi } from "./js/PixabayApi";
import onSearchRender from "./js/onSearchRender";
import { refs } from "./js/refs";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
import { Spinner } from 'spin.js';
// refs.spin.hidden = true;

const pixabay = new PixabayApi();
const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});
const options = {
  root: null,
  rootMargin: '100px',
  threshold: 1.0,
};

const opts = {
  lines: 20, // The number of lines to draw
  length: 20, // The length of each line
  width: 6, // The line thickness
  radius: 6, // The radius of the inner circle
  scale: 1, // Scales overall size of the spinner
  corners: 1, // Corner roundness (0..1)
  speed: 0.75, // Rounds per second
  rotate: 0, // The rotation offset
  animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#fc8a11', // CSS color or array of colors
  fadeColor: 'transparent', // CSS color or array of colors
  
  shadow: '0 0 1px transparent', // Box-shadow for the lines
  zIndex: 2000000000, // The z-index (defaults to 2e9)
  className: 'spinner', // The CSS class to assign to the spinner
 };
new Spinner(opts).spin(refs.spin);

refs.form.addEventListener('submit', onFormSubmit);

async function onLoadMoreImages(entries, observer) {
    entries.forEach(async entry => {
        if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            pixabay.incrementPage();
            const { hits } = await pixabay.fetchImages();
            const markup = onSearchRender(hits);
            refs.gallery.insertAdjacentHTML('beforeend', markup);
            const lastItem = document.querySelector('.gallery .link:last-child');
            observer.observe(lastItem);
            lightbox.refresh();
        }
    }
    )
}

const observer = new IntersectionObserver(onLoadMoreImages, options);

async function onFormSubmit(event) {
    event.preventDefault();
    pageReset();
    const {value} = event.currentTarget.elements.searchQuery
    pixabay.setQuery(value);
    const {hits, totalHits} = await pixabay.fetchImages();
    console.log(totalHits);
    const markup = onSearchRender(hits);
    refs.gallery.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
      const lastItem = document.querySelector('.gallery .link:last-child');
          observer.observe(lastItem);
}

function pageReset () {
    refs.gallery.innerHTML = '';
    pixabay.resetPage();
    }