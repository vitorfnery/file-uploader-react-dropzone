// App.tsx
import React from "react";
import { IAccept, FileUploader } from "./components/FileUploader";

const App: React.FC = () => {
  const handleSubmit = (images: File[]) => {
    // Handle the submission of images here
    console.log(images);
  };

  const acceptFiles: IAccept = {
    "image/jpeg": [".jpeg", ".jpg"],
    "image/png": [".png"],
    "image/svg+xml": [".svg"],
  };

  return (
    <div>
      <h1>File Uploader</h1>
      <FileUploader onSubmit={handleSubmit} accept={acceptFiles} />
    </div>
  );
};

export default App;
