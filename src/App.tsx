// App.tsx
import React from "react";
import { IAcceptKey, ImageUploader } from "./components/ImageUploader";

const App: React.FC = () => {
  const handleSubmit = (images: File[]) => {
    // Handle the submission of images here
    console.log(images);
  };

  const acceptFiles: IAcceptKey = {
    "image/jpg": [".jpg", ".jpeg", ".png", ".svg"],
  };

  return (
    <div>
      <h1>Image Uploader</h1>
      <ImageUploader onSubmit={handleSubmit} acceptKey={acceptFiles} />
    </div>
  );
};

export default App;
