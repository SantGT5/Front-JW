import imgLogo from "../img/logo.png";
import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <div>
      <div>
        <img className="imgLogo" src={imgLogo} alt="Logo JW" />
        <h1 className="welcome center">Sonido y Plataforma</h1>
      </div>
      <div className="nav">
        <Link className="btnNav" to={"/search"}>
          Buscar
        </Link>
        <Link className="btnNav" to={"/profile"}>
          Mi perfil
        </Link>
        <Link className="btnNav" to={"/meeting"}>
          Nueva Reunión
        </Link>
      </div>
    </div>
  );
};
