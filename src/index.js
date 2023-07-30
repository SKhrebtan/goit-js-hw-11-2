import { PixabayApi } from "./js/PixabayApi";
import onSearchRender from "./js/onSearchRender";
import { refs } from "./js/refs";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
import { Spinner } from 'spin.js';

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
  lines: 20, 
  length: 30, 
  width: 6, 
  radius: 6, 
  scale: 1, 
  corners: 1, 
  speed: 1.5, 
  rotate: 0, 
  animation: 'spinner-line-fade-quick', 
  direction: 1,
  color: 'black',
  fadeColor: 'transparent',
  shadow: '0 0 1px transparent', 
  zIndex: 2000000000,
  className: 'spinner',
};
new Spinner(opts).spin(refs.spin);
 window.onload = function() {
  refs.backdrop.classList.add('is-hidden');
}

refs.form.addEventListener('submit', onFormSubmit);

async function onLoadMoreImages(entries, observer) {
  entries.forEach(async entry => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      pixabay.incrementPage();
             
      try {
        refs.backdrop.classList.remove('is-hidden');
        const { hits, totalHits } = await pixabay.fetchImages();
        if (totalHits === 0) {
          Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
          return;
        }
        pixabay.setTotal(hits.length);
        const markup = await onSearchRender(hits);
        refs.backdrop.classList.add('is-hidden');
        refs.gallery.insertAdjacentHTML('beforeend', markup);
        lightbox.refresh();
        const lastItem = document.querySelector(
          '.gallery .link:last-child');
        observer.observe(lastItem);
        
        if (pixabay.getTotal() === totalHits || pixabay.getTotal() > totalHits) {
          observer.unobserve(lastItem);
          Notiflix.Notify.info('We are sorry, but you have reached the end of search results');
        }
      } catch (error) {
        Notiflix.Notify.warning('Щось пішло не так');
        console.log(error);
      } finally { refs.backdrop.classList.add('is-hidden'); }
    }
  })
};

const observer = new IntersectionObserver(onLoadMoreImages, options);

async function onFormSubmit(event) {
  event.preventDefault();
  
  const { value } = event.currentTarget.elements.searchQuery;
  pixabay.setQuery(value.toLowerCase().trim());
    
  if (pixabay.getQuery() === '') {
    Notiflix.Notify.info('Буляска уведіть запит');
    return;
  }
  
  try {
    refs.backdrop.classList.remove('is-hidden');
    const { hits, totalHits } = await pixabay.fetchImages();
      
    if (totalHits === 0) {
      Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      return;
    };
 pageReset();
    pixabay.setTotal(hits.length);
     Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    
   
    const markup = onSearchRender(hits);
    refs.backdrop.classList.add('is-hidden');
    refs.gallery.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh(); 
      const lastItem = document.querySelector('.gallery .link:last-child');
      observer.observe(lastItem);
      if (pixabay.getTotal() < 20) {
      observer.unobserve(lastItem);
      Notiflix.Notify.info('We are sorry, but you have reached the end of search results');
    };
  } catch (error) {
    Notiflix.Notify.warning('Щось пішло не так');
    console.log(error);
  } finally {
       refs.backdrop.classList.add('is-hidden');
  }
};     

function pageReset() {
  refs.btnToBottom.style.display = "none";
  refs.gallery.innerHTML = '';
  pixabay.resetPage();
  pixabay.resetTotal();
};