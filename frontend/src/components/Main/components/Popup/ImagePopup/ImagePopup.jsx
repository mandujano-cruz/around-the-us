export default function ImagePopup (props) {
    const {name, link, onClose} = props.card;
    return (
        <>
            <img className="popup__image" src={link} alt={name}/>
            <p className="popup__image-title">{name}</p>
        </>
    )
}