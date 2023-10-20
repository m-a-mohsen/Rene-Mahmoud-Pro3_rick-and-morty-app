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
let maxPage = 1;
let page = 1;
const searchQuery = "";

// fetch
const url = "https://rickandmortyapi.com/api/character/";

export async function fetchCharacters(anyUrl) {
  try {
    const response = await fetch(anyUrl);
    const data = await response.json();

    // ------------  update states ---------------
    maxPage = data.info.pages;
    console.log({ maxPage });
    console.log(data);
updatePageNumber();
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
// -------------------- Pagination ------------------
// info object recived from fetch

// {
//   "info": {
//     "count": 826,
//     "pages": 42,
//     "next": "https://rickandmortyapi.com/api/character/?page=11",
//     "prev": "https://rickandmortyapi.com/api/character/?page=9"
//   }

nextButton.addEventListener("click", () =>{
  page === maxPage ? page = 1 : page++
updatePageNumber()
  const costumUrl = `${url}?page=${page}`
  console.log({ costumUrl });
  cardContainer.innerHTML = "";
  fetchCharacters(costumUrl);
  console.log({page});}
);
prevButton.addEventListener("click", () =>{
  page <= 1 ? page = 1 : page--
  const costumUrl = `${url}?page=${page}`;
  console.log({ costumUrl });
  cardContainer.innerHTML = "";
  fetchCharacters(costumUrl);
  console.log({page});}
);
function updatePageNumber() {
  pagination.innerHTML = ''
  pagination.innerHTML = `${page} / ${maxPage}`
}
fetchCharacters(url);

