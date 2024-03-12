import styled from "styled-components";

export interface ContainerProps {
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

export const Container = styled.div<ContainerProps>`
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

export const DropContent = styled.p`
  min-height: 100px;
  font-size: 52px;
  font-weight: 700;
  text-align: center;
`;

export const PreviewSection = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 12px;
  margin-top: 30px;
`;

export const PreviewCard = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid grey;
  border-radius: 5px;
  position: relative;
`;

export const PreviewImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 5px;
  position: absolute;
  z-index: 1;
`;
export const SubmitSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;

export const SubmitBtn = styled.button`
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

export const RemoveBtn = styled.button`
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
