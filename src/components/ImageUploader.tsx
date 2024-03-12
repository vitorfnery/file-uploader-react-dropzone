// ImageUploader.tsx
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export interface IAcceptKey {
  [key: string]: string[];
}

interface ImageUploaderProps {
  onSubmit: (images: File[]) => void;
  acceptKey: IAcceptKey; // Add an optional accept prop for MIME types or file extensions
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onSubmit,
  acceptKey,
}) => {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const removeImage = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  // Use the accept prop in useDropzone
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: acceptKey,
  });

  const submitImages = () => {
    onSubmit(files);
  };

  return (
    <div>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p style={{ minHeight: 100, fontSize: 52 }}>
          Drag 'n' drop some files here, or click to select files
        </p>
      </div>
      <div>
        {files.map((file, index) => (
          <div key={index}>
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              style={{ width: "100px", height: "100px" }}
            />
            <button onClick={() => removeImage(index)}>Remove</button>
          </div>
        ))}
      </div>
      <button onClick={submitImages}>Submit</button>
    </div>
  );
};
