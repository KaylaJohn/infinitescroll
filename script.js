const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = '';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}Y&count=${count}`;

//check if all images load
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}

// create elements for links and photos, add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length
    //run function for each object in photosArray
    photosArray.forEach((photo) => {
        //create <a> to link to unsplash
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');
        // create <img> for photo
        const img = document.createElement('img');
        item.setAttribute('src', photo.url.regular);
        item.setAttribute('alt', photo.alt_description);
        item.setAttribute('title', photo.alt_description);

        //event listener, check when eash load is finished
        img.addEventListener('load', imageLoaded)

        // put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// get photos from Unsplash API

async function getPhotos() {
    try{
        const repsnse = await fetch(apiUrl);
        photosArray = await Response.json();
        displayPhotos();
    } catch (error){
        //catch error here
    };
}

// check to see if scrolling newa bottom of page, load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight = window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
});

//  on load
getPhotos();