export function createCharacterCard(
  characterPicture,
  characterName,
  characterStatus,
  characterType,
  characterOccurrences
) {
  /* 
  The following elements of the card need to be dynamic and change for each character:
the src of the image, the name of the character, the status, type and occurrences values
*/

  // just a test

  const createCard = `
        <li class="card">
          <div class="card__image-container">
            <img
              class="card__image"
              src=${characterPicture}
              alt=${characterName}
            />
            <div class="card__image-gradient"></div>
          </div>
          <div class="card__content">
            <h2 class="card__title">${characterName}</h2>
            <dl class="card__info">
              <dt class="card__info-title">Status</dt>
              <dd class="card__info-description">${characterStatus}</dd>
              <dt class="card__info-title">Type</dt>
              <dd class="card__info-description">${characterType}</dd>
              <dt class="card__info-title">Occurrences</dt>
              <dd class="card__info-description">${characterOccurrences}</dd>
            </dl>
          </div>
        </li>
        `;
}
