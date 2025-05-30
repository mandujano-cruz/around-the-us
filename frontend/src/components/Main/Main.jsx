import { useState, useEffect, useContext } from "react";
import Popup from "./components/Popup/Popup.jsx";
import NewCard from "./components/Popup/NewCard/NewCard.jsx";
import EditProfile from "./components/Popup/EditProfile/EditProfile.jsx";
import EditAvatar from "./components/Popup/EditAvatar/EditAvatar.jsx";
import editPhoto from "../../images/editPhoto.png";
import Card from "./components/Card/Card.jsx";
import ImagePopup from "./components/Popup/ImagePopup/ImagePopup.jsx";
import Api from "../../utils/api.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

export default function Main (props) {
  const {cards, onCardLike, onCardDelete, onAddPlaceSubmit} = props;
  const {currentUser, handleUpdateAvatar} = useContext(CurrentUserContext);
  const [popup, setPopup] = useState(null);
  const newCardPopup = {title: "Nuevo lugar", children: <NewCard onClose={handleClosePopup} onAddPlaceSubmit={onAddPlaceSubmit} />, classPopup: "popup_add"};
  const newEditProfile = {title: "Editar perfil", children: <EditProfile onClose={handleClosePopup}/>, classPopup: "popup_edit"};
  const newEditAvatar = {title: "Cambiar foto de perfil", children: <EditAvatar onClose={handleClosePopup} onUpdateAvatar={handleUpdateAvatar} />, classPopup: "popup_edit"};

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  function handleImageClick (card) {
    const newPopupImage = {title: null, children: <ImagePopup card={card}/>, classPopup: "popup_image"};
    handleOpenPopup(newPopupImage);
  }

  return(
    <main>
      <section className="profile">
        <div className="profile__container">
          <img className="profile__image" src={currentUser.avatar} alt="Foto de perfil."/>
          <img className="profile__image-edit" src={editPhoto} alt="Imagen de edición" onClick={() => handleOpenPopup(newEditAvatar)}/>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__about-me">{currentUser.about}</p>
          <button className="profile__edit-button" onClick={() => handleOpenPopup(newEditProfile)}></button>
        </div>
        <button className="profile__add-image" onClick={() => handleOpenPopup(newCardPopup)}></button>
      </section>
      <section className="elements">
        <ul className="card__list">
          {cards.map((card) => (
            <Card key={card._id} card={card} onImageClick={handleImageClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>
          ))}
        </ul>
      </section>
      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title} classPopup={popup.classPopup}>
          {popup.children}
        </Popup>
      )}
    </main>
  )
}