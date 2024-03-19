import styled from "styled-components";

const StyledInput = styled.input`
  font-size: 20px;
  padding: 10px;
`;

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ value, onChange }: Props) {
  return <StyledInput value={value} onChange={onChange}></StyledInput>;
}
