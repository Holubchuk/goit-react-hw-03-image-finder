import css from './Button.module.css';

import React from 'react';

export const Button = ({handleLoadMoreClick}) => {
  return <button className={css.button} onClick={() => handleLoadMoreClick()}>Load more</button>;
};
