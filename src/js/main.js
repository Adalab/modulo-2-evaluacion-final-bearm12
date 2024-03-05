'use strict';

const searchInput = document.querySelector('.js-search-input');
const searchButton = document.querySelector('.js-search-btn');
const favSection = document.querySelector('.js-favs-container');
const animeSection = document.querySelector('.js-search-container');

const URL = `https://api.jikan.moe/v4/anime?q=`;

let animesList = [];

const renderAnimeList = () => {
    const titleElementResults = document.createElement('h2');
    const titleContentResults = document.createTextNode('Resultados');
    animeSection.appendChild(titleElementResults);
    titleElementResults.appendChild(titleContentResults);

    const animeCardContainer = document.createElement('div');
    animeSection.appendChild(animeCardContainer);

    for(const anime of animesList){
        const animeCard = document.createElement('div');
        animeCardContainer.appendChild(animeCard);

        const animeImage = document.createElement('img');
        animeCard.appendChild(animeImage);
        animeImage.setAttribute('src', anime.images.webp.image_url);
        animeImage.setAttribute('alt', anime.title_english);

        const animeTitleElement = document.createElement('p');
        const animeTitle = document.createTextNode(anime.title_english);
        animeCard.appendChild(animeTitleElement);
        animeCard.appendChild(animeTitle);
    }    

}

const handleSearch = (event) => {
    event.preventDefault();
    const searchValue = searchInput.value.toLowerCase();
    const searchURL = `${URL}${searchValue}`;
    
    fetch(searchURL)
        .then(response => response.json())
        .then((data) => {
            animesList = data.data;
            console.log(animesList)
            renderAnimeList();
        })
}

searchButton.addEventListener('click', handleSearch);