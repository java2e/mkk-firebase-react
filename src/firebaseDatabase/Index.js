import React, { useEffect, useState } from "react";
import { app } from "../firebaseConfig";
import { child, get, getDatabase, onValue, push, query, ref, set } from "firebase/database";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { orderBy } from "firebase/firestore";

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

  const readData =() => {

    const dbRef = ref(database);

    get(child(dbRef,'mkk/XYZ2')).then((result) => {
      if(result.exists) {
        console.log(result.val());
      }
      else {
        console.log("No data avaiable!");
      }
    }).catch((error) => {
      console.log(error);
    })

  }

  const readList =()=> {

    const list =ref(database,'mkk');

    onValue(list,(value) => {
      const data = value.val();
      if(value.exists) {
        Object.values(data).map((mkk) => {
          console.log(mkk);
        })
      }
    })

    console.log(list);


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
        <Button label="KAYDET" onClick={readList} />
      </div>
    </div>
  </div>

  )
};

export default Index;
