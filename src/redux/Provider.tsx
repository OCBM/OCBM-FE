import { JSX } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { injectStore } from '@/lib/axios';
// To avoid circulart dependency we send redux store for our api like this
injectStore(store);

type ReduxProviderTypes = {
  children: JSX.Element;
};
const ReduxProvider = ({ children }: ReduxProviderTypes): JSX.Element => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
