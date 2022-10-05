import React from "react";
import { app } from "../firebaseConfig";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { FileUpload } from "primereact/fileupload";

const FileIO = () => {
  const storage = getStorage(app,"gs://mkk-test-4bbac.appspot.com");

  const onBasicUpload = (event) => {
    debugger;
    console.log(event.files);

    const file = event.files[0];

    if (!file) return;

    const storageRef = ref(storage,  file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
        });
      }
    );
  };

  return (
    <div>
      <h5>Dosya Yükleme</h5>
      <FileUpload
        mode="basic"
        accept="image/*"
        customUpload={true}
        maxFileSize={1000000000}
        auto={true}
        uploadHandler={(e) => onBasicUpload(e)}
      />
    </div>
  );
};

export default FileIO;
