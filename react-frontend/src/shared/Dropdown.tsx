import { useState } from "react";
import styled from "styled-components";

const DropDownContainer = styled("div")`
  width: 15em;
  margin: 0 auto;
`;

const DropDownHeader = styled("div")`
  margin-bottom: 0.8em;
  padding: 0.4em 2em 0.4em 1em;
  box-shadow: 0 2px 3px var(--quinary);
  font-weight: 500;
  font-size: 1.3rem;
  color: var(--secondary);
`;

const DropDownListContainer = styled("div")`
  position: absolute;
  z-index: 100;
  width: 15em;
`;

const DropDownList = styled("ul")`
  padding: 0;
  margin: 0;
  padding-left: 1em;
  background: #ffffff;
  border: 2px solid var(--quinary);
  box-sizing: border-box;
  color: var(--quaternary);
  font-size: 1.3rem;
  font-weight: 500;
  &:first-child {
    padding-top: 0.8em;
  }
`;

const ListItem = styled("li")`
  list-style: none;
  margin-bottom: 0.8em;
  &:hover {
    color: var(--secondary);
  }
`;

interface Props {
  options: any[];
  callback: (arg0: any) => void;
}

export default function Dropdown({ options, callback }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const toggle = () => setIsOpen(!isOpen);

  const onOptionSelected = (value: any) => () => {
    setSelectedOption(value);
    setIsOpen(false);
    callback(value);
  };

  return (
    <DropDownContainer>
      <DropDownHeader onClick={toggle}>
        {selectedOption || options.at(0)}
      </DropDownHeader>
      {isOpen && (
        <DropDownListContainer>
          <DropDownList>
            {options.map((option) => (
              <ListItem onClick={onOptionSelected(option)} key={Math.random()}>
                {option}
              </ListItem>
            ))}
          </DropDownList>
        </DropDownListContainer>
      )}
    </DropDownContainer>
  );
}
