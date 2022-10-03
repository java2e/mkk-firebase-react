import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import {getAuth,signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider,signInWithPopup} from "firebase/auth";
import {app} from "../firebaseConfig";
import { Button } from "primereact/button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth();

  const provider = new GoogleAuthProvider();

  const login =()=> {
    
    // firebase tarafından gelen fonksiyon
    signInWithEmailAndPassword(auth,email,password)
    .then((response) => {
      const user = response.user;
      console.log(user);
    })
    .catch((error) =>{
      console.log(error);
    })
  }

  const addUser =() => {

    // firebase tarafında gelen fonksiyon
    createUserWithEmailAndPassword(auth,email,password)
    .then((response) => {
      const user = response.user;
      console.log(user);
    })
    .catch((error) => {
      console.log(error);
    })


  }

  const loginWithGoogle =()=>{

    signInWithPopup(auth,provider)
    .then((result) => {

      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      console.log("Token :"+token);

      const user = result.user;

      console.log(user);

    })
    .catch((error) => {
      console.log(error);
    })




  }


  return (
    <div>
      <center>
        <div className="p-fluid" style={{ width: "600px" }}>
          <div className="p-field">
            <label htmlFor="email">Email</label>
            <InputText
              id="email"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="p-field">
            <label htmlFor="password">Password</label>
            <InputText
              id="password"
              type="text"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="p-field">
          <Button label="Giriş" onClick={login} />
          <Button label="Kaydet" onClick={addUser} />
          <Button label="Login with Google" onClick={loginWithGoogle} />
          </div>
        </div>
      </center>
    </div>
  );
};

export default Login;
