import css from './Button.module.css';

import React from 'react';

export const Button = ({ handleLodeMore }) => {
  return (
    <button className={css.button} onClick={handleLodeMore}>
      Load more
    </button>
  );
};
