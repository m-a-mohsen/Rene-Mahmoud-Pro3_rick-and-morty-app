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
let searchQuery = "";
let searchPages = 1;
let nextPageUrl = "";
let prevPageUrl = "";
// fetch
const url = "https://rickandmortyapi.com/api/character/";



export async function fetchCharacters(anyUrl) {
  try {
    const response = await fetch(anyUrl);
    const data = await response.json();

    // ------------  update states ---------------
    maxPage = data.info.pages;
    searchPages = data.info.pages;
    // console.log({ maxPage });
    // console.log(data);
    nextPageUrl = data.info.next
    prevPageUrl = data.info.prev
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

nextButton.addEventListener("click", () => {
  if (nextPageUrl === null) {
    return
  }
  page === maxPage ? (page = 1) : page++;
  updatePageNumber();
  // const costumUrl = `${url}?page=${page}`;
  // console.log({ costumUrl });
  cardContainer.innerHTML = "";
  fetchCharacters(nextPageUrl);
  console.log({ page });
});
prevButton.addEventListener("click", () => {
  if (prevPageUrl === null) {
    return;
  }
  page <= 1 ? (page = 1) : page--;
  // const costumUrl = `${url}?page=${page}`;
  // console.log({ costumUrl });
  cardContainer.innerHTML = "";
  fetchCharacters(prevPageUrl);
  console.log({ page });
});
function updatePageNumber() {
  pagination.innerHTML = "";
  pagination.innerHTML = `${page} / ${maxPage}`;
}

// search bar
searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const inputQuery = Object.fromEntries(formData);
  console.log(inputQuery.query);
  searchQuery = inputQuery.query;
  search(searchQuery)
  const costumUrl = `${url}?name=${searchQuery}`;
  fetchCharacters(costumUrl)
  // pages >= 1 ? (page = pages) : page--;
  // const costumUrl = `${url}?name=${inputQuery.query}`;
  // console.log({ costumUrl });
  // cardContainer.innerHTML = "";
  // fetchCharacters(costumUrl);
});
async function search(searchQueryState) {
  // update query state

  const costumUrl = `${url}?name=${searchQueryState}`;
  try {
    const response = await fetch(costumUrl);
    const data = await response.json();
    console.log({data});

    if (data.error) {
      alert('noooooooooo')
    }
    cardContainer.innerHTML = ""
    maxPage = data.info.pages;
    page = 1
    searchPages = data.info.pages;
        nextPageUrl = data.info.next;
        prevPageUrl = data.info.prev;
    updatePageNumber()
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
  }
  catch (error) {
    console.log(error);
  }
}
fetchCharacters(url);
