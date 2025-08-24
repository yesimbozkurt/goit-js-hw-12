import axios from "axios";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// my API key : 49373653-d22f76e72713087fcf9bb4de1
axios.defaults.baseURL = 'https://pixabay.com/api/';


const form = document.querySelector(".app-form");
const gallery = document.querySelector(".gallery");
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

const lightbox = new SimpleLightbox('.gallery a', { /* options */ });
const postsPerPage = 10;
let currentPage = 1;


const fetchData = async () => {
    gallery.innerHTML = "";
    const searchValue = form.elements.search.value;
    console.log(searchValue);
    const response = await axios.get('https://pixabay.com/api/', {
        params: {
            key: '49373653-d22f76e72713087fcf9bb4de1',
            q: searchValue,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            page: currentPage,
            per_page: postsPerPage,
        },
    })
        .then((response) => {
            const images = response.data.hits;
            console.log(images.length);
            const totalHits = response.data.totalHits;
            if (images.length === 0) {
                iziToast.error({
                    title: "Error",
                    message: "Sorry, there are no images matching your search query. Please try again!",
                    position: "topRight",
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
        .catch((error) => {
            console.error(error);
        });
};
form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetchData();
    form.elements.search.value = "";
});

const updateButtons = (totalHits) => {
    const totalPages = Math.ceil(totalHits / postsPerPage);
    btnNext.style.display = currentPage < totalPages ? 'block' : 'none';
    btnPrev.style.display = currentPage > 1 ? 'block' : 'none';
};
btnNext.addEventListener('click', () => {
    currentPage++;
    fetchData();
});

btnPrev.addEventListener('click', () => {
    currentPage--;
    fetchData();
});
