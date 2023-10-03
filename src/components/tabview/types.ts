import { JSX } from 'react';

export type TabViewPropsType = {
  tabs: TabType[];
  className?: string;
  type?: 'primary' | 'secondary';
  activeIndex: number;
  handleClick?: (index: number, path?: string) => void;
};

export type TabType = {
  title: string;
  content?: string | JSX.Element;
  path?: string;
  key: string;
};
