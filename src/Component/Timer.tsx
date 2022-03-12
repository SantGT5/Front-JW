import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../api/api";

import { Button } from "../Global/Button";
import { BtnStopWatch } from "../Global/BtnStopWatch";
import { Input } from "../Global/Input";

interface form {
  name: string;
  assignation: string;
  tiempo: string;
}

export const Timer = () => {
  const params: { id: string } = useParams();
  const [formValues, setFormValues] = useState<form[]>([]);

  const [remove, setRemove] = useState(false);

  const handleChange = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newFormValues: any = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  const addFormFields = () => {
    setFormValues([...formValues, { name: "", assignation: "", tiempo: "0:0:0" }]);
  };

  const removeFormFields = (i: number) => {
    setRemove(false);
    const newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };


  
  ////////////////


  const [time, setTime] = useState<any>({s:0, m: 0});
  const [interv, setInterv] = useState<any>()
  const [status, setStatus] = useState(0)

  const start = () => {
    run()
    setStatus(1)
    setInterv(setInterval(run, 1000))
    
  }
    

  useEffect(() => {

    run()

  }, [status === 1])
  

  const run = () => {
    let updatedS = time.s, updatedM = time.m

    if(updatedM === 60) {
      updatedM = 0
    }
    if(updatedS === 60) {
      updatedM++
      updatedS = 0
    }
    updatedS++
    setTime({s: updatedS, m: updatedM})
  }
  const stop = () => {
    clearInterval(interv)
    setStatus(2)
  }
  const reset = () => {
    clearInterval(interv)
    setStatus(0)
    setTime({s:0, m: 0})
  }
  
  const resume = () => start()



  const h = () => {
    if(time.h === 0) {
      return ''
    } else {
      return <span>{(time.h >= 10)? time.h : '0'+ time.h} : </span>
    }
  }


const timer = `${time.m}:${time.s}`

console.log(time)

  ////////////////





  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    try {
      const response = await api.post(`/meeting/${params.id}`, formValues);

      console.log(response);
    } catch (err: any) {
      console.log(err.response);
    }
  }

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
              type="text"
              name="tiempo"
              value={timer}
              onChange={(e) => handleChange(index, e)}
            />


            <BtnStopWatch 
              status={status}
              start={start}
              stop={stop}
              reset={reset}
              resume={resume}
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
