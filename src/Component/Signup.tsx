import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import api from "../api/api";
import swal from "sweetalert";

import { Input } from "../Global/Input";
import { Button } from "../Global/Button";
import { Checkbox } from "../Global/Checkbox";

interface signup {
  name: string;
  email: string;
  password: string;
}

export const Signup = () => {
  const history = useHistory();
  const [showpass, setShowPass] = useState(false);
  const [status, setState] = useState<signup>({
    name: "",
    email: "",
    password: "",
  });

  console.log("status -> ", status);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...status,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleClick = () => {
    showpass === false && setShowPass(true);
    showpass === true && setShowPass(false);
  };

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    try {
      const response = await api.post("/signup", status);

      response && history.push("/login");
    } catch (err: any) {
      err.response &&
        swal("¡Intentalo de nuevo!", err.response.data.msg, "error");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="center">
        <div className="borderLogin">
          <div className="signup">
            <h2 className="margin">Crear cuenta</h2>

            <Input
              label="Escriba su nombre"
              type="text"
              value={status.name}
              name="name"
              className="margin form-control"
              onChange={handleChange}
            />

            <Input
              label="Escriba su correo"
              type="text"
              value={status.email}
              name="email"
              className="margin form-control"
              onChange={handleChange}
            />

            <Input
              label="Escriba su contraseña"
              type={showpass === false ? "password" : "text"}
              value={status.password}
              name="password"
              className="margin form-control"
              onChange={handleChange}
            />

            <Checkbox
              des="Mostrar contraseña"
              className="margin form-check-input"
              onChange={handleClick}
              checked={showpass === false ? false : true}
            />
            <Button type="submit" des="Siguiente" />
            <span className="btnNew">
              ¿Nuevo por aquí?{" "}
              <Link className="textDecoration" to={"/login"}>
                Crear cuenta.
              </Link>
            </span>
          </div>
        </div>
      </div>
    </form>
  );
};
