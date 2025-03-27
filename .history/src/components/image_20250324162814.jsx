import { useState } from "react";
import { storage } from "../services/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState(null);

  const handleFileChange = (event) => {
    if (event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return;

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.error("Erreur d'upload", error);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setDownloadURL(url);
        console.log("Image disponible à :", url);
      }
    );
  };

  return (
    <div className="p-4 space-y-4 border rounded-lg shadow-md w-96">
      <input type="file" onChange={handleFileChange} className="p-2 border" />
      <button onClick={handleUpload} className="px-4 py-2 text-white bg-blue-500 rounded">
        Upload
      </button>
      <p>Progression : {progress.toFixed(2)}%</p>
      {downloadURL && <img src={downloadURL} alt="Uploaded" className="w-32 h-32 rounded" />}
    </div>
  );
};

export default UploadImage;
