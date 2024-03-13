import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import {
  Container,
  DropContent,
  PreviewSection,
  PreviewCard,
  PreviewImg,
  SubmitSection,
  SubmitBtn,
  RemoveBtn,
  PreviewText,
} from "./FileUploaderStyles";

export interface IAccept {
  [key: string]: string[];
}

interface FileUploaderProps {
  onSubmit: (Files: File[]) => void;
  accept: IAccept;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  onSubmit,
  accept,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);
  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      accept: accept,
    });
  const submitFiles = () => {
    onSubmit(files);
  };

  return (
    <div className="container">
      <Container
        {...getRootProps({
          className: "dropzone",
          isFocused,
          isDragAccept,
          isDragReject,
        })}
      >
        <input {...getInputProps()} />
        <DropContent>
          Drag 'n' drop some files here, or click to select files
        </DropContent>
      </Container>
      <PreviewSection>
        {files.map((file, index) => {
          const isImage = file.type.startsWith("image/");
          return (
            <PreviewCard key={index}>
              {isImage ? (
                <>
                  <PreviewImg src={URL.createObjectURL(file)} alt="Preview" />
                  <RemoveBtn onClick={() => removeFile(index)}>X</RemoveBtn>
                </>
              ) : (
                <div>
                  <PreviewText>{file.name}</PreviewText>
                  <RemoveBtn onClick={() => removeFile(index)}>X</RemoveBtn>
                </div>
              )}
            </PreviewCard>
          );
        })}
      </PreviewSection>
      <SubmitSection>
        <SubmitBtn onClick={submitFiles}>Submit</SubmitBtn>
      </SubmitSection>
    </div>
  );
};
