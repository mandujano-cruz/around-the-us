import header from "../../images/header.png"
import { Link, useLocation } from "react-router-dom";
import menuIcon from "../../images/menu-icon.png";
import closeIcon from "../../images/close.png";
import { useState } from "react";

export default function Header({ isLoggedIn, userEmail, onSignOut }) {
  const location = useLocation();
  const isLoginPage = location.pathname === "/signin";
  const isRegisterPage = location.pathname === "/signup";
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  return (
    <>
      <header className="header">
        <div className="header__container">
          {isLoggedIn && (
            <div className={`header__info ${isMenuOpen ? 'header__info-open' : ''}`}>
              <p>{userEmail}</p>
              <a onClick={onSignOut} className="header__auth-link">Cerrar sesión</a>
            </div>
          )}
          <div className="header__main-bar">
             <img className="header__image" src={header} alt="Logotipo de la página."/>
            {isLoggedIn && (
              <button className="header__menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <img src={isMenuOpen ? closeIcon : menuIcon} alt={isMenuOpen ? "Cerrar menú" : "Abrir menú"} className="header__menu-image" />
              </button>
            )}
            {!isLoggedIn &&
              (isLoginPage || isRegisterPage) && (
                <Link className="header__auth-link" to={isLoginPage ? "/signup" : "/signin"} >
                  {isLoginPage ? "Regístrate" : "Iniciar sesión"}
                </Link>
              )
            }
          </div>
        </div>
        <hr className="header__line"/>
      </header>
    </>
  )
}
