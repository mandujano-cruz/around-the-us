import { useRef } from "react";

export default function EditAvatar({onClose, onUpdateAvatar}) {
  const avatarRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    const avatarValue = avatarRef.current.value;
    console.log(avatarValue)
    onUpdateAvatar({
      avatar: avatarValue,
    });

    onClose();
  }
  
  return (
    <form 
      className="popup__container"
      name="photoProfile"
      id="edit-avatar" 
      onSubmit={handleSubmit}
      noValidate
    >
      <input 
        className="popup__input popup__input-photo" 
        type="url"
        id="photo-input" 
        name="avatar" 
        placeholder="Enlace de la foto de perfil"
        ref={avatarRef}
        required
      />
      <span className="popup__input-error photo-input-error"></span>
      <button className="popup__save-button">Guardar</button>
    </form>
  );
}