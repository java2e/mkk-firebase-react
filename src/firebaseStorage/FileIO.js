import React, { useEffect, useState } from "react";
import { app } from "../firebaseConfig";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  uploadString,
} from "firebase/storage";
import { FileUpload } from "primereact/fileupload";
import { Image } from "primereact/image";
import { Button } from "primereact/button";

const FileIO = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const storage = getStorage(app, "gs://mkk-test-4bbac.appspot.com");

  const onBasicUpload = (event) => {
    debugger;
    console.log(event.files);

    const file = event.files[0];

    if (!file) return;

    const storageRef = ref(storage, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    /*
    uploadTask.cancel();
    uploadTask.resume();
    uploadTask.pause();
       const metaData = {
      contentType: 'application/',
    };
*/

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

    /*
    const message = "sdjakljdaljdalksj+adasjkldakldasdasdja";

    uploadString(storageRef,message,"base64").then((result) => {
      console.log("Uploaded base64 string!")
    })

    const message2 =" data:text/plain;base64,asdlkalkdaskdaalsdkadkş";

    uploadString(storageRef,message2,"data_url").then((result) => {
      console.log("Uploaded data url!");
    })
    */
  };

  const deleteImage = () => {
    try {
      const storageRef = ref(storage, "footer.jpg");
      deleteObject(storageRef)
        .then((result) => {
          console.log("Deleted image");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {}
  };

  useEffect(() => {
    const loadImage = async () => {
      await getDownloadURL(ref(storage, "footer.jpg"))
        .then((url) => {
          const xhr = new XMLHttpRequest();
          xhr.responseType = "blob";
          xhr.onload = (event) => {
            const blob = xhr.response;
          };

          xhr.open("GET", url);
          xhr.send();

          setImageUrl(url);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    loadImage();
  }, []);

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
      {imageUrl && <Image src={imageUrl} alt="Image" width="250" />}
      <Button label="Remove Image" onClick={() => deleteImage()} />
    </div>
  );
};

export default FileIO;
