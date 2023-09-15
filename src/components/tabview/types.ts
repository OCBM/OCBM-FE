export type TabViewPropsType = {
  tabs: TabType[];
  className?: string;
  type?: 'primary' | 'secondary';
};

export type TabType = {
  title: string;
  content?: string | JSX.Element;
  path?: string;
  key: string;
};
