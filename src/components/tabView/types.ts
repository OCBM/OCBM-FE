export type TabViewPropsType = {
  tabs: TabType[];
  className: string;
};

export type TabType = {
  title: string;
  content: string | JSX.Element;
};
