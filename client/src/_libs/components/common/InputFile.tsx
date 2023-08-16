/** @jsxImportSource @emotion/react */
import React, { useState, ChangeEvent } from 'react';
import colors from '../../design/colors';

export function InputFile({ color = 'confirm', label, size = 'large', onChange, accept }: Props) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0].name);
    }
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <label
      css={{
        cursor: 'pointer',
        borderRadius: '2.25rem',
        fontWeight: '600',
        whiteSpace: 'nowrap',
        ...COLOR_VARIANTS[color],
        ...SIZE_VARIANT[size],
      }}
    >
      {selectedFile ? selectedFile : label}
      <input type="file" accept={accept} style={{ display: 'none' }} onChange={handleFileChange} />
    </label>
  );
}
const COLOR_VARIANTS = {
  confirm: {
    border: '1px solid transparent',
    backgroundColor: colors.confirm,
    '&:hover': {
      filter: 'brightness(0.9)',
    },
  },
  black: {
    border: '1px solid transparent',
    backgroundColor: colors.black,
    color: colors.white,
    '&:hover': {
      filter: 'brightness(0.9)',
    },
  },
  white: {
    border: `1px solid ${colors.confirm}`,
    backgroundColor: colors.white,
    color: colors.black,
    '&:hover': {
      filter: 'brightness(0.9)',
    },
  },
  delete: {
    border: `1px solid ${colors.warn33}`,
    color: colors.white,
    backgroundColor: colors.warn,
    '&:hover': {
      filter: 'brightness(0.9)',
    },
  },
};

const SIZE_VARIANT = {
  small: {
    height: '1.75rem',
    padding: '0 0.75rem 0 0.75rem',
    fontSize: '0.9rem',
  },
  large: {
    height: '2.25rem',
    padding: '0 1.15rem 0 1.15rem',
    fontSize: '0.95rem',
  },
};

interface Props {
  color?: 'confirm' | 'black' | 'white' | 'delete';
  size?: 'small' | 'large';
  label: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
}
