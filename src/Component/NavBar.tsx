import imgLogo from "../img/logo.png";
import { Link } from "react-router-dom";
import uniqid from 'uniqid';

export const NavBar = () => {

const mettingID = uniqid("", "jw") + uniqid("-1914-", "")

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
        <Link className="btnNav" to={`/meeting/${mettingID}`}>
          Nueva Reunión
        </Link>
      </div>
    </div>
  );
};
