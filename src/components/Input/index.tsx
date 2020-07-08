import React, { useState, useRef, useCallback, InputHTMLAttributes, useEffect } from 'react';

import { useField } from '@unform/core';

import { Container } from './styles';

interface InputAttributes extends InputHTMLAttributes<HTMLInputElement>{
  name: string;
}

const Input: React.FC<InputAttributes> = ({ name, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isSelected, setIsSelected] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  
  const { error, registerField, fieldName } = useField(name);
  
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    })
  }, [fieldName, registerField])

  useEffect(() => {
    console.log(error);
  }, [error]);

  const handleOnClick = useCallback(() => {
    setIsSelected(true);
  }, []);

  const handleOnBlured = useCallback(() => {
    setIsSelected(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  return (
      <Container isError={!!error} isSelected={isSelected} isFilled={isFilled} onFocus={handleOnClick} onBlur={handleOnBlured}>
        <input ref={inputRef} {...rest} />        
        { error && 
          <div>
            <img src="/static/icons/warning.png" alt="icon_warning" />
            <span>{error}</span>
          </div>
        }
      </Container>
  );
}

export default Input;