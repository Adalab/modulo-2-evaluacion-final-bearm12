'use strict';

const searchInput = document.querySelector('.js-search-input');
const searchButton = document.querySelector('.js-search-btn');
const favSection = document.querySelector('.js-favs-section');
const animeSection = document.querySelector('.js-search-section');
const cardsContainer = document.querySelector('.js-cards-container');
const favsContainer = document.querySelector('.js-favs-container')

const URL_SERVER = `https://api.jikan.moe/v4/anime?q=`;
const noImage = 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png';
const placeholderImage = 'https://via.placeholder.com/210x295/ffffff/666666/?text=';

const favsLocalStorage = JSON.parse(localStorage.getItem('favorites'));

let animesList = [];
let animeFavList = [];


const handleEliminateFav = (event) => {
    const clickedFavCross = event.currentTarget;
    const clickedFav = clickedFavCross.parentNode;
    console.log(animeFavList)
    
    for(const fav of animeFavList){
            if(parseInt(clickedFav.id) === fav.mal_id){
                const clickedFavIndex = animeFavList.findIndex(favItem => parseInt(clickedFav.id) === favItem.mal_id);
                
                animeFavList.splice(clickedFavIndex, 1);

                console.log(animeFavList)
            }    
        }
    }



const renderFavoritesList = () => {
    favsContainer.innerHTML = '';

    for(const anime of animeFavList){
        const favContainer = document.createElement('div');
        favsContainer.appendChild(favContainer);
        favContainer.classList.add('favs__card');
        favContainer.setAttribute('id', anime.mal_id);

        const favImage = document.createElement('img');
        const favTilteEl = document.createElement('p');
        const favTitleContent = document.createTextNode(anime.title)
        const eliminateIcon = document.createElement('i');

        favContainer.appendChild(favImage);
        favImage.setAttribute('alt', anime.title)
        if(anime.images.webp.image_url !== noImage) {
            favImage.setAttribute('src', anime.images.webp.image_url);
        } else {
            favImage.setAttribute('src', `${placeholderImage}${anime.title}`);   
        }

        favContainer.appendChild(favTilteEl);
        favTilteEl.appendChild(favTitleContent);
        favContainer.appendChild(eliminateIcon);
        eliminateIcon.classList.add('fa-regular', 'fa-circle-xmark', 'js-fav-card');
     }

     const favCardsCross = document.querySelectorAll('.js-fav-card');
     for(const favCardCross of favCardsCross){
        favCardCross.addEventListener('click', handleEliminateFav);
     }
}

if(favsLocalStorage !== null){
    animeFavList = favsLocalStorage;
    renderFavoritesList();
    favSection.classList.remove('hidden');
}

const handleFavorite = (event) => {
    const clickedCard = event.currentTarget;
    clickedCard.classList.toggle('card__selected');
    
    const favAnime = animesList.find(anime => parseInt(clickedCard.id) === anime.mal_id);
    const favIndex = animeFavList.findIndex(favItem => parseInt(clickedCard.id) === favItem.mal_id);

    if (favIndex === -1) {
        animeFavList.push(favAnime)
    }

    renderFavoritesList(); 
    
    localStorage.setItem('favorites', JSON.stringify(animeFavList));
}

const renderAnimeList = () => {
    cardsContainer.innerHTML = '';
    
    
    for(const anime of animesList){
        const animeCard = document.createElement('div');
        cardsContainer.appendChild(animeCard);
        animeCard.setAttribute('id', anime.mal_id);
        animeCard.classList.add('js-anime-card', 'result__cards')

        const animeImage = document.createElement('img');
        animeCard.appendChild(animeImage);
        animeImage.setAttribute('alt', anime.title);

        if(anime.images.webp.image_url !== noImage) {
            animeImage.setAttribute('src', anime.images.webp.image_url);
        } else {
            animeImage.setAttribute('src', `${placeholderImage}${anime.title}`);   
        }
        
        const animeTitleElement = document.createElement('p');
        const animeTitle = document.createTextNode(anime.title);
        animeCard.appendChild(animeTitleElement);
        animeTitleElement.appendChild(animeTitle);
    }
    animeSection.classList.remove('hidden');
    favSection.classList.remove('hidden');

    const cards = document.querySelectorAll('.js-anime-card');
    for(const card of cards) {
        card.addEventListener('click', handleFavorite);
    }
}

const handleSearch = (event) => {
    event.preventDefault();
    const searchValue = searchInput.value.toLowerCase();
    const searchURL = `${URL_SERVER}${searchValue}`;
    
    fetch(searchURL)
        .then(response => response.json())
        .then((data) => {
            animesList = data.data;
            renderAnimeList();
        })
}

searchButton.addEventListener('click', handleSearch);