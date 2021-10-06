import React, { useState } from "react";
import { useParams } from "react-router";
import Swal from 'sweetalert2'
import api from "../api/api";

import { Button } from "../Global/Button";
import { Input } from "../Global/Input";

interface form {
  name: string;
  assignation: string;
  tiempo: number;
}

export const Timer = () => {
  const params: { id: string } = useParams()
  const [formValues, setFormValues] = useState<form[]>([]);

  const [remove, setRemove] = useState(false);

  const handleChange = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newFormValues: any = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  const addFormFields = () => {
    setFormValues([...formValues, { name: "", assignation: "", tiempo: 0 }]);
  };

  const removeFormFields = (i: number) => {
    setRemove(false);
    const newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

async function handleSubmit(event: React.SyntheticEvent){
    event.preventDefault();
    // alert(JSON.stringify(formValues));
try{

const response = await api.post( `/meeting/${params.id}`, formValues )

console.log( response )

Swal.fire({
  position: 'top-end',
  icon: 'success',
  title: 'Your work has been saved',
  showConfirmButton: false,
  timer: 1500
})

}catch( err: any ){
  console.log( err.response )
}

  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "flex" }} className="center date button-section">
        <Button type="button" des="Agregar" onClick={addFormFields} />

        <div className="spaceBTN ">
          <Button type="submit" des="Guardar" />
        </div>

        <Button type="button" des="Remover" onClick={() => setRemove(true)} />
      </div>
      <div className="center fit">
        {formValues.map((element: form, index: number) => (
          <div style={{ display: "flex" }} key={index}>
            <Input
              label="Nombre"
              className="margin form-control"
              type="text"
              name="name"
              value={element.name || ""}
              onChange={(e) => handleChange(index, e)}
            />

            <Input
              label="Asignación"
              className="margin form-control"
              type="text"
              name="assignation"
              value={element.assignation || ""}
              onChange={(e) => handleChange(index, e)}
            />

            <Input
              label="Tiempo"
              className="margin form-control"
              type="number"
              name="tiempo"
              value={element.tiempo || ""}
              onChange={(e) => handleChange(index, e)}
            />
            {remove === true ? (
              <div className="flex">
                <div className="sizeBTN center">
                  <Button
                    type="button"
                    des="Seguro ?"
                    onClick={() => removeFormFields(index)}
                  />
                </div>
                <div className="sizeBTN center">
                  <Button
                    type="button"
                    des="Cancelar"
                    onClick={() => setRemove(false)}
                  />
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
    </form>
  );
};
