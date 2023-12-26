import css from './Button.module.css';

import React from 'react';

export const Button = ({onClickLodeMore}) => {
  return <button className={css.button} onClick={onClickLodeMore}>Load more</button>;
};
