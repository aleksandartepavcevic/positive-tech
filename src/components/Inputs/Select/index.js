import React from "react";
import styled from "styled-components";

const Select = ({
  placeholder,
  value,
  handleChange,
  handleOptionClick,
  startAdornment,
  endAdornment,
  options,
  styles,
  isSearchable,
  disabled,
}) => {
  const placeholderText =
    options === null
      ? "Start typing..."
      : options?.length === 0 && "Sorry we couldn't find anything.";
  const renderOptions = () =>
    options?.map((option, i) => (
      <Option
        key={`${option.id}-${i}`}
        id={option.id}
        onClick={handleOptionClick}
      >
        {option.label}
      </Option>
    ));

  return (
    <Container styles={styles}>
      <Adornment start="true">{startAdornment}</Adornment>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        startAdornment={startAdornment}
        endAdornment={endAdornment}
        readOnly={!isSearchable}
        disabled={disabled}
      />
      <Adornment end="true">{endAdornment}</Adornment>
      <Options>
        {options !== null && options?.length !== 0 ? (
          renderOptions()
        ) : (
          <Placeholder>{placeholderText}</Placeholder>
        )}
      </Options>
    </Container>
  );
};

export default Select;

const Adornment = styled.span`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ start, end }) => (start ? `left: 0;` : end ? `right: 0;` : null)}
  z-index: 2;
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ startAdornment, endAdornment }) =>
    startAdornment
      ? "10px 15px 10px 47px;"
      : endAdornment
      ? "10px 47px 10px 15px;"
      : "10px 15px;"};
  border: solid 1px #ddd;
  border-radius: 5px;
  outline: none;
  z-index: 1;
  font-size: 16px;
  ${({ readOnly }) => readOnly && `cursor: pointer;`}

  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:focus,
  &:focus-within,
  &:focus-visible {
    border-color: #6a8e8e;
  }

  &:hover {
    border-color: rgb(106, 142, 142);
    box-shadow: 0 0 0 3px rgb(106, 142, 142, 10%);
  }

  &::placeholder {
    opacity: 0.75;
  }
`;

const Options = styled.div`
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  right: 0;
  z-index: 900;
  opacity: 0;
  visibility: hidden;
  background-color: #fff;
  border: solid 1px #6a8e8e;
  border-radius: 5px;
  padding: 5px 0;
  font-size: 16px;
  display: flex;
  flex-direction: column;

  transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
`;

const Option = styled.span`
  cursor: pointer;
  padding: 5px 15px;

  &:hover {
    background-color: #ddd;
  }
`;

const Placeholder = styled.span`
  padding: 0 15px;
  opacity: 0.4;
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0 5px;

  ${({ styles }) => styles && styles}

  &:focus,
  &:focus-within,
  &:focus-visible {
    ${Options} {
      opacity: 1;
      visibility: visible;
    }
  }
`;
