import React, { useState } from "react";
import SubmitLogin from "../model/SubmitLogin";
import EstadoSolicitud from "./EstadoLogin";
import { useAuthStore } from "../../../../store/auth";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export function FormLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [estado, setEstado] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar u ocultar la contraseña
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);

  function Loginvnigate(token) {
    if (token !== null) {
      navigate("/panel-de-control");
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault(); // Evitar que la página se recargue

    SubmitLogin(username, password)
      .then((data) => {
        setEstado(data.estado);
        setToken(data.token); //Guarda el token en el local storage
        Loginvnigate(data.token);
      })
      .catch((error) => {
        console.error("Error al enviar los datos:", error);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="mb-3 mt-6">
          <label className="form-label"><strong>Usuario</strong></label>
          <input
            type="text"
            className="form-control"
            placeholder="Tu Usuario"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label className="form-label d-flex justify-content-between align-items-center">
            <strong>Password</strong>
            <span className="form-label-description">
              <strong><a href="./forgot-password" style={{ color: "#084788" }}> Olvidé mi contraseña</a></strong>
            </span>
          </label>
          <div className="input-group left-0 input-group-flat">
            <input
              type={showPassword ? "text" : "password"} 
              className="form-control"
              placeholder="Tu password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="input-group-text">
              <button
                type="button"
                className="link-secondary"
                onClick={() => setShowPassword(!showPassword)} 
                title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </span>
          </div>
        </div>
        
        <div className="form-footer mt-6 flex justify-center"> {/* Agregamos la clase flex y justify-center para centrar horizontalmente el botón */}
          <button type="submit" className="btn btn-primary py-1" style={{ backgroundColor: "#fc6b03", borderColor: "#fc6b03", width: "calc(100% - 15em)" }}>
            Ingresar
          </button>
        </div>
      </form>
      {estado && EstadoSolicitud(estado)}
    </>
  );
}

export default FormLogin;