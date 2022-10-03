import React, { useState } from "react";
import { app } from "../firebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  deleteField,
  doc,
  getFirestore,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

class User {
  constructor(firstName, lastName, city, address) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.city = city;
    this.address = address;
  }
  toString() {
    return (
      this.firstName +
      ", " +
      this.lastName +
      ", " +
      this.city +
      ", " +
      this.address
    );
  }
}

const Index = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  const db = getFirestore(app);

  const userConverter = {
    toFirestore: (user) => {
      return {
        firstName: user.firstName,
        lastName: user.lastName,
        city: user.city,
        address: user.address,
      };
    },
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);
      return new User(data.firstName, data.lastName, data.city, data.address);
    },
  };

  const converter = () => {
    const user = doc(db, "users", "MKK").withConverter(userConverter);

    console.log(user);
  };

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
        address: address,
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

  const saveWithDataType = async () => {
    const data = {
      name: "MKK",
      active: true,
      number: 2.21331,
      expireTime: Timestamp.fromDate(new Date()),
      roles: ["MANAGER", "CUSTOMER", "EMPLOYEE"],
      birthDate: null,
      info: {
        detail: "detail",
        ekstra: {
          nested: "test example",
        },
      },
    };

    await setDoc(doc(db, "data", "MKK1"), data);
  };

  const removeDoc = async () => {
    try {
      const result = await deleteDoc(doc(db, "users", "MKK"));
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const removeField = async () => {
    try {
      const document = await doc(db, "users", "MKK");

      console.log(document);

      await updateDoc(document, {
        address: deleteField(),
      });

      const lastDocument = await doc(db, "users", "MKK");

      console.log(lastDocument);
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
          <Button label="DATA TYPE KAYDET" onClick={saveWithDataType} />
          <Button label="Converter" onClick={converter} />
          <Button label="Remove Doc" onClick={removeDoc} />
          <Button label="Remove Field" onClick={removeField} />
        </div>
      </div>
    </div>
  );
};

export default Index;
