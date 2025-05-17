import { useRef } from "react";

export default function NewCard(props) {
  const {onClose, onAddPlaceSubmit} = props;
  const nameRef = useRef();
  const linkRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    onAddPlaceSubmit({
      name: nameRef.current.value,
      link: linkRef.current.value,
    });
    console.log(nameRef.current.value)
    console.log(linkRef.current.value)
    onClose();
  }
  return (
    <form 
      className="popup__container"
      name="image"
      id="new-card" 
      onSubmit={handleSubmit}
      noValidate
    >
      <input 
        className="popup__input popup__input-title" 
        type="text" 
        id="title-input" 
        name="title" 
        placeholder="Título" 
        minLength="2" 
        maxLength="30" 
        ref={nameRef}
        required
      />
      <span className="popup__input-error title-input-error"></span>
      <input 
        className="popup__input popup__input-link" 
        type="url" 
        id="link-input" 
        name="link" 
        placeholder="Enlace de la imagen" 
        ref={linkRef}
        required
      />
      <span className="popup__input-error link-input-error"></span>
      <button className="popup__save-button">Crear</button>
    </form>
  );
}