const cardElementButton = document.querySelector('.profile__add-button');
const cardElementEditButton = document.querySelector('.profile__edit-button');

const elementsContainer = document.querySelector('.elements__list');
const elementTemplate = document.querySelector('#element').content;

const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupImage = document.querySelector('.popup-with-image__image');
const popupSubtext = document.querySelector('.popup-with-image__subtext');
const popupWithImage = document.querySelector('.popup-with-image');
const popupEditForm = document.querySelector('.popup__form_type_edit-profile');
const popupAddForm = document.querySelector('.popup__form_type_add-element');
const popupAddElement = document.querySelector('.popup_type_add-element');

const popupInputNameProfile = document.querySelector('[name="name"]')
const popupInputDescriptionProfile = document.querySelector('[name="description"]')
const popupElementInputAddName = document.querySelector('[name="element_name"]')
const popupElementInputAddUrl = document.querySelector('[name="url"]')

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function createElement(name, link) {
  const elementElement = elementTemplate.querySelector('.element').cloneNode(true);
  const elementPhoto = elementElement.querySelector('.element__photo');

  elementElement.querySelector('.element__title').textContent = name;
  elementPhoto.src = link;
  elementPhoto.alt = name;
  elementElement.querySelector('.element__like').addEventListener('click', (e) => e.target.classList.toggle('element__like_active'));
  elementElement.querySelector('.element__delete').addEventListener('click', (e) => e.target.closest('.element').remove());
  elementPhoto.addEventListener('click', (e) => {
    openPopup(popupWithImage);
    popupImage.src = e.target.src;
    popupImage.alt = name;
    popupSubtext.textContent = e.target.parentElement.querySelector('.element__title').textContent;
  });

  return elementElement;
}

function renderElement(element, elementContainer) {
  elementContainer.prepend(element);
};

// Функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// Функция закрытия попапа
function closePopup(popup) {
  popup.target.closest('.popup_opened').classList.remove('popup_opened');
};

// Изменение профиля
function submitFormEditProfile(e) {
  e.preventDefault();


  profileName.textContent = popupInputNameProfile.value;
  profileDescription.textContent = popupInputDescriptionProfile.value;
  closePopup(e)
}

// Добавление элемента
function submitFormAddElement(e) {
  e.preventDefault();

  renderElement(createElement(popupElementInputAddName.value, popupElementInputAddUrl.value), elementsContainer);
  popupAddForm.reset();
  closePopup(e)
}

// Слушатели закрытие попапов
popupCloseButtons.forEach(popupCloseButton => popupCloseButton.addEventListener('click', closePopup));

// Открытие попапов
cardElementEditButton.addEventListener('click', () => {


  popupInputNameProfile.value = profileName.textContent;
  popupInputDescriptionProfile.value = profileDescription.textContent;
  openPopup(popupEditProfile)
});

cardElementButton.addEventListener('click', () => openPopup(popupAddElement));

popupEditForm.addEventListener('submit', (e) => {
  submitFormEditProfile(e)
});

popupAddForm.addEventListener('submit', (e) => {
  submitFormAddElement(e)
});

// Отображение карточек
initialCards.forEach((card) => {
  renderElement(createElement(card.name, card.link), elementsContainer);
});