import TabViewPrimary from './TabViewPrimary';
import TabViewSecondary from './TabViewSecondary';
import { TabViewPropsType } from './types';

const TabView = ({ type = 'primary', ...props }: TabViewPropsType) => {
  if (type === 'secondary') return <TabViewSecondary {...props} />;
  return <TabViewPrimary {...props} />;
};

export default TabView;
