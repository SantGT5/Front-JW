import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import swal from "sweetalert";
import Swal from "sweetalert2";
import api from "../api/api";

// Componentes Globais
import { Input } from "../Global/Input";
import { Radios } from "../Global/Radios";
import { Button } from "../Global/Button";

interface edite {
  name: string;
  email: string;
  role: string;
  _id: string;
}

export const Edite = () => {
  const storedUser = localStorage.getItem("loggedInUser");
  const loggedInUser = JSON.parse(storedUser || '""');
  const params: { id: string } = useParams();
  const history = useHistory();
  const [status, setStatus] = useState<edite>({
    name: "",
    email: "",
    role: "",
    _id: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus({
      ...status,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  useEffect(() => {
    async function fetchEdite() {
      try {
        const response: any = await api.post(`/founduser/${params.id}`);

        setStatus({ ...response.data });
      } catch (err: any) {
        console.log(err.response);
      }
    }
    fetchEdite();
  }, [params.id]);

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    try {
      const response = await api.put(`/edite/${status._id}`, {
        name: status.name,
        email: status.email,
        role: status.role,
      });

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({
          token: loggedInUser.token,
          user: {
            name: status.name,
            email: status.email,
            role: status.role,
            _id: loggedInUser.user._id,
          },
        })
      );

      history.push("/profile");
    } catch (err: any) {
      console.log(err.response);
      swal("Good job!", err.response.data.msg, "error");
    }
  }

  const handleClick = () => {
    Swal.fire({
      title: "Seguro?",
      text: "Todos los cambios serán perdidos!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar.",
      confirmButtonText: "No guardar cambios.",
    }).then((result) => {
      if (result.isConfirmed) {
        history.push("/profile");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="center editeSIZE">
        <div className="center edite">
          <Input
            label="Nombre"
            type="text"
            value={status.name}
            name="name"
            className="margin form-control"
            onChange={handleChange}
          />
          <Input
            label="Correo"
            type="text"
            value={status.email}
            name="email"
            className="margin form-control"
            onChange={handleChange}
          />

          <div>
            <Radios
              label="ADMIN"
              type="radio"
              value="ADMIN"
              name="role"
              id="flexRadioDefault1"
              htmlFor="flexRadioDefault1"
              onChange={handleChange}
              checked={status.role === "ADMIN" ? true : false}
              disabled={loggedInUser.user.role === "ADMIN" ? false : true}
            />
            <Radios
              label="RESPONSABLE"
              type="radio"
              value="RESPONSABLE"
              name="role"
              id="flexRadioDefault2"
              htmlFor="flexRadioDefault2"
              onChange={handleChange}
              checked={status.role === "RESPONSABLE" ? true : false}
              disabled={loggedInUser.user.role === "ADMIN" ? false : true}
            />
            <Radios
              label="PRESIDENTE"
              type="radio"
              value="PRESIDENTE"
              name="role"
              id="flexRadioDefault3"
              htmlFor="flexRadioDefault3"
              onChange={handleChange}
              checked={status.role === "PRESIDENTE" ? true : false}
              disabled={loggedInUser.user.role === "ADMIN" ? false : true}
            />

            <Radios
              label="CONVIDADO"
              type="radio"
              value="CONVIDADO"
              name="role"
              id="flexRadioDefault4"
              htmlFor="flexRadioDefault4"
              onChange={handleChange}
              checked={status.role === "CONVIDADO" ? true : false}
              disabled={loggedInUser.user.role === "ADMIN" ? false : true}
            />
          </div>
        </div>
        <div className="btnProfile">
          <div className="spaceBTN">
            <Button type="submit" des="Guardar" />
          </div>
          <div className="spaceBTN">
            <Button type="button" des="Cancel" onClick={handleClick} />
          </div>
        </div>
      </div>
    </form>
  );
};
