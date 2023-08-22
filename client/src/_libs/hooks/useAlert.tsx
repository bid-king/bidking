/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, HTMLAttributes } from 'react';
import { Text } from '../components/common/Text';
import colors from '../design/colors';

export function useAlert(type: 'success' | 'error', duration = 1500) {
  const [show, setShow] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [show]);

  return {
    Alert: <Alert message={message} type={type} show={show} />,
    alertTrigger: (msg: string) => {
      setMessage(msg);
      setShow(true);
    },
  };
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  type: 'success' | 'error';
  show: boolean;
  message: string;
}

function Alert({ message, type, show }: Props) {
  const STYLES = {
    success: { backgroundColor: colors.ok, color: colors.black },
    error: { backgroundColor: colors.warn, color: colors.white },

    show: show
      ? {
          transform: 'translateY(2rem)',
          opacity: '1',
        }
      : {
          transform: 'translateY(-100%)',
        },
  };

  return (
    <div
      css={{
        fontSize: '1rem',
        position: 'fixed',

        left: '0',
        right: 0,
        margin: '0 auto',
        opacity: 0,
        borderRadius: '1rem',
        width: '50%',
        maxWidth: '20rem',
        padding: '1rem 2rem 1rem 2rem',
        transition: 'transform 0.25s',
        lineHeight: '1.5',
        ...STYLES[type],
        ...STYLES['show'],
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Text content={message} type="h3" />
      </div>
    </div>
  );
}
