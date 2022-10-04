import React, { useEffect, useState } from "react";
import { app } from "../firebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDocs,
  getFirestore,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const Data = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [users, setUsers] = useState([]);

  const db = getFirestore(app);

  const saveUser = async () => {
    try {
      const result = await addDoc(collection(db, "users"), {
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
      });

      const data = {
        id: result.id,
        firstName: firstName,
        lastName: lastName,
        city: city,
        address: address,
      };

      const newList = users.concat(data); // var olan listenin sonun yeni elamanı ekliyor
      setUsers(newList); // state günceleme yapılıyor

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
        city: city,
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

  const removeDoc = async (docId) => {
    try {
      const result = await deleteDoc(doc(db, "users", docId));
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

  useEffect(() => {
    const loadData = async () => {
      const list = await getDocs(collection(db, "users"));

      list.forEach((doc) => {
        const object = doc.data();
        const data = {
          id: doc.id,
          firstName: object.firstName,
          lastName: object.lastName,
          city: object.city,
          address: object.address,
        };
        debugger;
        users.push(data);
        console.log(doc.id, " => ", doc.data());
      });
    };

    loadData();
  }, []);

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => removeDoc(rowData.id)}
        />
      </React.Fragment>
    );
  };

  return (
    <div>
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
            <Button label="YENİ DOC KAYDET" onClick={() => saveUser()} />
          </div>
        </div>
      </div>
      <div className="p-fluid">
        <DataTable value={users}>
          <Column field="id" header="ID"></Column>
          <Column field="firstName" header="First Name"></Column>
          <Column field="lastName" header="Last Name"></Column>
          <Column field="city" header="City"></Column>
          <Column field="address" header="Address"></Column>
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "8rem" }}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default Data;
