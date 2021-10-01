import { authContext } from "../contexts/authContext";
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import api from "../api/api";

import { Input } from "../Global/Input";
import { Button } from "../Global/Button";
import { Checkbox } from "../Global/Checkbox";

interface login {
  email: string;
  password: string;
}

export const Login = () => {
  const { setLoggedInUser } = useContext(authContext);
  const [showpass, setShowPass] = useState(false);
  let history = useHistory();
  const [state, setState] = useState<login>({
    email: "",
    password: "",
  });

  console.log(state);

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

console.log( response )

      setLoggedInUser({ ...response.data });

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ ...response.data })
      );
      
      response && history.push("/home");

    } catch (err: any) {
      console.log(err.response);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
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
            <Button type="submit" des="Entrar" />
          </div>
        </div>
      </div>
    </form>
  );
};
