import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// my API key : 49373653-d22f76e72713087fcf9bb4de1
axios.defaults.baseURL = 'https://pixabay.com/api/';

const form = document.querySelector('.app-form');
const gallery = document.querySelector('.gallery');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

const lightbox = new SimpleLightbox('.gallery a', {
  /* options */
});
const postsPerPage = 10;
let currentPage = 1;
let currentSearch = '';

const fetchData = async () => {
  // const searchValue = form.elements.search.value;
  // console.log(searchValue);

  if (!currentSearch) {
    iziToast.warning({
      title: 'Uyarı',
      message: 'Lütfen bir arama terimi girin.',
      position: 'topRight',
    });
    return;
  }
  const response = await axios
    .get('https://pixabay.com/api/', {
      params: {
        key: '49373653-d22f76e72713087fcf9bb4de1',
        q: currentSearch,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: currentPage,
        per_page: postsPerPage,
      },
    })
    .then(response => {
      const images = response.data.hits;
      console.log(images.length);
      const totalHits = response.data.totalHits;
      const totalPages = Math.ceil(totalHits / postsPerPage);
      console.log('Toplam Sayfa:', totalPages);
      console.log('Toplam Görüntüleme:', totalHits);
      if (images.length === 0) {
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
      } else {
        images.forEach(img => {
          // console.log(img);
          gallery.innerHTML += `
                    <li class="gallery-item">
                        <a href="${img.largeImageURL}" class="image">
                        <img src="${img.webformatURL}" width="360" height="200" alt="${img.tags}"/>
                        </a>
                        <div class="content">
                            <div class="info">
                                <h5 class="key">Likes</h5>
                                <p class="value">${img.likes}</p>
                            </div>
                            <div class="info">
                                <h5 class="key">Views</h5>
                                <p class="value">${img.views}</p>
                            </div>
                            <div class="info">
                                <h5 class="key">Comments</h5>
                                <p class="value">${img.comments}</p>
                            </div>
                            <div class="info">
                                <h5 class="key">Downloads</h5>
                                <p class="value">${img.downloads}</p>
                            </div>
                        </div>
                    </li>`;
        });

        lightbox.refresh();
        updateButtons(totalHits);
      }
    })
    .catch(error => {
      console.error(error);
    });
};
form.addEventListener('submit', e => {
  e.preventDefault();
  currentSearch = form.elements.search.value.trim();
  currentPage = 1; // her yeni aramada sayfa 1'e dön

  gallery.innerHTML = ''; // galeri içeriğini temizle

  fetchData();
  form.elements.search.value = '';
});

const updateButtons = totalHits => {
  const totalPages = Math.ceil(totalHits / postsPerPage);
  btnNext.style.display = currentPage < totalPages ? 'block' : 'none';
  btnPrev.style.display = currentPage > 1 ? 'block' : 'none';
};
btnNext.addEventListener('click', () => {
  if (!currentSearch) return;
  currentPage++;
  fetchData();
});

// btnPrev.addEventListener('click', () => {
//   if (!currentSearch || currentPage === 1) return;
//   currentPage--;
//   fetchData();
// });
