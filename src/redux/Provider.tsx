import { Provider } from 'react-redux';
import { store } from './store';

type ReduxProviderTypes = {
	children: JSX.Element;
};

const ReduxProvider = ({ children }: ReduxProviderTypes): JSX.Element => {
	return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
