export type TabViewPropsType = {
  tabs: TabType[];
  className?: string;
  type?: 'primary' | 'secondary';
  activeIndex: number;
  handleClick?: (index: number, path?: string) => {};
};

export type TabType = {
  title: string;
  content?: string | JSX.Element;
  path?: string;
  key: string;
};
