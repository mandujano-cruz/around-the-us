import { useContext, useState } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

export default function EditProfile({onClose}) {
  const userContext = useContext(CurrentUserContext);
  const {currentUser, handleUpdateUser} = userContext;
  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdateUser({name, about: description});
    onClose();
  }

    return (
      <form 
        className="popup__container"
        name="profile"
        id="edit-profile" 
        onSubmit={handleSubmit}
        noValidate
      >
        <input 
          className="popup__input popup__input-name" 
          type="text" 
          id="name-input" 
          name="name" 
          placeholder="Nombre" 
          minLength="2" 
          maxLength="40" 
          value={name}
          onChange={handleNameChange}
          required
        />
        <span className="popup__input-error name-input-error"></span>
        <input 
          className="popup__input popup__input-about" 
          type="text" 
          id="about-input" 
          name="about" 
          placeholder="Acerca de mí"  
          minLength="2" 
          maxLength="200" 
          value={description}
          onChange={handleDescriptionChange}
          required
        />
        <span className="popup__input-error about-input-error"></span>
        <button className="popup__save-button" type="submit">Guardar</button>
      </form>
    );
  }