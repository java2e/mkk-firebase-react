import React, { useState } from "react";
import { app } from "../firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { async } from "@firebase/util";

const Index = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  const db = getFirestore(app);

  const saveUser = async () => {
    try {
      const result = await addDoc(collection(db, "users"), {
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
      });

      console.log("Document ID :", result.id);
    } catch (error) {
      console.log(error);
    }
  };

  const saveDoc = async () => {
    try {
      const result = await setDoc(doc(db, "users", "MKK"), {
        firstName: firstName,
        lastName: lastName,
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const saveDocParam = async () => {
    try {
      const mkk = await doc(db, "users", "MKK");

      setDoc(mkk, { address: address }, { merge: true });
    } catch (error) {
      console.log(error);
    }
  };

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
          <Button label="YENİ DOC KAYDET" onClick={saveDoc} />
          <Button label="EK KEY KAYDET" onClick={saveDocParam} />
        </div>
      </div>
    </div>
  );
};

export default Index;