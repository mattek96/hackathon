import styled from "styled-components";

const StyledInput = styled.input`
  font-size: 20px;
  padding: 10px;
`;

interface Props {
  value: string | number;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ type, value, onChange }: Props) {
  return (
    <StyledInput type={type} value={value} onChange={onChange}></StyledInput>
  );
}
