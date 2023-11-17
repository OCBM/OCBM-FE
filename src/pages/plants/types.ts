import { MouseEventHandler } from 'react';

export type CardType = {
  image?: string;
  name?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
};
