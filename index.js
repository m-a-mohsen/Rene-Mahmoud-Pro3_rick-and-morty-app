const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
const maxPage = 1;
const page = 1;
const searchQuery = "";

// fetch
let url = "https://rickandmortyapi.com/api/character/";

export async function fetchCharacters() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    data.results.map((character) => {
      // console.log("All character data: ", character);

      // const characterPicture = character.image;
      // const characterName = character.name;
      // const characterStatus = character.status;
      // const characterType = character.type;
      // const characterOccurrences = character.episode.length;

      // console.log(characterPicture);
      // console.log(characterName);
      // console.log(characterStatus);
      // console.log(characterType);
      // console.log(characterOccurrences);

      const createCard = `
      <li class="card">
        <div class="card__image-container">
          <img
            class="card__image"
            src=${character.image}
            alt=${character.name}
          />
          <div class="card__image-gradient"></div>
        </div>
        <div class="card__content">
          <h2 class="card__title">${character.name}</h2>
          <dl class="card__info">
            <dt class="card__info-title">Status</dt>
            <dd class="card__info-description">${character.status}</dd>
            <dt class="card__info-title">Type</dt>
            <dd class="card__info-description">${character.type}</dd>
            <dt class="card__info-title">Occurrences</dt>
            <dd class="card__info-description">${character.episode.length}</dd>
          </dl>
        </div>
      </li>
      `;
      cardContainer.insertAdjacentHTML("beforeEnd", createCard);
    });
  } catch (error) {
    console.log("error: ", error);
  }
}

fetchCharacters();
