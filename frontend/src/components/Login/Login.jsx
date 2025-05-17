import { Link } from "react-router-dom";
import { useState } from "react";

const Login = ({handleLogin}) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(data);
  }

  return (
    <>
      <div className="login">
          <h2 className="login__title">Iniciar sesión</h2>
          <form 
              className="login__container"
              name="login"
              id="login"
              onSubmit={handleSubmit}
              noValidate
          >
              <input 
                  className="login__input login__input-email"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Correo electrónico"
                  value={data.email}
                  onChange={handleChange}
                  required
              />
              <span className="login__input-error"></span>
              <input 
                  className="login__input login__input-password"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Contraseña"
                  value={data.password}
                  onChange={handleChange}
                  required
              />
              <span className="login__input-error"></span>
              <button className="login__submit" type="submit">Inicia sesión</button>
              <div className="login__signup">
                <p>¿Aún no eres miembro?</p>
                <Link to="/signup" className="login__register-link">Regístrate aquí</Link>
              </div>
          </form>
      </div>
    </>
  )
};

export default Login;
