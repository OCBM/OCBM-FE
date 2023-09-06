export type TabViewPropsType = {
  tabs: TabType[];
};

export type TabType = {
  title: string;
  content: string | JSX.Element;
};
