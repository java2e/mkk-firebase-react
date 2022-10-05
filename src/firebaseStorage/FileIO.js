import React from "react";
import { app } from "../firebaseConfig";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { FileUpload } from 'primereact/fileupload';

const FileIO = () => {

  const storage = getStorage(app);

  const onBasicUpload =(event)=> {

    debugger
    console.log(event.files);

    const file = event.files[0];

    if(!file) return;

    const storageRef = ref(storage,'files/'+file.name);
    const uploadTask = uploadBytesResumable(storageRef,file);

  }

  return (
    <div>
      <h5>Dosya Yükleme</h5>
      <FileUpload
        mode="basic"
        accept="image/*"
        customUpload={true}
        maxFileSize={1000000000}
        auto={true}
        uploadHandler={(e)=>onBasicUpload(e)}
      />
    </div>
  );
};

export default FileIO;
