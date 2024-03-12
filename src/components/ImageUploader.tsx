import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";

export interface IAcceptKey {
  [key: string]: string[];
}

interface ImageUploaderProps {
  onSubmit: (images: File[]) => void;
  acceptKey: IAcceptKey;
}

interface ContainerProps {
  isDragAccept: boolean;
  isDragReject: boolean;
  isFocused: boolean;
}

const getColor = (props: ContainerProps) => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isFocused) {
    return "#2196f3";
  }
  return "#eeeeee";
};

const Container = styled.div<ContainerProps>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

const DropContent = styled.p`
  min-height: 100px;
  font-size: 52px;
  font-weight: 700;
  text-align: center;
`;

const PreviewSection = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 12px;
  margin-top: 30px;
`;

const PreviewCard = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid grey;
  border-radius: 5px;
  position: relative;
`;

const PreviewImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 5px;
  position: absolute;
  z-index: 1;
`;
const SubmitSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;

const SubmitBtn = styled.button`
  border: none;
  border-radius: 10px;
  padding: 8px 16px;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  background-color: #13d0d0;
  color: #f0ecec;
  &:hover {
    color: #1f1e1f;
    cursor: pointer;
    transform: scale(1.1);
  }
`;

const RemoveBtn = styled.button`
  color: #f0ecec;
  background-color: #13d0d0;
  border: none;
  border-radius: 100%;
  padding: 5% 7%;
  position: absolute;
  z-index: 2;
  top: 5px;
  right: 5px;
  &:hover {
    color: #b71f1f;
    cursor: pointer;
    background: #9f9898;
    transform: scale(1.1);
  }
`;

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
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      accept: acceptKey,
    });
  const submitImages = () => {
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
        {files.map((file, index) => (
          <PreviewCard key={index}>
            <PreviewImg
              src={URL.createObjectURL(file)}
              alt="Preview"
              style={{ width: "100px", height: "100px" }}
            />
            <RemoveBtn onClick={() => removeImage(index)}>X</RemoveBtn>
          </PreviewCard>
        ))}
      </PreviewSection>
      <SubmitSection>
        <SubmitBtn onClick={submitImages}>Submit</SubmitBtn>
      </SubmitSection>
    </div>
  );
};
