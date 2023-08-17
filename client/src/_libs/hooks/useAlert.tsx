/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, HTMLAttributes } from 'react';
import { Text } from '../components/common/Text';
import colors from '../design/colors';

export function useAlert(message: string, type: 'success' | 'error', duration = 2000) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return { alert: <Alert message={message} type={type} show={show} />, alertTrigger: () => setShow(true) };
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  type: 'success' | 'error';
  show: boolean;
  message: string;
}

function Alert({ message, type, show }: Props) {
  const STYLES = {
    success: { border: '1px solid ' + colors.ok },
    error: { border: '1px solid ' + colors.warn },

    show: show
      ? {
          transform: 'translateY(3rem)',
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
        backgroundColor: colors.backgroundLight2,
        color: colors.black,
        opacity: 0,
        borderRadius: '100%',
        padding: '1rem 2rem 1rem 2rem',
        transition: 'transform 0.5s ease-out',
        ...STYLES[type],
        ...STYLES['show'],
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Text content={message} type="h2" />
      </div>
    </div>
  );
}
