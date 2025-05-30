import { useContext } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

export default function Card (props) {
    const {currentUser} = useContext(CurrentUserContext);
    const {name, link, likes} = props.card;
    const {onImageClick, onCardLike, onCardDelete} = props;
    const isLiked = likes.some((userId) => userId === currentUser._id);
    const cardLikeButtonClassName = `card__like ${
        isLiked ? 'card__like_active' : ''
    }`;

    function handleLikeClick () {
        onCardLike(props.card);
    }

    function handleCardDelete () {
        onCardDelete(props.card)
    }

    return (
        <li className="card">
            <button className="card__delete" onClick={handleCardDelete}></button>
            <img className="card__image" src={link} alt="" onClick={() => onImageClick(props.card)}/>
            <div className="card__footer">
                <h2 className="card__title">{name}</h2>
                <button className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
            </div>
        </li>
    );
}