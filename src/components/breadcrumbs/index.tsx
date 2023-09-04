import { useLocation } from 'react-router-dom';
import { CrumbType } from './types';

function Breadcrumbs({ className }: CrumbType) {
	const location = useLocation();

	//   let currentlink = "";
	const crumbs = location.pathname
		.split('/')
		.filter((crumbs) => crumbs !== '')
		.map((crumbs) => {
			console.log(crumbs, 'inside map');
			//   currentlink += `/${crumbs}`;
			return (
				<div className=" text-[18px] text-black capitalize " key={crumbs}>
					{crumbs}
				</div>
			);
		});

	console.log(crumbs);

	return (
		<div
			className={`${
				className || ''
			} breadcrumb flex gap-2 mx-8 pb-2 border-b-[2px] border-[#44444447] border-solid`}>
			{crumbs}
		</div>
	);
}

export default Breadcrumbs;
