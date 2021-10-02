import { useState, useEffect } from "react";
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

  console.log(status);

  useEffect(() => {
    async function fetchEdite() {
      try {
        const response: any = await api.get("/profile");

        setStatus({ ...response.data });
      } catch (err: any) {
        console.log(err.response);
      }
    }
    fetchEdite();
  }, []);


  async function handleSubmit(event: React.SyntheticEvent) {
event.preventDefault()

      try{

const response = await api.put(`/edite/${status._id}`, { name: status.name, email: status.email, role: status.role })

      }catch( err: any ){
          console.log( err.response )
      }
  }


  return (
      <form onSubmit={ handleSubmit }>
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
        <Radios
          label="ADMIN"
          type="radio"
          value="ADMIN"
          name="role"
          onChange={handleChange}
          checked={status.role === "ADMIN" ? true : false}
        />

        <Radios
          label="RESPONSABLE"
          type="radio"
          value="RESPONSABLE"
          name="role"
          onChange={handleChange}
          checked={status.role === "RESPONSABLE" ? true : false}
        />

        <Radios
          label="PRESIDENTE"
          type="radio"
          value="PRESIDENTE"
          name="role"
          onChange={handleChange}
          checked={status.role === "PRESIDENTE" ? true : false}
        />

        <Radios
          label="CONVIDADO"
          type="radio"
          value="CONVIDADO"
          name="role"
          onChange={handleChange}
          checked={status.role === "CONVIDADO" ? true : false}
        />
      </div>
      <div className="btnProfile">
        <div className="spaceBTN">
          <Button type="submit" des="Guardar" />
        </div>
        <div className="spaceBTN">
          <Button type="button" des="Cancel" />
        </div>
      </div>
    </div>
    </form>
  );
};
