import React, { useState, useEffect } from "react"
import Header from "./Header/Header.jsx"
import Main from "./Main/Main.jsx"
import Footer from "./Footer/Footer.jsx"
import Api from "../utils/api.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import Register from "./Register/Register.jsx";
import Login from "./Login/Login.jsx";
import InfoTooltip from "./InfoTooltip/InfoTooltip.jsx";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import * as auth from "../utils/auth.js";
import { setToken, getToken, removeToken } from "../utils/token.js";

export default function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isPopup, setIsPopup] = useState(null);
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState ({email: "", password: ""});
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState("");
  // const [token, setToken] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const api = new Api({
    baseUrl: "https://aroundtheusapro.mooo.com",
    headers: {
      authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json"
    }
  });

  useEffect(() => {
    const token = getToken();
    if (!token) return;
    auth.getUserInfo(token)
      .then(({data}) => {
        setIsLoggedIn(true);
        setUserData({email: data.email});
      })
      .catch((err) => {
        console.error(err);
        setIsLoggedIn(false);
      });
  }, []);

  useEffect(() => {
    api.getInitialCards("cards/")
      .then((item) => {
        if(Array.isArray(item)) {
          setCards(item);
        } else {
          console.warn("Respuesta inesperada: ", item);
        }
      })
      .catch((err) => console.error("Error al obtener tarjetas: ", err));
  }, []);

  useEffect(() => {
    (async () => {
      await api.getUserInfo("users/me")
        .then((data) => setCurrentUser(data))
        .catch((err) => console.error("Error al obtener el usuario", err));
    })();
  }, []);

  const handleAddPlaceSubmit = (newCardData) => {
    api.addCard("cards/", newCardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleClosePopup();
      })
      .catch((err) => console.error("Error al agregar la tarjeta: ", err));
  }

  const handleUpdateUser = (data) => {
    (async () => {
      await api.setProfile("users/me",data)
        .then((newData) => {
          setCurrentUser(newData);
          handleClosePopup();
        });
    })();
  };

  const handleUpdateAvatar = (data) => {
    (async () => {
      await api.setProfile("users/me/avatar", data)
        .then((newAvatar) => {
          setCurrentUser((prevUser) => ({
            ...prevUser,
            avatar: newAvatar.avatar,
          }));
        })
        .catch((err) => console.error("Error al actualizar el avatar", err))
    })();
  }

  function handleOpenPopup(popup) {
    setIsPopup(popup);
  }

  function handleClosePopup() {
    setIsPopup(null);
  }

  function handleShowTooltip(success, message) {
    setIsSuccess(success);
    setTooltipMessage(message);
    setIsTooltipOpen(true);
  }

  function handleCloseTooltip() {
    setIsTooltipOpen(false);
  }

  async function handleCardLike(card) {
    const isLiked = card.isLiked;
    await api.toggleLike("cards/", card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((currentCard) => currentCard._id === card._id ? newCard : currentCard));
      })
      .catch((err) => console.error(err));
  }

  function handleCardDelete (card) {
    api.deleteCard("cards/", card._id)
      .then(() => {
        setCards((prevCard) => 
          prevCard.filter((cardSelected) => cardSelected._id !== card._id)
        )
      })
      .catch((err) => console.error(err));
  }

  const handleRegistration = ({ email, password }) => {
    auth.register(email, password)
      .then(() => {
        handleShowTooltip(true, "¡Correcto! Ya estás registrado");
        navigate("/signin");
      })
      .catch(() => handleShowTooltip(false, "Ha ocurrido un error al registrarte"));
  };

  const handleLogin = ({email, password}) => {
    if(!email || !password){
      handleShowTooltip(false, "Complete todos los campos.");
      return;
    }
    auth.authorize(email, password)
      .then((data) => {
        if(data.token) {
          // localStorage.setItem("jwt", data.token);
          setToken(data.token);
          setUserData({ email });
          setIsLoggedIn(true);
          const redirectPath = location.state?.from?.pathname || "/";
          navigate(redirectPath);
        }
      })
      .catch(() => handleShowTooltip(false, "Uy. Algo salió mal. Intentelo de nuevo"));
  };

  const handleSignOut = () => {
    removeToken();
    setIsLoggedIn(false);
    navigate("/signin");
  }

  return (
    <>
      <CurrentUserContext.Provider value={{currentUser, handleUpdateUser, handleUpdateAvatar}}>
        <Header isLoggedIn={isLoggedIn} userEmail={userData?.email || ""} onSignOut={handleSignOut}/>
        <Routes>
            <Route 
              path="/"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Main onOpenPopup={handleOpenPopup} onClosePopup={handleClosePopup} isPopup={isPopup} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} onAddPlaceSubmit={handleAddPlaceSubmit} />
                </ProtectedRoute>
              }
            />
          <Route path="/signin" element={
              <ProtectedRoute isLoggedIn={isLoggedIn} anonymous>
                <Login handleLogin={handleLogin} />
              </ProtectedRoute>
            } 
          />
          <Route path="/signup" element={
              <ProtectedRoute isLoggedIn={isLoggedIn} anonymous>
                <Register handleRegistration={handleRegistration} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="*"
            element={
              isLoggedIn ? (<Navigate to="/" replace />) : (<Navigate to="/signin" replace />)
            }
          />
        </Routes>
        <Footer/>
      </CurrentUserContext.Provider>
      <InfoTooltip
        isOpen={isTooltipOpen}
        onClose={handleCloseTooltip}
        isSuccess={isSuccess}
        message={tooltipMessage}
      />
    </>
  )
}
