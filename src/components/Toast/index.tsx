import React, { useEffect, useState } from 'react';
import { useTransition } from 'react-spring';

import { Container, ContainerToast } from './styles';

interface MessagesAttributes {
  messages: {
    id: string;
    message: string;
  }[];
}

const Toast: React.FC<MessagesAttributes> = ({ messages }) => {
  const [toasts, setToasts] = useState(messages);

  useEffect(() => {
    setTimeout(() => {
      setToasts([]);
    }, 3000);
  }, [messages]);

  const toastsWithTransitions = useTransition(toasts, (toast) => toast.id, {
    from: { top: '-120%' },
    enter: { top: '0%' },
    leave: { top: '-150%' },
  });

  return (
    <Container>
      {toastsWithTransitions.map(({ key, item, props }) => (
        <ContainerToast key={key} style={props}>
          <div>
            <h1>Algo está errado!</h1>
            <p>{item.message}</p>
          </div>
        </ContainerToast>
      ))}
    </Container>
  );
};

export default Toast;
