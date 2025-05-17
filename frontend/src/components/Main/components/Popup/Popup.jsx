export default function Popup(props) {
  const {onClose, title, children, classPopup} = props;

  function handleOverlayClick(event) {
    if (event.target.classList.contains("overlay")) {
      onClose();
    }
  }
  return (
    <div className="overlay" onClick={handleOverlayClick}>
      <div className={`popup ${classPopup}`}>
        <button className="popup__close" onClick={onClose}></button>
        {title && <h2 className="popup__title">{title}</h2>}
        {children}
      </div>  
    </div>
  )
}