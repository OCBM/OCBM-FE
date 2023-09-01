import { Route } from 'react-router-dom';
import Home from './pages/Home';
import { PublicRoutes } from './routes';

function App() {
	return (
		<div>
			<PublicRoutes>
				<Route path="/" element={<Home />} />
				<Route path="*" element={<h1>Not found</h1>} />
			</PublicRoutes>
		</div>
	);
}
export default App;
