import React, { useEffect, useState } from 'react';
import { useTransition } from 'react-spring';

import { Container, ContainerToast } from './styles';

interface MessagesAttributes {
  messages: {
    id: string;
  }[];
}

const Toast: React.FC<MessagesAttributes> = ({ messages }) => {
  const [toasts, setToasts] = useState(messages);

  useEffect(() => {
    setTimeout(() => {
      setToasts(messages.filter((message) => message.id === '12'));
    }, 3000);
  }, [messages]);

  const toastsWithTransitions = useTransition(toasts, (toast) => toast.id, {
    from: { top: '-120%' },
    enter: { top: '0%' },
    leave: { top: '-150%' },
  });

  return (
    <Container>
      {toastsWithTransitions.map(({ key, props }) => (
        <ContainerToast key={key} style={props}>
          <div>
            <h1>Algo está errado!</h1>
            <p>
              Erro ao criar uma query no banco de dados, possívelmente offline
            </p>
          </div>
        </ContainerToast>
      ))}
    </Container>
  );
};

export default Toast;
