import axios from "axios";
// Dokümantasyonda belirtilen import
import iziToast from "izitoast";
// Stil importu
import "izitoast/dist/css/iziToast.min.css";
// Dokümantasyonda belirtilen import
import SimpleLightbox from "simplelightbox";
// Stil importu
import "simplelightbox/dist/simple-lightbox.min.css";


// my API key : 49373653-d22f76e72713087fcf9bb4de1
axios.defaults.baseURL = 'https://pixabay.com/api/';

const form = document.querySelector(".app-form");
const gallery = document.querySelector(".gallery");
const btnContainer = document.querySelector('.btn-container');
const btn = document.querySelector('.btn');

const postsPerPage = 10;
let currentPage = 1;
let totalData = 100;
const totalPages = Math.ceil(totalData / postsPerPage); // 100 = datadaki veri sayısı { res.data.length }


const searchValue = form.elements.search.value;
const fetchData = async () => await axios.get('https://pixabay.com/api/', {
    params: {
        key: '49373653-d22f76e72713087fcf9bb4de1',
        q: searchValue,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
    },
})
    .then((response) => {
        console.log(response.data.hits.length);
        const images = response.data.hits;
        if (images.length === 0) {
            iziToast.error({
                title: "Error",
                message: "Sorry, there are no images matching your search query. Please try again!",
                position: "topRight",
            });
        } else {
            images.forEach(img => {
                console.log(img);
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
            const lightbox = new SimpleLightbox(".gallery a", {

            });
            lightbox.refresh();
        }
    })
    .catch((error) => {
        console.error(error);
    });

form.addEventListener("submit", (e) => {

    e.preventDefault(); // Prevent the default form submission. formun default davranışını engelle
    gallery.innerHTML = ""; // Clear the gallery before adding new images. her submitte galeriyi temizle

    const searchValue = form.elements.search.value;
    console.log(searchValue);
    fetchData();
});

btn.addEventListener('click', fetchData);