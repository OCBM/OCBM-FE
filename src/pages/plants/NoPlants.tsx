import { SITEMAP } from '@/utils/sitemap';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const NoPlants = () => {
  const no_plant_container = classNames(
    `w-full h-[80vh] flex flex-col items-center justify-center font-GothamMedium text-2xl font-medium shadow-2xl mt-4 rounded-2xl`,
  );
  return (
    <div className={`${no_plant_container}`}>
      <p className="grid text-center">
        To choose the plant. <span> Please upload in the mastery</span>
      </p>
      <p className="text-[#492CE1] underline pt-9">
        <Link to={SITEMAP?.mastery?.index}>Upload in mastery</Link>
      </p>
    </div>
  );
};

export default NoPlants;
