import { Link } from "react-router-dom";
import { useState } from "react";

const Register = ({ handleRegistration }) =>  {
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleRegistration(data);
    };

    return (
      <>
        <div className="register">
            <h2 className="register__title">Regístrate</h2>
            <form 
                className="register__container"
                name="register"
                id="register"
                onSubmit={handleSubmit}
                noValidate
            >
                <input 
                    className="register__input register__input-email"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Correo electrónico"
                    value={data.email}
                    onChange={handleChange}
                    required
                />
                <span className="register__input-error"></span>
                <input 
                    className="register__input register__input-password"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Contraseña"
                    value={data.password}
                    onChange={handleChange}
                    required
                />
                <span className="register__input-error"></span>
                <button className="register__submit" type="submit">Regístrate</button>
                <div className="register__signin">
                    <p>¿Ya eres miembro?</p>
                    <Link to="/signin" className="register__login-link">Inicia sesión aquí</Link>
                </div>
            </form>
        </div>
      </>
    )
  }
  
  export default Register;