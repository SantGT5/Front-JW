// import Typed from "typed.js";

import { authContext } from "../contexts/authContext";
import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";

// Configuração do AXIOS.
import api from "../api/api";
// Mensagem de alerta
import swal from "sweetalert";
// Componentes globais
import { Input } from "../Global/Input";
import { Button } from "../Global/Button";
import { Checkbox } from "../Global/Checkbox";

// Controller do login.
interface login {
  email: string;
  password: string;
}

export const Login = (props: any) => {
  const { setLoggedInUser } = useContext(authContext);
  const [showpass, setShowPass] = useState(false);
  const history = useHistory();
  const [state, setState] = useState<login>({
    email: "",
    password: "",
  });

  // const el: any = useRef<HTMLDivElement>();

  // useEffect(() => {
  //   const typed = new Typed(el.current, {
  //     strings: ["Handy", "Mandy", "Candy", "More Strings"],
  //     typeSpeed: 100,
  //     loop: true
  //   });
  //   return () => {
  //     typed.destroy();
  //   };
  // }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleClick = () => {
    showpass === false && setShowPass(true);
    showpass === true && setShowPass(false);
  };

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    try {
      const response = await api.post("/login", state);

      setLoggedInUser({ ...response.data });

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ ...response.data })
      );

      response && history.push("/profile");
    } catch (err: any) {
      console.log(err.response);

      err.response &&
        swal("¡Intentalo de nuevo!", err.response.data.msg, "error");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* <div>
        <h1 ref={el}></h1>
      </div> */}

      <div className="center">
        <div className="borderLogin">
          <div className="login">
            <h2 className="margin">Iniciar sesión</h2>
            <Input
              label="Escriba su correo"
              className="margin form-control"
              type="text"
              value={state.email}
              name="email"
              onChange={handleChange}
            />
            <Input
              label="Escriba su contraseña"
              className="margin form-control"
              type={showpass === false ? "password" : "text"}
              value={state.password}
              name="password"
              onChange={handleChange}
            />
            <Checkbox
              des="Mostrar contraseña"
              className="margin form-check-input"
              onChange={handleClick}
              checked={showpass === false ? false : true}
            />
            <Button type="submit" des="Iniciar sesión" />
            <span className="btnNew">
              ¿Nuevo por aquí?{" "}
              <Link className="textDecoration" to={"/signup"}>
                Crear cuenta.
              </Link>
            </span>
          </div>
        </div>
      </div>
    </form>
  );
};
