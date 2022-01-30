const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');


let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];



//  Unsplash API
const count = 30;
const apiKey = '5SBmIeVWXVKs-5GGLBrbrxtBdnvyVM7lAd4Uu-9R4Iw';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//  Check is all images were loaded

function imageLoaded() {
    console.log('image loaded');
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;

        console.log('ready =', ready);
    }
}
//  Helper Function to set attributes
function setAttributes(element, attributes){
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}



// create elements for Links and Photos and add that to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages);
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
    // Create an anchor element (<a/>) to link to unsplash
    const item = document.createElement('a');
    setAttributes(item, {
        href: photo.links.html,
        target: '_blank',
    })
    // item.setAttribute('href', photo.links.html);
    // item.setAttribute('target', '_blank');
    
    // create an <img> element for photo
    const img = document.createElement('img');
    setAttributes(img, {
        src: photo.urls.regular,
        alt: photo.alt_description,
        title: photo.alt_description,
    })
    // img.setAttribute('src', photo.urls.regular);
    // img.setAttribute('alt', photo.alt_description);
    // img.setAttribute('title', photo.alt_description);
    

    //  Event Listener, check when each is finished loading
    img.addEventListener('load', imageLoaded);

    // Put <img> inside <a> , then put both inside imageContainer element
    item.appendChild(img);
    imageContainer.appendChild(item);

    });
}

// Get Photos from unsplash API


async function getPhotos(){

    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }catch (error){
        //  catch error here
    }
}

// load more photos
window.addEventListener('scroll', () => {

        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
            getPhotos();
            ready = false;
        }
});




// On load
getPhotos();