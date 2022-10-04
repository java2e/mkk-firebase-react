import React, { useEffect, useState } from "react";
import { app } from "../firebaseConfig";
import { getDatabase, ref, set } from "firebase/database";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const Index = () => {
  const database = getDatabase(app);
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [city,setCity] = useState("");
  const [address,setAddress] = useState("");
  const [counter,setCounter] = useState(1);


  const saveUser= async() => {

    try {

      const data = {
        firstName : firstName,
        lastName:lastName,
        city:city,
        address
      }

      let counterX = counter;
      counterX = counterX + 1;
      setCounter(counterX);
      const result = await set(ref(database,"mkk/XYZ"+counterX), {
        data
      });

      console.log(result);

      
    } catch (error) {
      console.log(error);
    }


  }

  return (

    <div className="flex justify-content-center">
    <div className="p-fluid">
      <div className="p-field">
        <label htmlFor="firstname">Firstname</label>
        <InputText
          id="firstname"
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      <div className="p-field">
        <label htmlFor="lastname">Lastname</label>
        <InputText
          id="lastname"
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <div className="p-field">
        <label htmlFor="address">Address</label>
        <InputText
          id="address"
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className="p-field">
        <label htmlFor="city">City</label>
        <InputText id="city" onChange={(e) => setCity(e.target.value)} />
      </div>

      <div className="p-field">
        <Button label="KAYDET" onClick={saveUser} />
      </div>
    </div>
  </div>

  )
};

export default Index;
