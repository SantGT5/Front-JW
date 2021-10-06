import React, { useState } from "react";
import { Button } from "../Global/Button";
import { Input } from "../Global/Input";
import Swal from "sweetalert2";
import swal from "sweetalert";

interface form {
  name: string;
  assignation: string;
  tiempo: number;
}

export const Timer = () => {
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

  const handleSubmit = (event: any) => {
    event.preventDefault();
    alert(JSON.stringify(formValues));
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
