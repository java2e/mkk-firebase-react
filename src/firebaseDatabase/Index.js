import React, { useEffect } from "react";
import { app } from "../firebaseConfig";
import { getDatabase, ref, set } from "firebase/database";

const Index = () => {
  const database = getDatabase(app);

  useEffect(() => {
    const loadData = () => {
      set(ref(database, "users/1234"), {
        firstName: "MKK",
        lastName: "Test",
      });
    };
    loadData();
  }, []);

  return <div></div>;
};

export default Index;
