import { useLocation } from 'react-router-dom';
import { BreadcrumbsType } from './types';

function Breadcrumbs({ className }: BreadcrumbsType) {
	const location = useLocation();
	const crumbs = location.pathname
		.split('/')
		.filter((crumbs) => crumbs !== '')
		.map((crumbs) => {
			return (
				<div className="" key={crumbs}>
					{crumbs}
				</div>
			);
		});

	return (
		<div
			className={`${
				className || ''
			} breadcrumb flex gap-2 mx-8 pb-2 border-b-[2px] border-[#44444447] border-solid  text-[18px] text-black capitalize`}>
			<div>Home</div> {crumbs}
		</div>
	);
}

export default Breadcrumbs;
